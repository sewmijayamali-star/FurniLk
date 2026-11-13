
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  // Load the logged-in user from the existing JWT token
  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const base64Payload = token
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        const payload = JSON.parse(
          decodeURIComponent(
            atob(base64Payload)
              .split("")
              .map(
                (character) =>
                  "%" +
                  character
                    .charCodeAt(0)
                    .toString(16)
                    .padStart(2, "0")
              )
              .join("")
          )
        );

        setUser({
          name:
            payload.name ||
            payload.email?.split("@")[0] ||
            "My Account",
          email: payload.email || "",
          image: payload.imageUrl || "",
          role: payload.role || "user",
        });
      } catch (error) {
        console.error("Unable to load user details:", error);
        setUser(null);
      }
    };

    loadUser();

    // Listen for login/logout events
    window.addEventListener("storage", loadUser);
    window.addEventListener("authChanged", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("authChanged", loadUser);
    };
  }, [location.pathname, location.key]);

  const closeMenus = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Cart", path: "/cart" },
  ];

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
  localStorage.removeItem("token");

  setUser(null);
  closeMenus();

  window.dispatchEvent(new Event("authChanged"));

  navigate("/login");
};

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-7xl rounded-[1.75rem] border border-white/60 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur-2xl">

        {/* Main Navbar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">

          {/* FurniLK Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B45309] text-white shadow-lg shadow-amber-900/20 sm:h-11 sm:w-11">
              <span className="text-lg font-black">F</span>
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">
                Furni<span className="text-[#B45309]">LK</span>
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Premium furniture for modern homes
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-[#B45309]"
                    : "text-slate-600 hover:text-[#B45309]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Authentication / Profile */}
          <div className="hidden items-center gap-3 lg:flex">

            {!user ? (
              <>
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
              </>
            ) : (
              <div className="relative">

                {/* Profile Button */}
                <button
                  type="button"
                  onClick={() => setProfileOpen((previous) => !previous)}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  className="flex items-center gap-3 rounded-full border border-amber-100 bg-white/80 py-1.5 pl-1.5 pr-3 transition hover:border-[#B45309] hover:bg-amber-50"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={`${user.name}'s profile`}
                      className="h-10 w-10 rounded-full border border-amber-100 object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-base font-bold text-white">
                      {avatarLetter}
                    </div>
                  )}

                  <div className="max-w-28 text-left">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Welcome back
                    </p>

                    <p className="truncate text-sm font-bold text-slate-800">
                      {user.name}
                    </p>
                  </div>

                  <svg
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-900/10">

                    <div className="border-b border-slate-100 px-3 py-3">
                      <p className="text-xs text-slate-400">
                        Signed in as
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                        {user.name}
                      </p>

                      {user.email && (
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      )}
                    </div>

                    <Link
                      to="/profile"
                      onClick={closeMenus}
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-700 transition hover:bg-amber-50 hover:text-[#B45309]"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="8" r="4" strokeWidth="1.7" />
                        <path
                          d="M4.5 21a7.5 7.5 0 0 1 15 0"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>

                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-700 transition hover:bg-amber-50 hover:text-[#B45309]"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6 3h12l2 4v14H4V7l2-4Z"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 7h16M9 11h6"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>

                      My Orders
                    </Link>
                    <button
  type="button"
  onClick={handleLogout}
  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition hover:bg-red-50"
>
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M10 17l5-5-5-5M15 12H3m9-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  Sign Out
</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((previous) => !previous)}
            className="rounded-2xl border border-slate-200 p-2.5 text-slate-700 transition hover:border-[#B45309] hover:text-[#B45309] lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {open && (
          <div className="border-t border-slate-100 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">

              {/* Navigation Links */}
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMenus}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    location.pathname === item.path
                      ? "bg-amber-50 text-[#B45309]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#B45309]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Logged-in User Details */}
              {user ? (
                <>
                  <div className="my-3 flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={`${user.name}'s profile`}
                        className="h-11 w-11 shrink-0 rounded-full border border-amber-100 object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-lg font-bold text-white">
                        {avatarLetter}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">
                        Welcome back
                      </p>

                      <p className="truncate text-sm font-bold text-slate-800">
                        {user.name}
                      </p>

                      {user.email && (
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-amber-50 hover:text-[#B45309]"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={closeMenus}
                    className="rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-amber-50 hover:text-[#B45309]"
                  >
                    My Orders
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="mt-3 rounded-full bg-[#B45309] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#92400E]"
                >
                  Sign In
                </Link>
              )}

              {/* Shop Now */}
              <Link
                to="/products"
                onClick={closeMenus}
                className="mt-2 rounded-full border border-[#B45309] px-5 py-3 text-center text-sm font-semibold text-[#B45309] transition hover:bg-amber-50"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
