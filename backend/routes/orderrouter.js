import express from "express";
import {
    createOrder,
    getOrders,
    UpdateorderStatus
} from "../controllers/ordercontroller.js";

const orderrouter = express.Router();

orderrouter.post("/", createOrder);
orderrouter.get("/", getOrders);
orderrouter.put("/status/:id", UpdateorderStatus);

export default orderrouter;