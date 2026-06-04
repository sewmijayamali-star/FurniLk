import { useState, useEffect } from "react"; // ✅ ADDED useEffect
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import mediaUpload from "../../utils/imagesupload";

export default function AdminUpdateProduct() {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

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
    altNamesInput: ""
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ FIX 1: LOAD SELECTED PRODUCT INTO FORM
  useEffect(() => {
    if (location.state) {
      const p = location.state;

      setProduct({
        productId: p.productId || "",
        name: p.name || "",
        price: p.price || "",
        labelprice: p.labelprice || "",
        category: p.category || "",
        description: p.description || "",
        imageUrl: Array.isArray(p.imageUrl) ? p.imageUrl[0] : p.imageUrl || "",
        altImages: [],
        stock: p.stock || "",
        altNamesInput: p.altname ? p.altname.join(", ") : ""
      });
    }
  }, [location.state]);

  // ✅ KEEPING YOUR FUNCTION (logic same, only API changed)
  async function addProduct() {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    setLoading(true);

     const promises = product.altImages.map((img) =>
      mediaUpload(img)
      );

    try {
      const urls = await Promise.all(promises);

      const alternativeNames = product.altNamesInput
        .split(",")
        .map(name => name.trim());

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
        alternativeNames: alternativeNames
      };

      // ✅ FIX 2: CHANGE POST → PUT (ONLY THIS LINE CHANGED)
      await axios.put(
        import.meta.env.VITE_API_URL + "/products/" + id,
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Product updated 🚀"); // (text change only)
      navigate("/admin/products");

    } catch (err) {
      toast.error("Failed to update product");
    }

    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addProduct();
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

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

  function handleAltImages(e) {
    const files = Array.from(e.target.files);
    setProduct({ ...product, altImages: files });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f2] via-[#f3efe9] to-[#ece7df] flex items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-3xl p-10 space-y-8"
      >

        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-[#824203]">
            Update Your <Product></Product>
          </h2>
          <p className="text-[#552b04]">
            Craft a premium listing for your furniture collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Product ID" name="productId" value={product.productId} onChange={handleChange} />
          <Input label="Product Name" name="name" value={product.name} onChange={handleChange} />
          <Input label="Price" name="price" value={product.price} onChange={handleChange} />
          <Input label="Label Price" name="labelprice" value={product.labelprice} onChange={handleChange} />
          <Input label="Stock" name="stock" value={product.stock} onChange={handleChange} />

          <div>
            <label className="label">Category</label>
            <select name="category" value={product.category} onChange={handleChange} className="input">
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

          <Input
            label="Alternative Names (comma separated)"
            name="altNamesInput"
            value={product.altNamesInput}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="input h-32"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="uploadCard">
            <p className="label mb-2">Main Image</p>

            <label className="uploadBox">
              Click to upload
              <input type="file" onChange={handleMainImage} hidden />
            </label>

            {product.imageUrl && (
              <img src={product.imageUrl} className="preview" />
            )}
          </div>

          <div className="uploadCard">
            <p className="label mb-2">Gallery Images</p>

            <label className="uploadBox">
              Upload multiple images
              <input type="file" multiple onChange={handleAltImages} hidden />
            </label>

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

        <button
          type="submit"
          disabled={loading || uploading}
          className="btnPrimary"
        >
          {loading ? "Updating Product..." : "Update Product"}
        </button>

      </form>

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

function Input({ label, ...props }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input {...props} className="input" />
    </div>
  );
}

function Product() {
  return "Product";
}