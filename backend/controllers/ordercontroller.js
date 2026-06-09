import { startSession } from "mongoose";
import order from "../modules/order.js";

export async function createOrder(req, res) {
  try {

    const orderlist = await order.find().sort({ orderDate: -1 }).limit(1);
    const recentOrder = orderlist[0];
    let newOrderId = "FUN0000001";

    if (orderlist.length !== 0) {

      let lastOrderIDInString = orderlist[0].orderid;
      let lastOrderNumberInString = lastOrderIDInString.replace("FUN", "");
      let lastOrderNumber = parseInt(lastOrderNumberInString);

      let newOrderNumber = lastOrderNumber + 1;

      let newOrderNumberInString =  newOrderNumber.toString().padStart(7, "0");
        newOrderId = "FUN" + newOrderNumberInString;
    }

    const newOrder = new order({
      orderid: newOrderId,
      items: [],
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      totalAmount: req.body.totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder
    });
    console.log("Generated Order ID:", newOrderId);

  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
}
