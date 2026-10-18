
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDetailsModal({ order, onClose }) {
  const [newStatus, setNewStatus] = useState(
    order?.state || order?.status || "Pending"
  );

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    setNewStatus(order?.state || order?.status || "Pending");
    setStatusDropdownOpen(false);
    setStatusMessage("");
    setStatusError(false);
  }, [order]);

  if (!order) return null;

  const items = Array.isArray(order.items) ? order.items : [];

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) =>
    `LKR ${Number(price || 0).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const status = order.state || order.status || "Pending";

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const getStatusColor = (value) => {
    switch (value) {
      case "Pending":
        return "bg-[#F5E8C7] text-[#8A6414]";
      case "Processing":
        return "bg-[#EFE2D4] text-[#8B5E3C]";
      case "Shipped":
        return "bg-[#E2EAF2] text-[#496783]";
      case "Delivered":
        return "bg-[#E1EDE3] text-[#426B4A]";
      case "Cancelled":
        return "bg-[#F5E2DF] text-[#A3473D]";
      default:
        return "bg-[#F3EFE9] text-[#7A6E63]";
    }
  };

  const getStatusDot = (value) => {
    switch (value) {
      case "Pending":
        return "bg-[#C69B35]";
      case "Processing":
        return "bg-[#8B5E3C]";
      case "Shipped":
        return "bg-[#6687A6]";
      case "Delivered":
        return "bg-[#5B8964]";
      case "Cancelled":
        return "bg-[#C45E52]";
      default:
        return "bg-[#C8A27C]";
    }
  };

  // UPDATE ORDER STATUS
  const updateOrderStatus = async () => {
    if (!order?._id || saving || newStatus === "Pending") return;

    try {
      setSaving(true);
      setStatusMessage("");
      setStatusError(false);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again to update the order.");
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/status/${order._id}`,
        { state: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the status shown in the current modal.
      order.state = newStatus;
      order.status = newStatus;

      setStatusMessage(
        response.data?.message || "Order status updated successfully."
      );
      setStatusError(false);
    } catch (error) {
      console.error("Status update failed:", error);

      setStatusError(true);
      setStatusMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to update order status."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2B211B]/50 p-3 backdrop-blur-[3px] sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Order details"
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#E5DED6] bg-[#F8F6F2] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E5DED6] bg-[#F8F6F2]/95 px-5 py-5 backdrop-blur-md sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B5E3C]">
              FurniLK · Order Management
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#2B2B2B] sm:text-2xl">
              Order #{order.orderid || "N/A"}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#7A6E63]">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                  order.state || order.status || "Pending"
                )}`}
              >
                {order.state || order.status || "Pending"}
              </span>

              <span className="text-[#C8A27C]">•</span>
              <span>{formatDate(order.orderDate)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5DED6] bg-white text-xl leading-none text-[#7A6E63] transition hover:border-[#C8A27C] hover:bg-[#F3EFE9] hover:text-[#8B5E3C]"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-4 sm:p-7">
          {/* CUSTOMER AND PAYMENT */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* CUSTOMER DETAILS */}
            <section className="rounded-2xl border border-[#E5DED6] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EFE9] text-[#8B5E3C]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold text-[#2B2B2B]">
                    Customer Details
                  </h3>
                  <p className="mt-0.5 text-xs text-[#A09285]">
                    Customer information
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#8C8075]">Name</span>
                  <span className="break-words text-right font-medium text-[#2B2B2B]">
                    {order.customerName || "N/A"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#8C8075]">Email</span>
                  <span className="break-all text-right font-medium text-[#2B2B2B]">
                    {order.customerEmail || "N/A"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#8C8075]">Phone</span>
                  <span className="text-right font-medium text-[#2B2B2B]">
                    {order.phoneNumber || "Not provided"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#8C8075]">Address</span>
                  <span className="max-w-[65%] break-words text-right font-medium text-[#2B2B2B]">
                    {order.address || "N/A"}
                  </span>
                </div>
              </div>
            </section>

            {/* PAYMENT SUMMARY */}
            <section className="rounded-2xl border border-[#E5DED6] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EFE9] text-[#8B5E3C]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold text-[#2B2B2B]">
                    Payment Summary
                  </h3>
                  <p className="mt-0.5 text-xs text-[#A09285]">
                    Order cost breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#8C8075]">Total items</span>
                  <span className="font-semibold text-[#2B2B2B]">
                    {totalItems}
                  </span>
                </div>

                <div className="border-t border-dashed border-[#E5DED6]" />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#8C8075]">Order total</span>
                  <span className="text-lg font-bold text-[#8B5E3C]">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>

                {/* CUSTOM STATUS DROPDOWN */}
                <div className="relative border-t border-[#E5DED6] pt-4">
                  <label
                    htmlFor="order-status"
                    className="mb-2 block text-sm font-semibold text-[#5E5147]"
                  >
                    Update Order Status
                  </label>

                  <button
                    id="order-status"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={statusDropdownOpen}
                    onClick={() =>
                      setStatusDropdownOpen(!statusDropdownOpen)
                    }
                    className="flex w-full items-center justify-between rounded-xl border border-[#E5DED6] bg-[#FDFCFA] px-4 py-3 text-left text-sm font-semibold text-[#2B2B2B] shadow-sm transition hover:border-[#C8A27C] focus:outline-none focus:ring-2 focus:ring-[#C8A27C]/30"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${getStatusDot(
                          newStatus
                        )}`}
                      />
                      {newStatus}
                    </span>

                    <svg
                      className={`h-4 w-4 text-[#8B5E3C] transition-transform duration-200 ${
                        statusDropdownOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {statusDropdownOpen && (
                    <div
                      role="listbox"
                      aria-label="Choose order status"
                      className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#E5DED6] bg-white p-1.5 shadow-xl shadow-[#4A3525]/10"
                    >
                      {statusOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          role="option"
                          aria-selected={newStatus === option}
                          onClick={() => {
                            setNewStatus(option);
                            setStatusDropdownOpen(false);
                            setStatusMessage("");
                            setStatusError(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-colors duration-150 ${
                            newStatus === option
                              ? "bg-[#F3EFE9] font-semibold text-[#8B5E3C]"
                              : "text-[#6B5E55] hover:bg-[#F8F6F2] hover:text-[#8B5E3C]"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${getStatusDot(
                                option
                              )}`}
                            />
                            {option}
                          </span>

                          {newStatus === option && (
                            <svg
                              className="h-4 w-4 text-[#8B5E3C]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="m5 12 4 4L19 6" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {statusMessage && (
                    <p
                      role="status"
                      className={`mt-3 rounded-lg px-3 py-2 text-xs ${
                        statusError
                          ? "bg-[#F5E2DF] text-[#A3473D]"
                          : "bg-[#E1EDE3] text-[#426B4A]"
                      }`}
                    >
                      {statusMessage}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={updateOrderStatus}
                    disabled={saving || newStatus === "Pending"}
                    className="mt-4 w-full rounded-xl bg-[#8B5E3C] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#70482D] focus:outline-none focus:ring-2 focus:ring-[#C8A27C]/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#D6C8BB] disabled:text-[#8C8075]"
                  >
                    {saving ? "Updating..." : "Update"}
                  </button>

                  <p className="mt-2 text-center text-xs text-[#A09285]">
                    Select a status and click Update to save.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ORDER ITEMS */}
          <section className="overflow-hidden rounded-2xl border border-[#E5DED6] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#E5DED6] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EFE9] text-[#8B5E3C]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M3 7h18l-2 13H5L3 7Z" />
                  <path d="M8 7a4 4 0 0 1 8 0" />
                </svg>
              </div>

              <div>
                <h3 className="font-bold text-[#2B2B2B]">Order Items</h3>
                <p className="mt-0.5 text-xs text-[#A09285]">
                  Products included in this order
                </p>
              </div>
            </div>

            {items.length > 0 ? (
              <div className="divide-y divide-[#F0EAE3]">
                {items.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex flex-col gap-3 p-4 transition hover:bg-[#FDFCFA] sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productName || "Product"}
                          className="h-16 w-16 shrink-0 rounded-xl border border-[#E5DED6] bg-[#F8F6F2] object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[#E5DED6] bg-[#F3EFE9] text-2xl">
                          🪑
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="break-words font-semibold text-[#2B2B2B]">
                          {item.productName || item.name || "Product"}
                        </p>

                        <p className="mt-1 text-xs text-[#8C8075]">
                          Quantity: {item.quantity ?? 1}
                        </p>

                        <p className="mt-1 text-sm text-[#8C8075]">
                          Unit price: {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 font-bold text-[#8B5E3C] sm:text-right">
                      {formatPrice(
                        Number(item.price || 0) *
                          Number(item.quantity || 1)
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-[#8C8075]">
                Item details are unavailable for this order.
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5DED6] bg-[#F3EFE9] px-5 py-4">
              <span className="text-sm font-medium text-[#6B5E55]">
                {totalItems} items
              </span>

              <div className="text-right">
                <p className="text-xs text-[#8C8075]">Order total</p>
                <p className="text-lg font-bold text-[#8B5E3C]">
                  {formatPrice(order.totalAmount)}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t border-[#E5DED6] bg-[#F8F6F2] px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E5DED6] bg-white px-6 py-2.5 text-sm font-semibold text-[#6B5E55] transition hover:border-[#C8A27C] hover:bg-[#F3EFE9] hover:text-[#8B5E3C] focus:outline-none focus:ring-2 focus:ring-[#C8A27C]/30"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
