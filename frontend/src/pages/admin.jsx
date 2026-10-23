import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Products from "./AdminFOL/AdminProducts";

export function AdminPageGuard() {
  const navigate = useNavigate();

  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.role !== "admin") {
          if (!isMounted) return;
          toast.error("You are not authorized to access this page");
          navigate("/");
          return;
        }
        if (isMounted) setUserLoaded(true);
      })
      .catch(() => {
        if (!isMounted) return;
        toast.error("Error fetching user data");
        navigate("/login");
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (!userLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0] text-slate-600">
        Verifying admin access...
      </div>
    );
  }

  return <Outlet />;
}

const revenueData = [
  { month: "Jan", revenue: 180000 },
  { month: "Feb", revenue: 240000 },
  { month: "Mar", revenue: 195000 },
  { month: "Apr", revenue: 310000 },
  { month: "May", revenue: 280000 },
  { month: "Jun", revenue: 390000 },
  { month: "Jul", revenue: 420000 },
];

const ordersData = [
  { day: "Mon", orders: 24 },
  { day: "Tue", orders: 38 },
  { day: "Wed", orders: 29 },
  { day: "Thu", orders: 51 },
  { day: "Fri", orders: 63 },
  { day: "Sat", orders: 74 },
  { day: "Sun", orders: 40 },
];

