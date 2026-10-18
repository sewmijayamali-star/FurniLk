import express from "express";
import { createOrder } from "../controllers/ordercontroller.js";
import { getOrders } from "../controllers/ordercontroller.js";
import { UpdateorderStatus } from "../controllers/ordercontroller.js";


const orderrouter = express.Router();

orderrouter.post("/", createOrder);
orderrouter.get("/", getOrders);
orderrouter.put("/status/:id", UpdateorderStatus);

orderrouter.put("/status/:orderId", UpdateorderStatus);

export default orderrouter;