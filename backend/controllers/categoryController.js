import Category from "../modules/categories.js";
import Product from "../modules/products.js";
import { isAdmin } from "./UserControll.js";

// Get all categories
export async function getCategories(req, res) {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category.name
        });

        return {
          ...category.toObject(),
          productCount
        };
      })
    );

    res.status(200).json(categoriesWithCount);

  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({
      message: "Failed to fetch categories"
    });
  }
}

// Create category
export async function createCategory(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only."
    });
  }

  try {
    const { name, image } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const existingCategory = await Category.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" }
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists"
      });
    }

    const category = new Category({
      name: name.trim(),
      image: image || ""
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category
    });

  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({
      message: "Failed to create category"
    });
  }
}

// Update category
export async function updateCategory(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only."
    });
  }

  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const duplicate = await Category.findOne({
      _id: { $ne: id },
      name: { $regex: `^${name.trim()}$`, $options: "i" }
    });

    if (duplicate) {
      return res.status(409).json({
        message: "Category name already exists"
      });
    }

    const oldName = category.name;
    const newName = name.trim();

    category.name = newName;
    category.image = image ?? category.image;

    await category.save();

    // Keep existing products linked to the renamed category
    if (oldName !== newName) {
      await Product.updateMany(
        { category: oldName },
        { $set: { category: newName } }
      );
    }

    res.status(200).json({
      message: "Category updated successfully",
      category
    });

  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({
      message: "Failed to update category"
    });
  }
}

// Delete category
export async function deleteCategory(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only."
    });
  }

  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const productCount = await Product.countDocuments({
      category: category.name
    });

    if (productCount > 0) {
      return res.status(400).json({
        message: `Cannot delete this category. ${productCount} products are using it.`
      });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      message: "Category deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({
      message: "Failed to delete category"
    });
  }
}