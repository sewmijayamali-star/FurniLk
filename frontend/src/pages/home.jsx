import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-7xl rounded-[1.75rem] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#B45309] text-white shadow-lg shadow-amber-900/20">
              <span className="text-lg font-black">F</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                Furni<span className="text-[#B45309]">LK</span>
              </h1>
              <p className="text-xs text-slate-500">Premium furniture for modern homes</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
             <Link
    to="/"
    className="text-sm font-medium text-slate-600 transition hover:text-[#B45309]"
  >
    Home
  </Link>

  <Link
    to="/products"
    className="text-sm font-medium text-slate-600 transition hover:text-[#B45309]"
  >
    Shop
  </Link>

  <Link
    to="/collections"
    className="text-sm font-medium text-slate-600 transition hover:text-[#B45309]"
  >
    Collections
  </Link>

  <Link
    to="/about"
    className="text-sm font-medium text-slate-600 transition hover:text-[#B45309]"
  >
    About
  </Link>

  <Link
    to="/contact"
    className="text-sm font-medium text-slate-600 transition hover:text-[#B45309]"
  >
    Contact
  </Link>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#B45309] hover:text-[#B45309]"
            >
              Sign In
            </Link>
            <Link
              to="/products"
              className="rounded-full bg-[#B45309] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-[#92400E]"
            >
              Shop Now
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-2xl border border-slate-200 p-2.5 text-slate-700 lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-100 px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {['Home', 'Shop', 'Collections', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#B45309]"
                >
                  {item}
                </a>
              ))}
              <Link
                to="/login"
                className="mt-2 rounded-full bg-[#B45309] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EE] pt-32 sm:pt-36">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute right-[-80px] top-24 h-80 w-80 rounded-full bg-stone-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28">
        <div className="max-w-2xl">
          

          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes floatSlow {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes slowZoom {
              0% { transform: scale(1); }
              100% { transform: scale(1.06); }
            }
          `}</style>

          <h2 className="mt-7 text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl opacity-0 animate-[fadeUp_0.8s_ease-out_0.12s_forwards]">
            Elevate Your
            <span className="block text-[#B45309]">Living Space</span>
            <span className="block font-light italic text-slate-500">with elegance.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg opacity-0 animate-[fadeUp_0.8s_ease-out_0.25s_forwards]">
            Discover premium handcrafted furniture designed for modern Sri Lankan homes.
            Quality, comfort, and timeless style all in one place.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row opacity-0 animate-[fadeUp_0.8s_ease-out_0.38s_forwards]">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-[#B45309] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-[#92400E]"
            >
              Explore Collection
              <span className="ml-2"></span>
            </Link>

            <button className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-[#B45309] hover:text-[#B45309] hover:-translate-y-0.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-[#B45309]">
                ▶
              </span>
              Watch Story
            </button>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-slate-200 pt-8">
            {[
              { value: '12K+', label: 'Customers' },
              { value: '500+', label: 'Products' },
              { value: '4.9★', label: 'Rating' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-black text-slate-950 sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-8">
          <div className="absolute -left-6 top-12 hidden rounded-3xl bg-white/95 p-4 shadow-xl backdrop-blur-md lg:block animate-[floatSlow_4.5s_ease-in-out_infinite]">
            <p className="text-xs text-slate-400">Best Seller</p>
            <p className="mt-1 text-sm font-bold text-slate-900">Luxe Comfort Sofa</p>
            <p className="mt-1 text-lg font-black text-[#B45309]">LKR 89,500</p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
              alt="Luxury sofa"
              className="h-[500px] w-full object-cover object-center sm:h-[620px] animate-[slowZoom_16s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            <div className="absolute right-5 top-5 rounded-full bg-[#B45309] px-4 py-2 text-xs font-bold text-white shadow-lg animate-[floatSlow_5s_ease-in-out_infinite]">
              NEW 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryStrip() {
  const items = ['Living Room', 'Bedroom', 'Dining', 'Office']

  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-semibold text-slate-700 transition hover:border-[#B45309] hover:bg-white hover:text-[#B45309]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const products = [
    { name: 'Nordic Lounge Chair', price: 'LKR 45,000', old: 'LKR 55,000', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80' },
    { name: 'Teak Dining Table', price: 'LKR 125,000', old: 'LKR 145,000', img: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&q=80' },
    { name: 'Cloud King Bed', price: 'LKR 185,000', old: 'LKR 210,000', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80' },
    { name: 'Minimal Bookshelf', price: 'LKR 32,000', old: 'LKR 42,000', img: 'https://images.unsplash.com/photo-1588279102819-e2f9ba19d9f4?w=800&q=80' },
  ]

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B45309]">Featured Products</p>
            <h3 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Best Picks for Your Space</h3>
          </div>
          <Link to="/products" className="text-sm font-semibold text-[#B45309] transition hover:text-[#92400E]">
            View all products →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#FAFAF8] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden">
                <img src={product.img} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-900">
                  New
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-base font-bold text-slate-900">{product.name}</h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-amber-500">★★★★★</span>
                  <span className="text-xs text-slate-400">4.9</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-lg font-black text-[#B45309]">{product.price}</p>
                    <p className="text-xs text-slate-400 line-through">{product.old}</p>
                  </div>
                  <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#B45309]">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  const items = [
    { title: 'Free Delivery', desc: 'Island-wide delivery on eligible orders.', icon: '🚚' },
    { title: 'Premium Quality', desc: 'Long-lasting craftsmanship and materials.', icon: '✨' },
    { title: 'Easy Returns', desc: 'Simple 30-day return policy.', icon: '↩' },
    { title: 'Support', desc: 'Friendly customer help whenever needed.', icon: '💬' },
  ]

  return (
    <section className="bg-[#F8F5F0] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B45309]">Why FurniLK</p>
          <h3 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Designed for a Better Shopping Experience</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                {item.icon}
              </div>
              <h4 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h4 className="text-2xl font-black text-white">
              Furni<span className="text-[#D97706]">LK</span>
            </h4>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Premium furniture for elegant modern homes.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Shop</h5>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Living Room</a></li>
              <li><a href="#" className="hover:text-white">Bedroom</a></li>
              <li><a href="#" className="hover:text-white">Dining Room</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Company</h5>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Support</h5>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Warranty</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
          © 2026 FurniLK. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <CategoryStrip />
        <FeaturedProducts />
        <WhyUs />
      </main>
      <Footer />
    </div>
  )
}