export function Sidebar({ active, setActive }) {
  const [open, setOpen] = useState(false);
   const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    { label: "Products", icon: "🪑", path: "/admin/products" },
    { label: "Orders", icon: "🛒", path: "/admin/orders" },
    { label: "Customers", icon: "👤", path: "/admin/customers" },
    { label: "Categories", icon: "📦", path: "/admin/categories" },
    { label: "Reports", icon: "📈", path: "/admin/reports" },
    { label: "Settings", icon: "⚙️", path: "/admin/settings" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg lg:hidden"
      >
        <svg className="h-6 w-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <aside
  className={`fixed inset-y-0 left-0 z-40 w-72 flex flex-col border-r border-slate-200 bg-white px-6 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-transform duration-300 ${
    open ? "translate-x-0" : "-translate-x-full"
  } lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
>
        <div className="flex items-center gap-3 pb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#B45309] text-white shadow-lg shadow-amber-900/20">
            <span className="text-lg font-black">F</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-950">
              Furni<span className="text-[#B45309]">LK</span>
            </h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActive(item.label);
                setOpen(false);
                navigate(item.path);
              }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active === item.label
                  ? "bg-[#B45309] text-white shadow-md shadow-amber-900/15"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#B45309]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Today&apos;s Revenue</p>
          <p className="mt-2 text-2xl font-black">LKR 248,500</p>
          <div className="mt-3 h-1 rounded-full bg-white/10">
            <div className="h-1 w-3/5 rounded-full bg-[#B45309]" />
          </div>
          <p className="mt-1 text-xs text-slate-400">60% of daily goal</p>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B45309] text-sm font-black text-white">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">Manager</p>
          </div>
        </div>

        <Link
          to="/"
          className="mt-4 block rounded-full border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-[#B45309] hover:text-[#B45309]"
        >
          Back to Home
        </Link>
      </aside>
    </>
  );
}

function TopBar() {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B45309]">
          Overview
        </p>
        <h2 className="mt-1 text-3xl font-black text-slate-950">Admin Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">April 2026 — Live data overview</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3">
          <span className="text-sm text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-52"
          />
        </div>
        <button className="rounded-full bg-[#B45309] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-[#92400E]">
          + Add Product
        </button>
      </div>
    </div>
  );
}

function StatCards() {
  const stats = [
    { label: "Total Revenue", value: "LKR 2.48M", change: "+18%", sub: "vs last month" },
    { label: "Total Orders", value: "1,284", change: "+12%", sub: "this week" },
    { label: "Products", value: "248", change: "+8", sub: "new this month" },
    { label: "Customers", value: "6,420", change: "+24%", sub: "growth rate" },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s, i) => {
        const chip =
          i === 0
            ? "bg-emerald-100 text-emerald-700"
            : i === 1
            ? "bg-sky-100 text-sky-700"
            : i === 2
            ? "bg-amber-100 text-amber-700"
            : "bg-violet-100 text-violet-700";

        return (
          <div
            key={s.label}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${chip}`}>
              {s.change} {s.sub}
            </span>
            <p className="mt-4 text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-3xl font-black text-slate-950">{s.value}</p>
          </div>
        );
      })}
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950">Revenue Overview</h3>
          <p className="text-sm text-slate-500">Monthly revenue — 2026</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
          +18% this month
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B45309" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#B45309" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v / 1000}K`}
          />
          <Tooltip
            formatter={(v) => [`LKR ${v.toLocaleString()}`, "Revenue"]}
            contentStyle={{
              borderRadius: "1rem",
              border: "none",
              boxShadow: "0 10px 40px rgba(15,23,42,0.12)",
            }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#B45309" strokeWidth={2.5} fill="url(#revGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function OrdersChart() {
  return (
    <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-950">Orders This Week</h3>
        <p className="text-sm text-slate-500">Daily order count</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={ordersData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "1rem",
              border: "none",
              boxShadow: "0 10px 40px rgba(15,23,42,0.12)",
            }}
          />
          <Bar dataKey="orders" fill="#B45309" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RecentOrders() {
  const orders = [
    { id: "#ORD-1201", customer: "Nimal Perera", product: "Luxe Sofa", date: "18 Apr", status: "Delivered", total: "LKR 89,500" },
    { id: "#ORD-1202", customer: "Kasun Silva", product: "Teak Dining Table", date: "18 Apr", status: "Pending", total: "LKR 125,000" },
    { id: "#ORD-1203", customer: "Sewmini Jayamali", product: "King Bed Frame", date: "17 Apr", status: "Shipped", total: "LKR 185,000" },
    { id: "#ORD-1204", customer: "Asha Fernando", product: "Minimal Bookshelf", date: "16 Apr", status: "Cancelled", total: "LKR 32,000" },
    { id: "#ORD-1205", customer: "Ruwan Bandara", product: "Nordic Chair", date: "15 Apr", status: "Delivered", total: "LKR 45,000" },
  ];

  const badge = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Shipped: "bg-sky-100 text-sky-700",
    Cancelled: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h3 className="text-lg font-bold text-slate-950">Recent Orders</h3>
          <p className="text-sm text-slate-500">Latest customer purchases</p>
        </div>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#B45309] hover:text-[#B45309]">
          View all →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id} className="text-sm transition hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">{o.id}</td>
                <td className="px-6 py-4 text-slate-700">{o.customer}</td>
                <td className="px-6 py-4 text-slate-600">{o.product}</td>
                <td className="px-6 py-4 text-slate-500">{o.date}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${badge[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">{o.total}</td>
                <td className="px-6 py-4">
                  <button className="font-semibold text-[#B45309] transition hover:underline">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TopProducts() {
  const products = [
    { name: "Luxe Comfort Sofa", sales: 148, stock: 24, price: "LKR 89,500" },
    { name: "Teak Dining Table", sales: 97, stock: 12, price: "LKR 125,000" },
    { name: "King Bed Frame", sales: 84, stock: 8, price: "LKR 185,000" },
    { name: "Minimal Bookshelf", sales: 63, stock: 16, price: "LKR 32,000" },
    { name: "Nordic Lounge Chair", sales: 52, stock: 30, price: "LKR 45,000" },
  ];

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950">Top Products</h3>
          <p className="text-sm text-slate-500">Best performing items</p>
        </div>
        <button className="rounded-full bg-[#B45309] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#92400E]">
          + Add New
        </button>
      </div>

      <div className="space-y-3">
        {products.map((p, i) => (
          <div
            key={p.name}
            className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-3 transition hover:bg-amber-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B45309]/10 text-sm font-black text-[#B45309]">
              {i + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">{p.name}</p>
              <p className="text-xs text-slate-500">
                {p.sales} sales · {p.stock} in stock
              </p>
            </div>
            <p className="whitespace-nowrap text-sm font-black text-slate-950">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      <Sidebar active={active} setActive={setActive} />

      <main className="min-w-0 flex-1 overflow-auto px-4 pb-8 pt-20 sm:px-6 sm:py-8 lg:px-8">
        {active === "Dashboard" && (
          <>
            <TopBar />
            <StatCards />

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <RevenueChart />
              <OrdersChart />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <RecentOrders />
              </div>
              <TopProducts />
            </div>
          </>
        )}

        {active === "Products" && <Products />}
      </main>
    </div>
  );
}
