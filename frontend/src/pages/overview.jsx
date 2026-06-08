import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ImageSlider from "../components/ImageSlider";
import { Link, useParams } from "react-router-dom";
import { Addtocart } from "../utils/cart";
import axios from "axios";
import { toast } from "react-toastify";

import {
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCcw
} from "react-icons/fi";

export default function Overview() {

  const params = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {

    axios.get(import.meta.env.VITE_API_URL + `/products/${params.id}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });

  }, [params.id]);

  return (

    <div className="min-h-screen bg-[#f8f6f2]">

      {status === "loading" && <Loader />}

      {status === "error" && (
        <p className="text-center text-red-500 pt-20">
          Failed to load product details
        </p>
      )}

      {status === "success" && (

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* MAIN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* LEFT SIDE */}
            <div className="sticky top-10">
              <ImageSlider images={product.imageUrl} />
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* Category */}
              <div>
                <span className="bg-[#824203] text-white px-4 py-2 rounded-full text-sm tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <div>
                <h1 className="text-5xl font-bold text-[#1a1a1a] leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">

                <p className="text-4xl font-bold text-[#824203]">
                  LKR {product.price}
                </p>

                <p className="text-xl text-gray-400 line-through">
                  LKR {product.labelprice}
                </p>

              </div>

              {/* Stock */}
              <div className="flex items-center gap-3">

                <div className="w-3 h-3 rounded-full bg-green-500"></div>

                <p className="text-green-600 font-medium">
                  In Stock ({product.stock} Available)
                </p>

              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-200 py-8">

                <h2 className="text-xl font-semibold mb-4">
                  Product Description
                </h2>

                <p className="text-gray-600 leading-8 text-lg">
                  {product.description}
                </p>

              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-3 gap-4">

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                  <FiTruck className="mx-auto text-2xl mb-3 text-[#824203]" />
                  <p className="text-sm font-medium">
                    Free Delivery
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                  <FiShield className="mx-auto text-2xl mb-3 text-[#824203]" />
                  <p className="text-sm font-medium">
                    2 Year Warranty
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                  <FiRefreshCcw className="mx-auto text-2xl mb-3 text-[#824203]" />
                  <p className="text-sm font-medium">
                    Easy Returns
                  </p>
                </div>

              </div>

              {/* BUTTONS */}
             <div className="flex gap-4 mt-8">

                          <button
                onClick={() => {
                    Addtocart(product, 1);
                    toast.success("Product added to cart!");
                }}
                className="flex-1 bg-[#824203] hover:bg-[#6d3602] text-white py-4 rounded-2xl font-semibold transition"
            >
                Add To Cart
            </button>
              <Link
                 to="/checkout"
                 state={[{ id: product.id, name: product.name, price: product.price, quantity: 1, img: product.imageUrl[0] }]}
                  className="flex-1 bg-[#824203] hover:bg-[#6d3602] text-white py-4 rounded-2xl font-semibold transition flex items-center justify-center"
              >
                         Buy Now
              </Link>

            </div>

              {/* EXTRA INFO */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

                <h3 className="text-xl font-semibold mb-5">
                  Why You'll Love It
                </h3>

                <ul className="space-y-4 text-gray-600">

                  <li>✔ Premium quality craftsmanship</li>

                  <li>✔ Modern luxury furniture design</li>

                  <li>✔ Durable materials with elegant finishing</li>

                  <li>✔ Perfect for contemporary interiors</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}