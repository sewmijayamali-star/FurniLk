import express from 'express';
const productrouter = express.Router();
import { getproducts, createproduct,Deleteproduct,updateproduct, getproductbyid } from '../controllers/productController.js';

productrouter.post("/", createproduct);
productrouter.get("/", getproducts);
productrouter.delete("/:id", Deleteproduct);
productrouter.put("/:id", updateproduct);
productrouter.get("/:id", getproductbyid);

export default productrouter;