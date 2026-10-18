import { startSession } from "mongoose";
import order from "../modules/order.js";
import Product from "../modules/products.js";
import { isAdmin } from "./UserControll.js";


export async function createOrder(req, res) {
  try {

    const user=req.user;
    if (user==null) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    

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
    

    let  customerName = req.body.customerName;
    if (!customerName) {
  customerName = user.name || "Customer";
}

    let phoneNumber = req.body.phoneNumber;
    if (!phoneNumber) {
      phoneNumber = user.phone;
    } 

    const itemsInRequest = req.body.items;

    if ( itemsInRequest==null)
    { 
      res.status(400).json(
        {
          message:"Items are required to place an order"

        }
      )
      return
    }

    if (!Array.isArray(itemsInRequest)){
      res.status(400).json(
        {
          message:"Items should be an array"
        }
      )
      return
    }

    const itemsToOrder = [];
    let totalAmount = 0;

    for(let i=0; i<itemsInRequest.length;i++){
      const item= itemsInRequest[i]

    
const product = await Product.findById(item.productId);


      if (product==null){
        res.status(400).json(
          { 
            code:"PRODUCT_NOT_FOUND",
            message:`Product with id ${item._id || item.productId} not found`
          }
        )
        return
      }

      if (item.quantity>product.stock){
        res.status(400).json(
          { 
            code:"INSUFFICIENT_STOCK",
            message:`Product with id ${item.productId} has only ${product.stock} in stock`
          }
        )
        return
      }
      itemsToOrder.push({
        productId: item.productId,
        quantity: item.quantity,
        productName: product.name,
        price: product.price,
        productImage: product.imageUrl[0]
      })

      totalAmount += product.price * item.quantity;
    }
  
    


    const newOrder = new order({
      orderid: newOrderId,
      items: itemsToOrder,
      customerName: customerName,
      customerEmail: user.email,
      phoneNumber: "not provided",
      address: req.body.address,
      totalAmount: totalAmount,
    });

    try {

    const savedOrder = await newOrder.save();

    /*for (let i = 0; i < itemsToOrder.length; i++) {
      const item = itemsToOrder[i];
      await product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }*/


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
} catch (error) {
    console.error("Error creating order:", error);

    return res.status(500).json({
        message: "Failed to create order",
        error: error.message
    });
}
}

export async function getOrders(req, res) {
  if(isAdmin(req)){
    const orders = await order.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  }else if (req) {
    const userEmail = req.email;
    const orders = await order.find({ customerEmail: userEmail }).
sort({ orderDate: -1 });
    res.status(200).json(orders);
  }else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function UpdateorderStatus(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
       message: "you are not authorized to update order status" 
      })
      return;
  }
  const orderId = req.params.id;
  const newStatus = req.body.state;


  try {
     await order.updateOne(
      { _id: orderId },
      { state: newStatus }
    );

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
}
