import express from "express";
import { createUser } from "../controllers/UserControll.js";
import { loginuser } from "../controllers/UserControll.js";
import { getUsers } from "../controllers/UserControll.js";
import { getCustomers } from "../controllers/UserControll.js";


const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginuser);
userRouter.get("/me", getUsers);
userRouter.get("/customers", getCustomers);

export default userRouter;
