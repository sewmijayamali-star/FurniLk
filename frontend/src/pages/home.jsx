
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiRefreshCw,
} from "react-icons/fi";

import Navbar from "../components/navbar";

// ================= COLLECTION DATA =================

const collections = [
  {
    name: "Living Room",
    description: "Comfort made beautiful.",
    number: "01",
    category: "Living",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=90",
  },
  {
    name: "Bedroom",
    description: "Your personal sanctuary.",
    number: "02",
    category: "Bed Room",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=90",
  },
  {
    name: "Dining Room",
    description: "Made for meaningful moments.",
    number: "03",
    category: "Dining",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1100&q=90",
  },
];

// ================= SERVICE BENEFITS =================

const benefits = [
  {
    icon: FiTruck,
    title: "Islandwide Delivery",
    text: "Furniture delivered to your doorstep.",
  },
  {
    icon: FiShield,
    title: "Quality You Can Trust",
    text: "Thoughtful designs, made to last.",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Shopping",
    text: "A simple and convenient shopping experience.",
  },
  {
    icon: FiHeadphones,
    title: "Customer Support",
    text: "We're here whenever you need us.",
  },
];

// ================= HOME PAGE =================

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productError, setProductError] = useState(false);

  // Fetch real products from existing backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProductError(false);

        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/products"
        );

        if (Array.isArray(response.data)) {
          setProducts(response.data.slice(0, 4));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setProductError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get the first product image
  const getProductImage = (product) => {
    if (Array.isArray(product.imageUrl)) {
      return product.imageUrl[0] || "";
    }

    return product.imageUrl || "";
  };

  // Format product price
  const formatPrice = (price) => {
    return `Rs. ${Number(price).toLocaleString("en-LK")}`;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#29251F]">

      {/* ================= NAVBAR ================= */}

      <section className="relative h-[3px] w-full overflow-hidden sm:h-[100px]">
        <Navbar />
      </section>

      {/* ================= HERO SECTION ================= */}

      <section className="px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pb-16 lg:pt-6">

        <div
          className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[24px] bg-cover bg-center sm:min-h-[570px] lg:min-h-[680px] lg:rounded-[30px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90')",
            backgroundPosition: "center 55%",
          }}
        >

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />

          {/* Hero content */}
          <div className="relative z-10 mx-auto max-w-5xl px-5 py-20 text-center sm:px-10">

            <div className="mb-7 flex items-center justify-center gap-3">

              <span className="h-px w-9 bg-[#F4D6A0]" />

              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F4D6A0] sm:text-sm">
                The art of living well
              </p>

              <span className="h-px w-9 bg-[#F4D6A0]" />

            </div>

            <h1 className="font-serif text-5xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-8xl">

              Spaces that

              <span className="mt-2 block italic text-[#F4D6A0]">
                feel like home.
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/85 sm:text-lg sm:leading-8">

              Discover thoughtfully selected furniture that brings
              comfort, character and timeless style into every
              corner of your home.

            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Link
                to="/products"
                className="group inline-flex min-h-[54px] items-center justify-center gap-4 rounded-full bg-[#B45309] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#92400E] hover:shadow-xl"
              >
                Explore Furniture

                <FiArrowUpRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>

              <Link
                to="/collections"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/70 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#29251F]"
              >
                View Collections
              </Link>

            </div>

            <div className="mt-12 flex items-center justify-center gap-3 text-xs text-white/80 sm:text-sm">

              <span className="h-px w-8 bg-[#F4D6A0]" />

              Thoughtful design. Everyday comfort.

              <span className="h-px w-8 bg-[#F4D6A0]" />

            </div>

          </div>

          {/* Bottom label */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between sm:bottom-9 sm:left-10 sm:right-10">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
              FurniLK Interiors
            </p>

            <p className="font-serif text-lg italic text-white sm:text-2xl">
              Live beautifully.
            </p>

          </div>

        </div>

      </section>

      {/* ================= BENEFITS ================= */}

      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">

        <div className="grid gap-7 border-b border-[#E6DED3] pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">

          {benefits.map(({ icon: Icon, title, text }) => (

            <div
              key={title}
              className="flex items-start gap-4"
            >

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E6DED3] bg-white text-[#A34D13] transition duration-300 hover:bg-[#B45309] hover:text-white">

                <Icon size={21} strokeWidth={1.7} />

              </div>

              <div>

                <h3 className="text-sm font-bold text-[#29251F]">
                  {title}
                </h3>

                <p className="mt-2 max-w-[230px] text-xs leading-6 text-[#81776B] sm:text-sm">
                  {text}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================= COLLECTIONS ================= */}

      <section className="mx-auto max-w-[1500px] px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-28">

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#A34D13]">
              Explore our world
            </p>

            <h2 className="max-w-[650px] font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">

              Find your place.

              <span className="block italic text-[#A34D13]">
                Find your style.
              </span>

            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#81776B] sm:text-base">

              Every room tells a story. Discover furniture
              that helps you create yours.

            </p>

          </div>

          <Link
            to="/products"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#B45309] pb-2 text-sm font-semibold text-[#92400E]"
          >
            Explore all furniture

            <FiArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />

          </Link>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {collections.map((collection) => (

            <Link
              key={collection.name}
              to="/products"
              state={{ category: collection.category }}
              className="group relative overflow-hidden rounded-[20px] bg-[#F0E9DF]"
            >

              <div className="relative h-[360px] overflow-hidden sm:h-[420px] lg:h-[480px]">

                <img
                  src={collection.image}
                  alt={`${collection.name} furniture collection`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                <span className="absolute left-6 top-6 text-xs font-semibold tracking-[0.2em] text-white/80">
                  {collection.number} / 03
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">

                  <div>

                    <p className="text-xs font-medium text-white/75">
                      {collection.description}
                    </p>

                    <h3 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                      {collection.name}
                    </h3>

                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-white transition-all duration-300 group-hover:border-[#B45309] group-hover:bg-[#B45309]">

                    <FiArrowUpRight size={21} />

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="bg-[#F0E9DF] py-20 sm:py-24">

        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#A34D13]">
                Selected for you
              </p>

              <h2 className="font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">

                Pieces worth

                <span className="italic text-[#A34D13]">
                  {" "}keeping.
                </span>

              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-[#71685E] sm:text-base">
                Discover furniture selected to bring warmth,
                comfort and character to your space.
              </p>

            </div>

            <Link
              to="/products"
              className="group inline-flex w-fit items-center gap-3 border-b border-[#B45309] pb-2 text-sm font-semibold text-[#92400E]"
            >
              View all products

              <FiArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>

          </div>

          {/* Loading state */}
          {loading && (

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="animate-pulse"
                >

                  <div className="h-[220px] rounded-[16px] bg-white/70 sm:h-[330px]" />

                  <div className="mt-4 h-3 w-24 rounded bg-white/70" />

                  <div className="mt-3 h-5 w-3/4 rounded bg-white/70" />

                  <div className="mt-3 h-4 w-1/2 rounded bg-white/70" />

                </div>

              ))}

            </div>

          )}

          {/* Error state */}
          {!loading && productError && (

            <div className="rounded-[20px] border border-[#E2D6C8] bg-white/60 px-6 py-12 text-center">

              <h3 className="font-serif text-2xl text-[#29251F]">
                Products are temporarily unavailable.
              </h3>

              <p className="mt-3 text-sm text-[#81776B]">
                Please visit our shop to explore our furniture collection.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#B45309] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#92400E]"
              >
                Visit Shop
                <FiArrowRight size={17} />
              </Link>

            </div>

          )}

          {/* Empty state */}
          {!loading && !productError && products.length === 0 && (

            <div className="rounded-[20px] border border-[#E2D6C8] bg-white/60 px-6 py-12 text-center">

              <h3 className="font-serif text-2xl text-[#29251F]">
                New pieces are on their way.
              </h3>

              <p className="mt-3 text-sm text-[#81776B]">
                Explore our complete furniture collection.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#B45309] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#92400E]"
              >
                Explore Shop
                <FiArrowRight size={17} />
              </Link>

            </div>

          )}

          {/* Product cards */}
          {!loading && !productError && products.length > 0 && (

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">

              {products.map((product) => {

                const image = getProductImage(product);

                return (

                  <Link
                    key={product._id}
                    to={`/overview/${product._id}`}
                    className="group min-w-0"
                  >

                    <div className="relative overflow-hidden rounded-[16px] bg-white">

                      {image ? (

                        <img
                          src={image}
                          alt={product.name}
                          loading="lazy"
                          className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[330px]"
                        />

                      ) : (

                        <div className="flex h-[220px] items-center justify-center bg-[#E6DED3] text-xs text-[#71685E] sm:h-[330px]">
                          Image unavailable
                        </div>

                      )}

                      <span className="absolute left-3 top-3 rounded-full bg-[#F8F5F0]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#92400E] sm:left-4 sm:top-4 sm:text-[10px]">
                        FurniLK Selection
                      </span>

                      <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#29251F] shadow-sm transition-all duration-300 group-hover:bg-[#B45309] group-hover:text-white sm:bottom-4 sm:right-4 sm:h-11 sm:w-11">

                        <FiArrowUpRight size={19} />

                      </div>

                    </div>

                    <div className="px-1 pt-4">

                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A34D13] sm:text-xs">
                        {product.category || "Furniture"}
                      </p>

                      <h3 className="mt-2 line-clamp-1 text-sm font-semibold text-[#29251F] transition-colors group-hover:text-[#A34D13] sm:text-base">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm font-bold text-[#29251F] sm:text-base">
                        {formatPrice(product.price)}
                      </p>

                    </div>

                  </Link>

                );

              })}

            </div>

          )}

        </div>

      </section>

      {/* ================= BRAND STORY ================= */}

      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Different brand story image */}
          <div className="relative">

            <div className="overflow-hidden rounded-[20px]">

              <img
                src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=90"
                alt="Beautifully styled contemporary furniture interior"
                loading="lazy"
                className="h-[380px] w-full object-cover sm:h-[540px]"
              />

            </div>

            <div className="absolute -bottom-6 -right-3 hidden rounded-[16px] border border-[#E6DED3] bg-white p-6 shadow-lg sm:block sm:-right-6">

              <p className="font-serif text-3xl italic text-[#A34D13]">
                FurniLK
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#81776B]">
                Furniture for living
              </p>

            </div>

          </div>

          {/* Brand content */}
          <div className="lg:py-10">

            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#A34D13]">
              The FurniLK story
            </p>

            <h2 className="font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">

              It's not just

              <span className="block italic text-[#A34D13]">
                furniture.
              </span>

              It's where life happens.

            </h2>

            <p className="mt-7 text-sm leading-8 text-[#71685E] sm:text-base">

              Your home is more than four walls. It's where
              everyday moments become memories and where
              your personal style comes to life.

            </p>

            <p className="mt-4 text-sm leading-8 text-[#71685E] sm:text-base">

              At FurniLK, we bring together furniture for
              comfortable, beautiful and meaningful spaces.
              Explore pieces that make your house feel
              truly yours.

            </p>

            <Link
              to="/about"
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#29251F] px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-[#B45309]"
            >
              Discover our story

              <FiArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">

        <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[24px] bg-[#29251F]">

          {/* Different CTA image */}
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90"
            alt="Modern luxury home interior"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#29251F]/95 via-[#29251F]/75 to-[#29251F]/30" />

          <div className="relative z-10 px-7 py-16 sm:px-14 sm:py-24 lg:px-24">

            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#F4D6A0]">
              Your space. Your story.
            </p>

            <h2 className="max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">

              A better space

              <span className="block italic text-[#F4D6A0]">
                starts here.
              </span>

            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              Discover furniture that brings your ideas
              to life. Find something that feels like you.
            </p>

            <Link
              to="/products"
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#B45309] px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#92400E]"
            >
              Start exploring

              <FiArrowUpRight
                size={19}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#E6DED3] bg-[#F0E9DF]">

        <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

            {/* Brand */}
            <div>

              <Link to="/" className="inline-block">

                <h2 className="font-serif text-3xl font-bold tracking-tight text-[#29251F]">
                  Furni<span className="text-[#B45309]">LK</span>
                </h2>

              </Link>

              <p className="mt-4 max-w-xs text-sm leading-7 text-[#71685E]">
                Thoughtfully selected furniture for
                beautiful and comfortable everyday living.
              </p>

              <div className="mt-6 flex gap-3">

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9CFC1] text-[#71685E] transition hover:border-[#B45309] hover:bg-[#B45309] hover:text-white"
                >
                  <span className="text-sm font-bold">IG</span>
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9CFC1] text-[#71685E] transition hover:border-[#B45309] hover:bg-[#B45309] hover:text-white"
                >
                  <span className="text-sm font-bold">FB</span>
                </a>

              </div>

            </div>

            {/* Explore */}
            <div>

              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#29251F]">
                Explore
              </h3>

              <div className="mt-5 flex flex-col gap-4 text-sm text-[#71685E]">

                <Link to="/products" className="transition hover:text-[#B45309]">
                  Shop Furniture
                </Link>

                <Link to="/collections" className="transition hover:text-[#B45309]">
                  Collections
                </Link>

                <Link to="/cart" className="transition hover:text-[#B45309]">
                  Shopping Cart
                </Link>

              </div>

            </div>

            {/* Company */}
            <div>

              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#29251F]">
                Company
              </h3>

              <div className="mt-5 flex flex-col gap-4 text-sm text-[#71685E]">

                <Link to="/about" className="transition hover:text-[#B45309]">
                  About FurniLK
                </Link>

                <Link to="/contact" className="transition hover:text-[#B45309]">
                  Contact Us
                </Link>

                <Link to="/login" className="transition hover:text-[#B45309]">
                  My Account
                </Link>

              </div>

            </div>

            {/* Customer care */}
            <div>

              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#29251F]">
                Customer Care
              </h3>

              <p className="mt-5 max-w-[220px] text-sm leading-7 text-[#71685E]">
                Need assistance? Explore our collections
                or get in touch with our team.
              </p>

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#92400E] transition hover:text-[#B45309]"
              >
                Get in touch
                <FiArrowUpRight size={16} />
              </Link>

            </div>

          </div>

          {/* Copyright */}
          <div className="mt-12 flex flex-col gap-4 border-t border-[#D9CFC1] pt-7 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-[#81776B]">
              © {new Date().getFullYear()} FurniLK. All rights reserved.
            </p>

            <p className="text-xs text-[#81776B]">
              Designed for beautiful living.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}
