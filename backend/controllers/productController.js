import Product from '../modules/products.js';
import { isAdmin } from './UserControll.js';

export  async function createproduct(req, res) {
   if (!isAdmin(req)) {
    return res.status(403).json({
         message: "Access denied. Admins only." });
    }
    try {const productData = req.body;
    const product = new Product(productData);

    await product.save();

   res.json({ 
        message: 'Product created successfully',
        product: product
    });
    }catch (error) {
        console.error("Error creating product:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
   
}
export  async function getproducts(req, res) {
    try{
        const products = await Product.find();
        res.json(products);
    }catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }   }  



export async function Deleteproduct(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only."
    });
  }

  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId); // ✅ FIXED

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateproduct(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only."
    });
  }

  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
 export async function getproductbyid(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId); // ✅ FIXED

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    console.error("Error fetching product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

