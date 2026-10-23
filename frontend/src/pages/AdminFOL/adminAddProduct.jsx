import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/imagesupload";

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    labelprice: "",
    category: "",
    description: "",
    imageUrl: "",
    altImages: [],
    stock: "",
    altNamesInput: "" // ✅ UI only (safe fix)
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ KEEPING YOUR FUNCTION
  async function addProduct() {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!product.imageUrl) {
      toast.error("Please upload a main product image.");
      return;
    }

    setLoading(true);

    try {
      const promises = product.altImages.map((img) => mediaUpload(img));
      const urls = await Promise.all(promises);

      console.log("ALT FILES:", product.altImages);
      console.log("UPLOADED URLS:", urls);

      const alternativeNames = product.altNamesInput
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);

      const newProduct = {
        productId: product.productId,
        name: product.name,
        price: product.price,
        labelprice: product.labelprice,
        category: product.category,
        description: product.description,
        imageUrl: [
            product.imageUrl,
            ...urls
          ],
       
        stock: product.stock,
        altname: alternativeNames
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/products",
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Product added 🚀");
      navigate("/admin/products");

    } catch (err) {
      console.error("Failed to add product:", err);
      toast.error(
        err.response?.data?.message || err.message || "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  }

  // ✅ CONNECT FORM TO YOUR FUNCTION
  function handleSubmit(e) {
    e.preventDefault();
    addProduct();
  }

  // ✅ INPUT HANDLER
  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  // ✅ MAIN IMAGE
  async function handleMainImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await mediaUpload(file);
      setProduct({ ...product, imageUrl: url });
    } catch {
      toast.error("Image upload failed");
    }
    setUploading(false);
  }

  // ✅ ALT IMAGES
  function handleAltImages(e) {
    const files = Array.from(e.target.files);
    setProduct({ ...product, altImages: files });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f8f6f2] via-[#f3efe9] to-[#ece7df] p-3 sm:p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl space-y-6 rounded-3xl border border-white/50 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:space-y-8 sm:p-10"
      >

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#824203] sm:text-4xl">
            Add New Product
          </h2>
          <p className="text-[#552b04]">
            Craft a premium listing for your furniture collection
          </p>
        </div>

        {/* INPUT GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Product ID" name="productId" value={product.productId} onChange={handleChange} required />
          <Input label="Product Name" name="name" value={product.name} onChange={handleChange} required />
          <Input label="Price" name="price" type="number" min="0" value={product.price} onChange={handleChange} required />
          <Input label="Label Price" name="labelprice" type="number" min="0" value={product.labelprice} onChange={handleChange} required />
          <Input label="Stock" name="stock" type="number" min="0" value={product.stock} onChange={handleChange} required />

          <div>
            <label className="label">Category</label>
            <select name="category" value={product.category} onChange={handleChange} className="input" required>
              <option value="">Select Category</option>
              <option>Furniture</option>
              <option>Living</option>
              <option>Dining</option>
              <option>Lighting</option>
              <option>Office</option>
              <option>Bed Room</option>
              <option>Luxury</option>
            </select>
          </div>

          {/* ✅ NEW FIELD (fix for your altNmames bug) */}
          <Input
            label="Alternative Names (comma separated)"
            name="altNamesInput"
            value={product.altNamesInput}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="input h-32"
            required
          />
        </div>

        {/* IMAGE SECTION */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* MAIN IMAGE */}
          <div className="uploadCard">
            <p className="label mb-2">Main Image</p>

            <label className="uploadBox">
              Click to upload
              <input type="file" accept="image/*" onChange={handleMainImage} hidden />
            </label>

            {product.imageUrl && (
              <img src={product.imageUrl} alt="Main product preview" className="preview" />
            )}
          </div>

          {/* ALT IMAGES */}
          <div className="uploadCard">
            <p className="label mb-2">Gallery Images</p>

            <label className="uploadBox">
              Upload multiple images
              <input type="file" accept="image/*" multiple onChange={handleAltImages} hidden />
            </label>

            {/* ✅ FIXED preview */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {product.altImages.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="previewSmall"
                />
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading || uploading}
          className="btnPrimary"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>

      </form>

      {/* STYLES (kept yours, slightly refined) */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 12px;
          border-radius: 12px;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #8B5E3C;
          box-shadow: 0 0 0 3px rgba(139,94,60,0.2);
        }

        .label {
          font-size: 14px;
          font-weight: 600;
          color: #824203;
        }

        .uploadCard {
          background: #fff;
          border-radius: 16px;
          padding: 16px;
          border: 1px solid #eee;
          transition: 0.3s;
        }

        .uploadCard:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .uploadBox {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 120px;
          border: 2px dashed #C8A27C;
          border-radius: 12px;
          cursor: pointer;
          color: #8B5E3C;
          font-weight: 500;
        }

        .preview {
          width: 100%;
          height: 160px;
          object-fit: cover;
          margin-top: 10px;
          border-radius: 12px;
        }

        .previewSmall {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 8px;
        }

        .btnPrimary {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: linear-gradient(135deg, #824203, #a16207);
          color: white;
          font-weight: bold;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btnPrimary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(139,94,60,0.4);
        }
      `}</style>
    </div>
  );
}


// ✅ reusable
function Input({ label, ...props }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input {...props} className="input" />
    </div>
  );
}