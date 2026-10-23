import {
    FiChevronUp,
    FiChevronDown
} from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import { useState } from "react";
import {
    Loadcart,
    
    Addtocart
} from "../utils/cart";
import { Link } from "react-router-dom";


const cart = Loadcart();

export default function Cart() {

    const [cart, setCart] = useState(Loadcart());

     const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

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

                                    <div className="ml-auto flex w-[112px] shrink-0 items-center justify-between rounded-xl border border-gray-200 px-2 py-2 sm:ml-0 sm:w-[120px] sm:px-3">

                                        <FiChevronDown
                                            className="text-3xl text-[#824203] cursor-pointer"
                                            onClick={() => {
                                                    Addtocart(item,-1)
                                                    setCart(Loadcart());
                                                }}
                                        />

                                        <span className="font-semibold text-2xl">
                                            {item.quantity}
                                        </span>

                            <FiChevronUp
                                className="text-3xl text-[#824203] cursor-pointer"
                                onClick={() => {
                                            Addtocart(item,1)
                                            setCart(Loadcart());
                                        }}
                            />

                        </div>
                                        

                                    {/* REMOVE */}
                                    <button className="text-red-500 hover:text-red-700"
                                     onClick={() => {
                                            Addtocart(item, -item.quantity);
                                            setCart(Loadcart());
                                        }}>
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
                                    <span>LKR {subtotal}</span>
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
                                        LKR {subtotal}
                                    </span>
                                </div>

                            </div>

                            <Link
                                to="/checkout"
                                state={cart}
                                className="w-full mt-8 bg-[#824203] hover:bg-[#6d3602] text-white py-4 rounded-2xl font-semibold transition block text-center"
                            >
                                Proceed To Checkout
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}