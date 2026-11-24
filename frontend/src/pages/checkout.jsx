
import {
    FiChevronUp,
    FiChevronDown,
    FiTrash2
} from "react-icons/fi";

import { useState } from "react";
import { Loadcart, Addtocart } from "../utils/cart";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckOut() {

    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(
        Array.isArray(location.state) ? location.state : Loadcart()
    );

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // Update cart quantity
    function updateQuantity(index, change) {
        const newCart = [...cart];

        const newQuantity = newCart[index].quantity + change;

        if (newQuantity < 1) return;

        newCart[index].quantity = newQuantity;
        setCart(newCart);
    }

    // Remove cart item
    function removeItem(item) {
        Addtocart(item, -item.quantity);
        setCart(Loadcart());
    }

    // Initialize PayHere payment
    async function purchasecart() {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please log in to continue.");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        if (!address.trim() || !city.trim() || !phoneNumber.trim()) {
            toast.error("Please enter your delivery details.");
            return;
        }

        try {

            setLoading(true);

            const items = cart.map(item => ({
                productId: item._id || item.id || item.productId ,
                quantity: item.quantity
            }));
            console.log("CART FIRST ITEM:", cart[0]);
        console.log("PAYMENT ITEMS:", items);

            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/payments/create",
                {
                    items,
                    address: address.trim(),
                    city: city.trim(),
                    phoneNumber: phoneNumber.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("PAYMENT INITIALIZED:", response.data);

            const { paymentUrl, paymentData } = response.data;

            if (!paymentUrl || !paymentData) {
                throw new Error("Invalid payment response from server.");
            }

            // Create PayHere checkout form
            const form = document.createElement("form");

            form.method = "POST";
            form.action = paymentUrl;

            Object.entries(paymentData).forEach(([key, value]) => {

                if (key === "sandbox") return;

                const input = document.createElement("input");

                input.type = "hidden";
                input.name = key;
                input.value = String(value);

                form.appendChild(input);
            });

            document.body.appendChild(form);

            form.submit();

        } catch (error) {

            console.error(
                "Payment initialization error:",
                error.response?.data || error.message
            );

            const message =
                error.response?.data?.message ||
                "Unable to initialize payment. Please try again.";

            toast.error(message);

            if (error.response?.data?.code === "PRODUCT_NOT_FOUND") {
                toast.error("One or more products were not found.");
            }

            if (error.response?.data?.code === "INSUFFICIENT_STOCK") {
                toast.error("Insufficient product stock.");
            }

            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen bg-[#f8f6f2] px-4 pb-10 pt-28 sm:px-6 sm:pt-32">

            <div className="max-w-7xl mx-auto">

                <h1 className="mb-8 text-3xl font-bold text-[#1a1a1a] sm:mb-10 sm:text-4xl">
                    Shopping Cart
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* CART ITEMS */}

                    <div className="lg:col-span-2 space-y-5">

                        {cart.length === 0 ? (

                            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
                                <h2 className="text-2xl font-semibold text-gray-700">
                                    Your Cart Is Empty
                                </h2>
                            </div>

                        ) : (

                            cart.map((item, index) => (

                                <div
                                    key={index}
                                    className="flex flex-wrap items-center gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-nowrap sm:gap-5 sm:p-5"
                                >

                                    {/* IMAGE */}

                                    <img
                                        src={
                                            Array.isArray(item.img)
                                                ? item.img[0]
                                                : item.img
                                        }
                                        alt={item.name}
                                        className="h-20 w-20 rounded-2xl object-cover sm:h-32 sm:w-32"
                                    />

                                    {/* DETAILS */}

                                    <div className="min-w-0 flex-1">

                                        <h2 className="break-words text-base font-semibold text-[#1a1a1a] sm:text-xl">
                                            {item.name}
                                        </h2>

                                        <p className="text-[#824203] text-xl font-bold mt-3">
                                            LKR {item.price}
                                        </p>

                                    </div>

                                    {/* QUANTITY */}

                                    <div className="ml-auto flex w-[112px] shrink-0 items-center justify-between rounded-xl border border-gray-200 px-2 py-2 sm:ml-0 sm:w-[120px] sm:px-3">

                                        <FiChevronDown
                                            className="text-3xl text-[#824203] cursor-pointer"
                                            onClick={() => updateQuantity(index, -1)}
                                        />

                                        <span className="font-semibold text-2xl">
                                            {item.quantity}
                                        </span>

                                        <FiChevronUp
                                            className="text-3xl text-[#824203] cursor-pointer"
                                            onClick={() => updateQuantity(index, 1)}
                                        />

                                    </div>

                                    {/* REMOVE */}

                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeItem(item)}
                                    >
                                        <FiTrash2 size={22} />
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                    {/* ORDER SUMMARY */}

                    <div>

                        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-32">

                            <h2 className="text-2xl font-semibold mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4">

                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>LKR {subtotal.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <span className="text-green-600">
                                        Free
                                    </span>
                                </div>

                                <hr />

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>

                                    <span className="text-[#824203]">
                                        LKR {subtotal.toLocaleString()}
                                    </span>
                                </div>

                            </div>

                            {/* DELIVERY DETAILS */}

                            <div className="mt-8 space-y-4">

                                <h3 className="text-lg font-semibold">
                                    Delivery Details
                                </h3>

                                <input
                                    type="text"
                                    placeholder="Delivery Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#824203]"
                                />

                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#824203]"
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#824203]"
                                />

                            </div>

                            {/* PAYMENT BUTTON */}

                            <button
                                onClick={purchasecart}
                                disabled={loading || cart.length === 0}
                                className="w-full mt-8 bg-[#824203] hover:bg-[#6d3602] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold transition"
                            >
                                {loading ? "Redirecting to PayHere..." : "Pay with PayHere"}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-3">
                                Secure payment through PayHere Sandbox
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}
