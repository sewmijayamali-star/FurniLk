import express from "express";
import { createUser } from "../controllers/UserControll.js";
import { loginuser } from "../controllers/UserControll.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginuser);

export default userRouter;
