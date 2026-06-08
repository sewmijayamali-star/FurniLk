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
import { useLocation } from "react-router-dom";






export default function CheckOut() {

    const location = useLocation();

    function getTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        }  )      
        return total;
    };

    const [cart, setCart] = useState(location.state);

     const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <div className="min-h-screen bg-[#f8f6f2] pt-32 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-[#1a1a1a] mb-10">
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
                                    className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex gap-5 items-center"
                                >

                                    {/* IMAGE */}
                                    <img
                                        src={
                                            Array.isArray(item.img)
                                                ? item.img[0]
                                                : item.img
                                        }
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-2xl"
                                    />

                                    {/* DETAILS */}
                                    <div className="flex-1">

                                        <h2 className="text-xl font-semibold text-[#1a1a1a]">
                                            {item.name}
                                        </h2>

                                        
                                        <p className="text-[#824203] text-xl font-bold mt-3">
                                            LKR {item.price}
                                        </p>

                                    </div>

                                    <div className="w-[120px] flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2">

                                        <FiChevronDown
                                            className="text-3xl text-[#824203] cursor-pointer"
                                            onClick={() => {
                                                    const newCart=[...cart];
                                                    
                                                    if (newCart[index].quantity > 1) {
                                                        newCart[index].quantity -= 1;
                                                    } 
                                                    setCart(newCart);
                                                }}
                                        />

                                        <span className="font-semibold text-2xl">
                                            {item.quantity}
                                        </span>

                            <FiChevronUp
                                className="text-3xl text-[#824203] cursor-pointer"
                                onClick={() => {
                                            const newCart=[...cart];
                                            newCart[index].quantity += 1;
                                            setCart(newCart);
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

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-32">

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

                            <button
                                className="w-full mt-8 bg-[#824203] hover:bg-[#6d3602] text-white py-4 rounded-2xl font-semibold transition"
                            >
                                Order
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}