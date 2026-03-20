import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productrouter from "./routes/productrouter.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(
  (req,res,next)=>{
    const header=req.header("Authorization");
    if (header!= null) {
      const token=header.replace("Bearer ", "");
      console.log("Token:", token);
      jwt.verify(token, "secretkey", (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", err.message);
          return res.status(401).json({ message: "Invalid token" });
        } else {
          console.log("Decoded token:", decoded);
          req.user = decoded;
           
        
        }   });
    }next();
  }
);
const PORT = 5000;

const connection = "mongodb+srv://sewmijayamali369_db_user:test1234@cluster0.keltczu.mongodb.net/furniture_db?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connection).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});


app.use("/users", userRouter);
app.use("/products", productrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
