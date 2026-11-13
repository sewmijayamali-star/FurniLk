
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiArrowUpRight,
  FiSend,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
} from "react-icons/fi";

import Navbar from "../components/navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect this form to your backend later.
    console.log("Contact Form Data:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5F0] text-[#29251F]">

      <Navbar />

      {/* HERO SECTION */}

      <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-28 sm:px-8 lg:px-14 lg:pb-16 lg:pt-32">

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">

          <div className="lg:col-span-7">

            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#A34D13]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
                WE WOULD LOVE TO HEAR FROM YOU
              </p>
            </div>

            <h1 className="max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-[78px]">

              Let's talk

              <span className="block pl-8 italic text-[#A34D13] sm:pl-16">
                about home.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-sm leading-8 text-[#81776B] sm:text-base">
              Have a question about our furniture, an order,
              or need help finding the perfect piece for your
              space? We are here to help.
            </p>

          </div>

          <div className="relative lg:col-span-5">

            <div className="h-[260px] overflow-hidden rounded-tl-[120px] rounded-br-[120px] bg-[#E9E1D6] sm:h-[330px]">

              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90"
                alt="Warm contemporary living room"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

            </div>

            <div className="absolute -bottom-5 right-5 rounded-sm bg-white px-5 py-4 shadow-lg">

              <p className="font-serif text-xl italic text-[#A34D13]">
                FurniLK
              </p>

              <p className="mt-1 text-[9px] tracking-[0.2em] text-[#81776B]">
                HERE FOR YOUR HOME
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACT DETAILS + FORM */}

      <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-14 lg:py-24">

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* LEFT CONTACT INFORMATION */}

          <div className="lg:col-span-4">

            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A34D13]">
              GET IN TOUCH
            </p>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              We're just a message away.
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#81776B]">
              Whether you are exploring our collections
              or need assistance with an order, feel free
              to reach out to us.
            </p>

            <div className="mt-10 space-y-7">

              <div className="flex gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E3D8C9] text-[#A34D13]">
                  <FiMail size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    Email Us
                  </p>

                  <a
                    href="mailto:support@furnilk.com"
                    className="mt-2 block text-sm text-[#81776B] hover:text-[#A34D13]"
                  >
                    support@furnilk.com
                  </a>
                </div>

              </div>

              <div className="flex gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E3D8C9] text-[#A34D13]">
                  <FiPhone size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    Call Us
                  </p>

                  <p className="mt-2 text-sm text-[#81776B]">
                    +94 XX XXX XXXX
                  </p>
                </div>

              </div>

              <div className="flex gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E3D8C9] text-[#A34D13]">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    Our Location
                  </p>

                  <p className="mt-2 text-sm text-[#81776B]">
                    Sri Lanka
                  </p>
                </div>

              </div>

              <div className="flex gap-5">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E3D8C9] text-[#A34D13]">
                  <FiClock size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    Working Hours
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#81776B]">
                    Monday – Friday
                    <br />
                    9:00 AM – 5:00 PM
                  </p>
                </div>

              </div>

            </div>

            {/* SOCIAL LINKS */}

            <div className="mt-12 border-t border-[#E3D8C9] pt-7">

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#81776B]">
                FOLLOW OUR JOURNEY
              </p>

              <div className="flex gap-3">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E3D8C9] transition-all hover:border-[#A34D13] hover:bg-[#A34D13] hover:text-white"
                >
                  <FiInstagram size={18} />
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E3D8C9] transition-all hover:border-[#A34D13] hover:bg-[#A34D13] hover:text-white"
                >
                  <FiFacebook size={18} />
                </a>

              </div>

            </div>

          </div>

          {/* RIGHT CONTACT FORM */}

          <div className="lg:col-span-8">

            <div className="rounded-sm border border-[#E9E1D6] bg-white p-6 shadow-sm sm:p-10 lg:p-12">

              <div className="mb-9">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A34D13]">
                  SEND US A MESSAGE
                </p>

                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  How can we help you?
                </h2>

                <p className="mt-3 text-sm text-[#81776B]">
                  Fill in the details below and tell us what
                  you need assistance with.
                </p>

              </div>

              {submitted && (

                <div className="mb-7 border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800">
                  Your message has been submitted locally.
                  Please connect the form to your backend to
                  deliver messages.
                </div>

              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid gap-6 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs font-semibold">
                      Your Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full border-b border-[#DCD2C6] bg-transparent px-1 py-4 text-sm outline-none transition-colors placeholder:text-[#B5AA9D] focus:border-[#A34D13]"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-semibold">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full border-b border-[#DCD2C6] bg-transparent px-1 py-4 text-sm outline-none transition-colors placeholder:text-[#B5AA9D] focus:border-[#A34D13]"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold">
                    Subject *
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-[#DCD2C6] bg-transparent px-1 py-4 text-sm text-[#81776B] outline-none focus:border-[#A34D13]"
                  >

                    <option value="" disabled>
                      Select a subject
                    </option>

                    <option value="Product Inquiry">
                      Product Inquiry
                    </option>

                    <option value="Order Support">
                      Order Support
                    </option>

                    <option value="Delivery Information">
                      Delivery Information
                    </option>

                    <option value="Payment Inquiry">
                      Payment Inquiry
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold">
                    Your Message *
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows="5"
                    className="w-full resize-none border-b border-[#DCD2C6] bg-transparent px-1 py-4 text-sm outline-none transition-colors placeholder:text-[#B5AA9D] focus:border-[#A34D13]"
                  />

                </div>

                <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-xs leading-6 text-[#A49A8E]">
                    We appreciate your interest in FurniLK.
                  </p>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#29251F] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#A34D13]"
                  >

                    Send Message

                    <FiSend
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* BOTTOM BANNER */}

      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-8 lg:px-14 lg:pb-28">

        <div className="relative overflow-hidden bg-[#29251F] px-7 py-14 sm:px-12 sm:py-16">

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6A76C]">
                FIND YOUR PERFECT SPACE
              </p>

              <h2 className="font-serif text-3xl text-[#F8F5F0] sm:text-5xl">
                Your dream home starts here.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-[#C9BFB2]">
                Explore our furniture collection and discover
                pieces that bring your home to life.
              </p>

            </div>

            <Link
              to="/products"
              className="inline-flex shrink-0 items-center justify-center gap-4 rounded-full bg-[#B45309] px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-[#D16A16]"
            >
              Explore Furniture
              <FiArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
