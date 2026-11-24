
import express from "express";
import {
    createPayment,
    paymentNotify
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", createPayment);
paymentRouter.post("/notify", paymentNotify);

export default paymentRouter;
