import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProductPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {

    axios
      .get(import.meta.env.VITE_API_URL + "/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, []);

            const filteredProducts = products.filter((product) => {

          const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

          const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

          return matchesSearch && matchesCategory;
        });




  return (

    <div className="min-h-screen bg-[#f8f5f0]">

      {/* HERO SECTION */}
      <section className="relative h-[500px] w-full overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

          <h1 className="max-w-3xl text-5xl font-bold text-white lg:text-7xl">
            Modern Furniture For Elegant Living
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-200">
            Discover premium furniture collections crafted for comfort,
            luxury, and timeless interiors.
          </p>

          <button className="mt-8 rounded-full bg-[#B45309] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#92400E]">
            Shop Collection
          </button>

        </div>

      </section>

      {/* TOP BAR */}
      <section className="mx-auto mt-12 flex max-w-7xl flex-col gap-5 px-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Featured Products
          </h2>

          <p className="mt-2 text-slate-500">
            Explore our latest premium furniture collection
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-md">

          <FiSearch className="text-slate-500" />

        <input
            type="text"
            placeholder="Search furniture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px] outline-none"
            />

        </div>

      </section>

      {/* FILTERS */}
      <section className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-3 px-5">

                   <div className="flex flex-wrap gap-4">

        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium
          ${
            selectedCategory === "All"
              ? "bg-[#B45309] text-white border-[#B45309]"
              : "bg-white text-slate-700 border-slate-300 hover:bg-[#B45309] hover:text-white hover:border-[#B45309]"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setSelectedCategory("Living")}
          className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium
          ${
            selectedCategory === "Living"
              ? "bg-[#B45309] text-white border-[#B45309]"
              : "bg-white text-slate-700 border-slate-300 hover:bg-[#B45309] hover:text-white hover:border-[#B45309]"
          }`}
        >
          Living Room
        </button>

        <button
          onClick={() => setSelectedCategory("Bed Room")}
          className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium
          ${
            selectedCategory === "Bed Room"
              ? "bg-[#B45309] text-white border-[#B45309]"
              : "bg-white text-slate-700 border-slate-300 hover:bg-[#B45309] hover:text-white hover:border-[#B45309]"
          }`}
        >
          Bed Room
        </button>

        <button
          onClick={() => setSelectedCategory("Office")}
          className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium
          ${
            selectedCategory === "Office"
              ? "bg-[#B45309] text-white border-[#B45309]"
              : "bg-white text-slate-700 border-slate-300 hover:bg-[#B45309] hover:text-white hover:border-[#B45309]"
          }`}
        >
          Office
        </button>

                <button
                  onClick={() => setSelectedCategory("Dining")}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium
                  ${
                    selectedCategory === "Dining"
                      ? "bg-[#B45309] text-white border-[#B45309]"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-[#B45309] hover:text-white hover:border-[#B45309]"
                  }`}
                >
                  Dining
                </button>

                <button
                  onClick={() => setSelectedCategory("Luxury")}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium
                  ${
                    selectedCategory === "Luxury"
                      ? "bg-[#B45309] text-white border-[#B45309]"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-[#B45309] hover:text-white hover:border-[#B45309]"
                  }`}
                >
                  Luxury
                </button>

              </div>

                    </section>

                    {/* PRODUCTS */}
                    <section className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                      {loading ? (

                  <div className="col-span-full flex justify-center py-20">
                    <h1 className="text-2xl font-semibold text-slate-600">
                      Loading Products...
                    </h1>
                  </div>

                ) : (

          filteredProducts.map((product) => (

            <div
              key={product._id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={product.imageUrl[0]}
                  alt={product.name}
                  className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* BADGE */}
                <div className="absolute left-4 top-4 rounded-full bg-[#B45309] px-4 py-1 text-xs font-semibold text-white">
                  New
                </div>

                {/* ICONS */}
                <div className="absolute right-4 top-4 flex flex-col gap-3 opacity-0 transition group-hover:opacity-100">

                  <button className="rounded-full bg-white p-3 shadow-md transition hover:bg-[#B45309] hover:text-white">
                    <FiHeart />
                  </button>

                  <button className="rounded-full bg-white p-3 shadow-md transition hover:bg-[#B45309] hover:text-white">
                    <FiShoppingCart />
                  </button>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-5">

                <p className="text-sm text-[#B45309]">
                  Premium Furniture
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  {product.name}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                  {product.description}
                </p>

                {/* PRICE */}
                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      Rs. {product.price}
                    </p>
                  </div>

                  <Link state={product} to={`/overview/${product._id}`} className="rounded-full bg-[#B45309] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#92400E]">
                    Add Cart
                  </Link>

                </div>

              </div>

            </div>

          ))

        )}

      </section>

    </div>

  );
}