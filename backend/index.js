import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productrouter from "./routes/productrouter.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import orderrouter from "./routes/orderrouter.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


app.use(
  (req,res,next)=>{
    const header=req.header("Authorization");
    if (header!= null) {
      const token=header.replace("Bearer ", "");
      console.log("Token:", token);
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", err.message);
          return res.status(401).json({ message: "Invalid token" });
        } else {
          console.log("Decoded token:", decoded);
          req.user = decoded;
          next();
           
        
        }   });
    } else {
      next();
    }
  }
);
const PORT = process.env.PORT || 5000;

const connection = process.env.MONGO_URI;

mongoose.connect(connection).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});


app.use("/users", userRouter);
app.use("/products", productrouter);
app.use("/orders", orderrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
