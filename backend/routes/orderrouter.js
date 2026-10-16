import express from "express";
import { createOrder } from "../controllers/ordercontroller.js";


const orderrouter = express.Router();

orderrouter.post("/", createOrder);

export default orderrouter;