
import crypto from "crypto";
import mongoose from "mongoose";
import Order from "../modules/order.js";
import Product from "../modules/products.js";

// Generate PayHere payment hash
function generatePaymentHash(merchantId, orderId, amount, currency) {
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

    const hashedSecret = crypto
        .createHash("md5")
        .update(merchantSecret)
        .digest("hex")
        .toUpperCase();

    return crypto
        .createHash("md5")
        .update(
            merchantId +
            orderId +
            amount +
            currency +
            hashedSecret
        )
        .digest("hex")
        .toUpperCase();
}

// Verify PayHere notification signature
function verifyPaymentNotification(data) {
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

    const hashedSecret = crypto
        .createHash("md5")
        .update(merchantSecret)
        .digest("hex")
        .toUpperCase();

    const localSignature = crypto
        .createHash("md5")
        .update(
            data.merchant_id +
            data.order_id +
            data.payhere_amount +
            data.payhere_currency +
            data.status_code +
            hashedSecret
        )
        .digest("hex")
        .toUpperCase();

    const receivedSignature = String(data.md5sig || "").toUpperCase();

    const localBuffer = Buffer.from(localSignature);
    const receivedBuffer = Buffer.from(receivedSignature);

    return (
        localBuffer.length === receivedBuffer.length &&
        crypto.timingSafeEqual(localBuffer, receivedBuffer)
    );
}

// Create PayHere payment
export async function createPayment(req, res) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const merchantId = process.env.PAYHERE_MERCHANT_ID;
        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

        if (!merchantId || !merchantSecret) {
            return res.status(500).json({
                message: "PayHere configuration is missing"
            });
        }

        const { items, address, city, phoneNumber } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Cart items are required"
            });
        }

        if (!address || !city) {
            return res.status(400).json({
                message: "Delivery address and city are required"
            });
        }

        const customerPhone = phoneNumber || user.phone;

        if (!customerPhone) {
            return res.status(400).json({
                message: "Customer phone number is required"
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const item of items) {
            const quantity = Number(item.quantity);

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({
                    message: "Invalid product quantity"
                });
            }

            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(400).json({
                    code: "PRODUCT_NOT_FOUND",
                    message: `Product ${item.productId} was not found`
                });
            }

            if (quantity > product.stock) {
                return res.status(400).json({
                    code: "INSUFFICIENT_STOCK",
                    message: `${product.name} has only ${product.stock} items in stock`
                });
            }

            orderItems.push({
                productId: product._id,
                productName: product.name,
                price: product.price,
                quantity,
                productImage: product.imageUrl[0]
            });

            totalAmount += product.price * quantity;
        }

        const lastOrder = await Order.findOne()
            .sort({ orderDate: -1 });

        let newOrderId = "FUN0000001";

        if (lastOrder) {
            const lastNumber = parseInt(
                lastOrder.orderid.replace("FUN", ""),
                10
            );

            newOrderId = "FUN" +
                String(lastNumber + 1).padStart(7, "0");
        }

        const newOrder = new Order({
            orderid: newOrderId,
            items: orderItems,
            customerName: user.name || "Customer",
            customerEmail: user.email,
            phoneNumber: customerPhone,
            address,
            totalAmount,
            paymentStatus: "Pending",
            paymentMethod: "PayHere"
        });

        const savedOrder = await newOrder.save();

        const amount = totalAmount.toFixed(2);
        const currency = "LKR";

        const hash = generatePaymentHash(
            merchantId,
            newOrderId,
            amount,
            currency
        );

        const paymentData = {
            sandbox: process.env.PAYHERE_SANDBOX === "true",
            merchant_id: merchantId,
            return_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            notify_url: `${process.env.BACKEND_PUBLIC_URL}/payments/notify`,
            order_id: newOrderId,
            items: `FurniLK Order ${newOrderId}`,
            amount,
            currency,
            hash,
            first_name: (user.name || "Customer").split(" ")[0],
            last_name: (user.name || "Customer").split(" ").slice(1).join(" ") || "Customer",
            email: user.email,
            phone: customerPhone,
            address,
            city,
            country: "Sri Lanka"
        };

        return res.status(201).json({
            message: "Payment initialized successfully",
            orderId: newOrderId,
            paymentUrl: "https://sandbox.payhere.lk/pay/checkout",
            paymentData
        });

    } catch (error) {
        console.error("Payment initialization error:", error);

        return res.status(500).json({
            message: "Failed to initialize payment",
            error: error.message
        });
    }
}

// PayHere server notification
export async function paymentNotify(req, res) {
    try {
        const data = req.body;

        if (!verifyPaymentNotification(data)) {
            console.error("Invalid PayHere payment signature");

            return res.status(400).send("Invalid payment signature");
        }

        if (data.merchant_id !== process.env.PAYHERE_MERCHANT_ID) {
            return res.status(400).send("Invalid merchant");
        }

        const paymentOrder = await Order.findOne({
            orderid: data.order_id
        });

        if (!paymentOrder) {
            return res.status(404).send("Order not found");
        }

        const receivedAmount = Number(data.payhere_amount);
        const expectedAmount = Number(paymentOrder.totalAmount);

        if (
            data.payhere_currency !== "LKR" ||
            !Number.isFinite(receivedAmount) ||
            receivedAmount.toFixed(2) !== expectedAmount.toFixed(2)
        ) {
            return res.status(400).send("Payment amount or currency mismatch");
        }

        // Do not process an already paid order again
        if (paymentOrder.paymentStatus === "Paid") {
            return res.status(200).send("Payment already processed");
        }

        const statusCode = String(data.status_code);

        if (statusCode === "2") {
            const session = await mongoose.startSession();

            try {
                await session.withTransaction(async () => {
                    const currentOrder = await Order.findOne({
                        orderid: data.order_id
                    }).session(session);

                    if (!currentOrder || currentOrder.paymentStatus === "Paid") {
                        return;
                    }

                    // Reduce stock only after verified payment success
                    for (const item of currentOrder.items) {
                        const updatedProduct = await Product.findOneAndUpdate(
                            {
                                _id: item.productId,
                                stock: { $gte: item.quantity }
                            },
                            {
                                $inc: { stock: -item.quantity }
                            },
                            {
                                new: true,
                                session
                            }
                        );

                        if (!updatedProduct) {
                            throw new Error(
                                `Insufficient stock for ${item.productName}`
                            );
                        }
                    }

                    currentOrder.paymentStatus = "Paid";
                    currentOrder.paymentId = String(data.payment_id || "");
                    await currentOrder.save({ session });
                });
            } finally {
                await session.endSession();
            }

        } else if (["-1", "-2", "-3"].includes(statusCode)) {
            await Order.updateOne(
                {
                    orderid: data.order_id,
                    paymentStatus: "Pending"
                },
                {
                    $set: {
                        paymentStatus: "Failed",
                        paymentId: String(data.payment_id || "")
                    }
                }
            );
        }

        return res.status(200).send("Notification processed");

    } catch (error) {
        console.error("PayHere notification error:", error);

        return res.status(500).send("Notification processing failed");
    }
}
