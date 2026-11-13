
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiArrowUpRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar";

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

  const categories = [
    "All",
    "Living",
    "Bed Room",
    "Office",
    "Dining",
    "Luxury",
  ];

  return (

    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#29251F]">

      {/* NAVBAR */}

      <Navbar />

      {/* HERO SECTION */}

      <section className="mx-auto max-w-[1600px] px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-14 lg:pb-20 lg:pt-32">

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* HERO CONTENT */}

          <div className="lg:col-span-6">

            <div className="mb-7 flex items-center gap-3">

              <span className="h-px w-9 bg-[#B45309]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A34D13]">
                THE FURNILK COLLECTION
              </p>

            </div>

            <h1 className="max-w-2xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-[76px]">

              Find your

              <span className="block pl-8 italic text-[#A34D13] sm:pl-16">
                perfect piece.
              </span>

            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-[#81776B] sm:text-base">
              Explore thoughtfully selected furniture designed
              to bring comfort, character and timeless style
              into every corner of your home.
            </p>

            <Link
              to="/collections"
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#29251F] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B45309]"
            >
              Explore Collections

              <FiArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>

          </div>

          {/* HERO IMAGE */}

          <div className="relative overflow-visible lg:col-span-6">

            <div className="h-[300px] overflow-hidden rounded-tl-[130px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] bg-[#E9E1D6] sm:h-[380px] lg:h-[440px]">

              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90"
                alt="Luxury contemporary furniture collection"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

            </div>

            <div className="absolute -bottom-6 left-5 z-20 rounded-lg border border-[#E9DED0] bg-[#F8F5F0] px-5 py-4 shadow-lg sm:left-7">

              <p className="font-serif text-2xl italic text-[#A34D13]">
                FurniLK
              </p>

              <p className="mt-1 text-[9px] tracking-[0.2em] text-[#81776B]">
                FURNITURE FOR LIVING
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* PRODUCTS HEADER & SEARCH */}

      <section className="mx-auto max-w-[1600px] px-5 pt-16 sm:px-8 lg:px-14 lg:pt-24">

        <div className="flex flex-col justify-between gap-7 border-b border-[#DDD2C4] pb-8 lg:flex-row lg:items-end">

          <div>

            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              FIND YOUR FAVOURITE
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl">
              Our Furniture
            </h2>

            <p className="mt-3 text-sm text-[#81776B]">
              Discover furniture that makes your space feel like home.
            </p>

          </div>

          {/* SEARCH */}

          <div className="flex w-full items-center gap-3 rounded-full border border-[#E3D8C9] bg-white px-5 py-4 transition focus-within:border-[#A34D13] lg:w-[340px]">

            <FiSearch className="shrink-0 text-[#A34D13]" size={19} />

            <input
              type="text"
              placeholder="Search furniture..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#A49A8E]"
            />

          </div>

        </div>

      </section>

      {/* CATEGORY FILTERS */}

      <section className="mx-auto mt-8 max-w-[1600px] px-5 sm:px-8 lg:px-14">

        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300
                ${
                  selectedCategory === category
                    ? "border-[#29251F] bg-[#29251F] text-white"
                    : "border-[#DDD2C4] bg-transparent text-[#655C52] hover:border-[#A34D13] hover:text-[#A34D13]"
                }`}
            >
              {category === "Living" ? "Living Room" : category}

            </button>

          ))}

        </div>

      </section>

      {/* PRODUCT GRID */}

      <section className="mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-5 px-5 pb-24 sm:grid-cols-2 sm:gap-8 sm:px-8 lg:grid-cols-3 lg:px-14 xl:grid-cols-4">

        {loading ? (

          <div className="col-span-full flex justify-center py-20">

            <h1 className="font-serif text-2xl text-[#81776B]">
              Loading Products...
            </h1>

          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="col-span-full py-24 text-center">

            <h3 className="font-serif text-3xl text-[#29251F]">
              No products found
            </h3>

            <p className="mt-3 text-sm text-[#81776B]">
              Try another search or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-full bg-[#29251F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#B45309]"
            >
              Clear Filters
            </button>

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
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[320px]"
                />

                {/* BADGE */}

                <div className="absolute left-4 top-4 rounded-full bg-[#B45309] px-4 py-1 text-xs font-semibold text-white">
                  New
                </div>

                {/* ICONS */}

                <div className="absolute right-4 top-4 flex flex-col gap-3 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">

                  <button className="rounded-full bg-white p-3 shadow-md transition hover:bg-[#B45309] hover:text-white">
                    <FiHeart />
                  </button>

                  <button className="rounded-full bg-white p-3 shadow-md transition hover:bg-[#B45309] hover:text-white">
                    <FiShoppingCart />
                  </button>

                </div>

              </div>

              {/* CONTENT - ORIGINAL PRODUCT CARD PRESERVED */}

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

                  <Link
                    state={product}
                    to={`/overview/${product._id}`}
                    className="rounded-full bg-[#B45309] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#92400E]"
                  >
                    Add Cart
                  </Link>

                </div>

              </div>

            </div>

          ))

        )}

      </section>

    </main>

  );

}
