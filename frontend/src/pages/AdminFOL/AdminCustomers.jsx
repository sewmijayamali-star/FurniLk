
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../admin";

export default function AdminCustomers() {
  const [active, setActive] = useState("Customers");

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(response.data);
    } catch (err) {
      console.error("Customers API Error:", err);
      console.error("Server Response:", err.response?.data);

      setError(
        err.response?.data?.message || "Failed to load customers."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(searchValue) ||
      customer.email?.toLowerCase().includes(searchValue) ||
      customer.phone?.toLowerCase().includes(searchValue)
    );
  });

  function formatDate(date) {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">

      <Sidebar active={active} setActive={setActive} />

      <main className="min-w-0 flex-1 overflow-auto px-4 pb-8 pt-20 sm:px-6 sm:py-8 lg:px-8">

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-950">
              Customers
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your registered customers professionally
            </p>
          </div>

          <button
            onClick={fetchCustomers}
            className="rounded-xl bg-[#B45309] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#92400E]"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Customer Statistics */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Customers
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              {customers.length}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Registered customer accounts
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Search Results
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#B45309]">
              {filteredCustomers.length}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Customers matching your search
            </p>
          </div>

        </div>

        {/* Customer Table */}
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">

          {/* Search Bar */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Customer List
              </h2>
              <p className="text-sm text-slate-500">
                View all registered customers
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-56"
              />
            </div>

          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#B45309]"></div>

                <p className="mt-4 text-sm text-slate-500">
                  Loading customers...
                </p>
              </div>
            </div>

          ) : error ? (
            <div className="p-10 text-center">
              <p className="font-semibold text-red-600">
                {error}
              </p>

              <button
                onClick={fetchCustomers}
                className="mt-4 rounded-xl bg-[#B45309] px-5 py-2 text-sm font-semibold text-white hover:bg-[#92400E]"
              >
                Try Again
              </button>
            </div>

          ) : filteredCustomers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl">👤</div>

              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No Customers Found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? "No customers match your search."
                  : "There are no registered customers yet."}
              </p>
            </div>

          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[850px] w-full text-left">

                <thead className="bg-slate-50 text-sm text-slate-600">
                  <tr>
                    <th className="px-6 py-5 font-semibold">
                      Customer
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Email
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Phone Number
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Role
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Registered Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="text-sm transition hover:bg-slate-50"
                    >

                      {/* Customer Name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">

                          {customer.picture ? (
                            <img
                              src={customer.picture}
                              alt={customer.name}
                              className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B45309]/10 text-base font-bold text-[#B45309]">
                              {customer.name?.charAt(0)?.toUpperCase() || "C"}
                            </div>
                          )}

                          <div>
                            <p className="font-bold text-slate-900">
                              {customer.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              ID: {customer._id}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-slate-600">
                        {customer.email}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-5 text-slate-600">
                        {customer.phone || "Not provided"}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-5">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                          Customer
                        </span>
                      </td>

                      {/* Registration Date */}
                      <td className="px-6 py-5 text-slate-500">
                        {formatDate(customer.createdAt)}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

        <p className="mt-4 text-sm text-slate-500">
          Showing {filteredCustomers.length} of {customers.length} customers
        </p>

      </main>
    </div>
  );
}
