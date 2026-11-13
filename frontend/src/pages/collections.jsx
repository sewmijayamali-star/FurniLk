
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";

import Navbar from "../components/navbar";

// ================= ROOM COLLECTIONS =================

const rooms = [
  {
    id: "01",
    title: "Living",
    subtitle: "The heart of your home",
    description: "Relaxed spaces. Beautiful moments.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-7",
  },
  {
    id: "02",
    title: "Bedroom",
    subtitle: "A place to unwind",
    description: "Comfort in every detail.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85",
    className: "md:col-span-5 md:mt-24",
  },
  {
    id: "03",
    title: "Dining",
    subtitle: "Together is better",
    description: "Made for moments worth sharing.",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-5",
  },
  {
    id: "04",
    title: "Workspace",
    subtitle: "Work beautifully",
    description: "Inspiring spaces for everyday ideas.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-7 md:mt-24",
  },
];

// ================= SIGNATURE STYLES =================

const styles = [
  {
    name: "Modern Minimal",
    description: "Simple forms. Intentional living.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Contemporary",
    description: "A fresh perspective on home.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Timeless Luxury",
    description: "Elegance beyond trends.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
  },
];

// ================= COLLECTIONS PAGE =================

export default function Collections() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#29251F]">

      {/* NAVBAR */}

      <Navbar />

      {/* EDITORIAL HERO */}

<section className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-14 lg:pb-24 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-20">

          {/* LEFT CONTENT */}

          <div className="lg:col-span-6">

            <div className="mb-7 flex items-center gap-3">

              <span className="h-px w-9 bg-[#B45309]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A34D13]">
                THE FURNILK COLLECTION
              </p>

            </div>

            <h1 className="max-w-2xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-[76px]">

              Curated for

              <span className="mt-1 block pl-8 italic text-[#A34D13] sm:pl-16">
                beautiful living.
              </span>

            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-[#81776B] sm:text-base">
              Discover thoughtfully selected furniture for every
              corner of your home. Explore spaces, styles and
              pieces that reflect the way you live.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">

              <Link
                to="/products"
                className="group inline-flex items-center gap-4 rounded-full bg-[#29251F] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B45309]"
              >
                Explore furniture

                <FiArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>

              <span className="text-[10px] tracking-[0.16em] text-[#81776B] sm:text-xs">
                04 SPACES · 03 SIGNATURE STYLES
              </span>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          
{/* RIGHT IMAGE */}

<div className="relative overflow-visible lg:col-span-6">

<div className="relative h-[300px] overflow-hidden rounded-tl-[100px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] bg-[#E9E1D6] sm:h-[380px] lg:h-[440px]">    <img
      src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90"
      alt="Sophisticated contemporary furniture interior"
      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
    />

  </div>

  {/* IMAGE LABEL */}

  <div className="absolute -bottom-10 left-5 rounded-lg border border-[#E9DED0] bg-[#F8F5F0] px-5 py-4 shadow-lg sm:left-7">

    <p className="font-serif text-2xl italic text-[#A34D13]">
      FurniLK
    </p>

    <p className="mt-1 text-[9px] tracking-[0.2em] text-[#81776B]">
      FURNITURE FOR LIVING
    </p>

  </div>

  {/* IMAGE NUMBER */}

  <span className="absolute right-4 top-4 rounded-full bg-[#F8F5F0]/90 px-4 py-2 text-[10px] font-semibold tracking-widest text-[#29251F]">
    01 / 04
  </span>

</div>

        </div>

      </section>

      {/* ROOM COLLECTIONS */}

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">

        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>

            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              Explore your spaces
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
              A room for every story.
            </h2>

          </div>

          <p className="max-w-sm text-sm leading-7 text-[#81776B]">
            From welcoming living rooms to peaceful bedrooms,
            discover furniture that makes every space yours.
          </p>

        </div>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">

          {rooms.map((room) => (

            <Link
              to="/products"
              key={room.id}
              className={`group block ${room.className}`}
            >

              <div className="relative h-[320px] overflow-hidden bg-[#E9E1D6] sm:h-[440px] lg:h-[520px]">

                <img
                  src={room.image}
                  alt={`${room.title} furniture collection`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute left-5 top-5 bg-[#F8F5F0] px-4 py-2 text-[10px] font-semibold tracking-widest">
                  {room.id} / 04
                </div>

                <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F5F0] transition group-hover:bg-[#B45309] group-hover:text-white">

                  <FiArrowUpRight size={21} />

                </div>

              </div>

              <div className="flex flex-col gap-2 border-b border-[#DDD2C4] py-6 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#A34D13]">
                    {room.subtitle}
                  </p>

                  <h3 className="mt-2 font-serif text-4xl sm:text-5xl">
                    {room.title}
                  </h3>

                </div>

                <p className="pb-2 text-xs text-[#81776B]">
                  {room.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* SIGNATURE STYLES */}

      <section className="bg-[#EDE5DA] py-20 lg:py-28">

        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">

          <div className="mb-12 text-center">

            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              Discover your aesthetic
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
              Styles that speak to you.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#81776B]">
              Different expressions of beautiful living,
              brought together in one collection.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {styles.map((style, index) => (

              <Link
                to="/products"
                key={style.name}
                className="group"
              >

                <div className="h-[340px] overflow-hidden bg-[#E9E1D6] sm:h-[420px]">

                  <img
                    src={style.image}
                    alt={style.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                </div>

                <div className="flex items-center justify-between border-b border-[#D5C9B9] py-6">

                  <div>

                    <p className="text-[10px] tracking-[0.2em] text-[#A34D13]">
                      STYLE 0{index + 1}
                    </p>

                    <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                      {style.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#81776B]">
                      {style.description}
                    </p>

                  </div>

                  <FiArrowUpRight
                    size={23}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* BOTTOM EDITORIAL CTA */}

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

          <div className="relative h-[350px] overflow-hidden bg-[#E9E1D6] sm:h-[480px]">

            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary luxury home interior"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

          </div>

          <div>

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              Make it yours
            </p>

            <h2 className="font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">

              Your space.

              <span className="block italic text-[#A34D13]">
                Your story.
              </span>

            </h2>

            <p className="mt-7 max-w-md text-sm leading-8 text-[#81776B]">
              The right furniture does more than fill a room.
              It creates an atmosphere, reflects your personality
              and makes a house feel like home.
            </p>

            <Link
              to="/products"
              className="mt-9 inline-flex items-center gap-4 border-b border-[#A34D13] pb-3 text-sm font-semibold text-[#A34D13] transition-all hover:gap-6"
            >
              Discover all furniture

              <FiArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
