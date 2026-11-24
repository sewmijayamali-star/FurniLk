
import { useLocation, Link } from "react-router-dom";

function PaymentSuccess() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("order_id");

    return (
        <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4">
            <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8 text-center">

                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-5xl text-green-600">✓</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mb-5">
                    Thank you for shopping with FurniLK.
                    Your payment process has been completed.
                </p>

                {orderId && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500 mb-1">
                            Order ID
                        </p>
                        <p className="font-semibold text-gray-800">
                            {orderId}
                        </p>
                    </div>
                )}

                <p className="text-sm text-gray-500 mb-6">
                    Your order will be processed after payment verification.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-[#B45309] hover:bg-[#92400E] text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                    Continue Shopping
                </Link>

            </div>
        </div>
    );
}

export default PaymentSuccess;
