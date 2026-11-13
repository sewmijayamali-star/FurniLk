
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiShield,
  FiHeart,
  FiLayers,
  FiTruck,
} from "react-icons/fi";

import Navbar from "../components/navbar";

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#29251F]">

      <Navbar />

      {/* HERO SECTION */}

      <section className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-14 lg:pb-24 lg:pt-32">

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          <div className="lg:col-span-6">

            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B45309]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A34D13]">
                THE STORY BEHIND FURNILK
              </p>
            </div>

            <h1 className="max-w-2xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-[76px]">

              More than

              <span className="block pl-8 italic text-[#A34D13] sm:pl-16">
                furniture.
              </span>

              A way of living.

            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-[#81776B] sm:text-base">
              We believe that the spaces we live in should
              reflect who we are. At FurniLK, we bring together
              comfort, thoughtful design and timeless style
              to help make every house feel like home.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">

              <Link
                to="/products"
                className="group inline-flex items-center gap-4 rounded-full bg-[#29251F] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B45309]"
              >
                Explore our furniture

                <FiArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <span className="text-[10px] tracking-[0.16em] text-[#81776B]">
                DESIGNED FOR EVERYDAY LIVING
              </span>

            </div>

          </div>

          <div className="relative overflow-visible lg:col-span-6">

            <div className="h-[300px] overflow-hidden rounded-tr-[130px] rounded-bl-[130px] bg-[#E9E1D6] sm:h-[380px] lg:h-[440px]">

              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90"
                alt="Beautifully designed contemporary living space"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

            </div>

            <div className="absolute -bottom-8 left-5 z-20 rounded-lg border border-[#E9DED0] bg-[#F8F5F0] px-5 py-4 shadow-lg sm:left-7">

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

      {/* BRAND STORY */}

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className="relative">

            <div className="h-[350px] overflow-hidden rounded-sm bg-[#E9E1D6] sm:h-[500px]">

              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
                alt="Elegant contemporary home interior"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

            </div>

            <div className="absolute -bottom-6 right-5 bg-[#29251F] px-6 py-5 text-[#F8F5F0] sm:right-8">

              <p className="font-serif text-3xl italic">
                Thoughtfully
              </p>

              <p className="mt-1 text-[9px] tracking-[0.2em] text-[#D9C8B4]">
                SELECTED FOR YOUR HOME
              </p>

            </div>

          </div>

          <div className="lg:pl-6">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              OUR STORY
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">

              Creating spaces

              <span className="block italic text-[#A34D13]">
                worth coming home to.
              </span>

            </h2>

            <p className="mt-7 text-sm leading-8 text-[#81776B]">
              FurniLK is built around a simple idea: furniture
              should make everyday living more comfortable,
              functional and beautiful.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#81776B]">
              From statement pieces to everyday essentials,
              our collection brings together different styles
              of furniture to help you create spaces that feel
              personal and welcoming.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#81776B]">
              We focus on bringing together design, practicality
              and comfort, making it easier to discover pieces
              that complement your home.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#A34D13] pb-3 text-sm font-semibold text-[#A34D13] transition-all hover:gap-5"
            >
              Discover our collection
              <FiArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

      {/* PHILOSOPHY */}

      <section className="bg-[#EDE5DA] py-20 lg:py-28">

        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              WHAT WE BELIEVE IN
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
              Our philosophy.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#81776B]">
              Good furniture is not just about appearance.
              It is about how a space feels and how it works
              for the people who live in it.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="border-t border-[#D5C9B9] px-2 py-8">

              <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#D5C9B9] text-[#A34D13]">
                <FiShield size={23} />
              </span>

              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#A34D13]">
                01 / QUALITY
              </p>

              <h3 className="mt-4 font-serif text-3xl">
                Quality matters.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#81776B]">
                We believe furniture should offer a balance
                of thoughtful design, functionality and
                lasting everyday comfort.
              </p>

            </div>

            <div className="border-t border-[#D5C9B9] px-2 py-8">

              <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#D5C9B9] text-[#A34D13]">
                <FiHeart size={23} />
              </span>

              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#A34D13]">
                02 / COMFORT
              </p>

              <h3 className="mt-4 font-serif text-3xl">
                Live comfortably.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#81776B]">
                Every space should feel welcoming. We value
                furniture that makes everyday moments
                more enjoyable.
              </p>

            </div>

            <div className="border-t border-[#D5C9B9] px-2 py-8">

              <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#D5C9B9] text-[#A34D13]">
                <FiLayers size={23} />
              </span>

              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#A34D13]">
                03 / DESIGN
              </p>

              <h3 className="mt-4 font-serif text-3xl">
                Style with purpose.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#81776B]">
                From minimal to contemporary, we appreciate
                designs that bring character and balance
                into every room.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* BRAND EXPERIENCE */}

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          <div className="lg:col-span-5">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              THE FURNILK EXPERIENCE
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">

              Designed around

              <span className="block italic text-[#A34D13]">
                your everyday.
              </span>

            </h2>

            <p className="mt-6 max-w-md text-sm leading-8 text-[#81776B]">
              Discover a more thoughtful way to shop for
              furniture, with collections and a shopping
              experience designed around your home.
            </p>

          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">

            <div className="border-b border-[#DDD2C4] pb-7">

              <FiTruck size={25} className="text-[#A34D13]" />

              <h3 className="mt-5 text-lg font-semibold">
                Islandwide Delivery
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#81776B]">
                Bringing your furniture choices closer to
                your doorstep.
              </p>

            </div>

            <div className="border-b border-[#DDD2C4] pb-7">

              <FiShield size={25} className="text-[#A34D13]" />

              <h3 className="mt-5 text-lg font-semibold">
                Quality Focus
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#81776B]">
                Discover furniture selected with quality
                and functionality in mind.
              </p>

            </div>

            <div className="border-b border-[#DDD2C4] pb-7">

              <FiHeart size={25} className="text-[#A34D13]" />

              <h3 className="mt-5 text-lg font-semibold">
                Easy Shopping
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#81776B]">
                Explore furniture collections through a
                simple shopping experience.
              </p>

            </div>

            <div className="border-b border-[#DDD2C4] pb-7">

              <FiArrowRight size={25} className="text-[#A34D13]" />

              <h3 className="mt-5 text-lg font-semibold">
                Customer Support
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#81776B]">
                We are here to help make your furniture
                shopping experience easier.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-8 lg:px-14 lg:pb-28">

        <div className="relative overflow-hidden rounded-sm bg-[#29251F] px-7 py-16 text-center sm:px-12 sm:py-24">

          <div className="relative z-10 mx-auto max-w-2xl">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E5B77B]">
              MAKE YOUR SPACE YOURS
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#F8F5F0] sm:text-5xl lg:text-6xl">

              Every home has

              <span className="block italic text-[#E5B77B]">
                a story to tell.
              </span>

            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#C9BFB2]">
              Find the pieces that bring your space together.
              Explore the FurniLK collection and discover
              furniture that feels like home.
            </p>

            <Link
              to="/products"
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#B45309] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D16A16]"
            >
              Explore furniture

              <FiArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
