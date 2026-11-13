export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-7xl rounded-[1.75rem] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#B45309] text-white shadow-lg shadow-amber-900/20 sm:h-11 sm:w-11">
              <span className="text-lg font-black">F</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">
                Furni<span className="text-[#B45309]">LK</span>
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">Premium furniture for modern homes</p>
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

  <Link
    to="/cart"
    className="relative text-sm font-medium text-slate-600 transition hover:text-[#B45309]"
  >
    Cart
  </Link>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
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
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
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
              {[
                ['Home', '/'],
                ['Shop', '/products'],
                ['Collections', '/collections'],
                ['About', '/about'],
                ['Contact', '/contact'],
                ['Cart', '/cart'],
              ].map(([item, path]) => (
                <Link
                  key={item}
                  to={path}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#B45309]"
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
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
