
import { Link } from "react-router-dom";

function PaymentCancel() {
    return (
        <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4">
            <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8 text-center">

                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-5xl text-red-600">×</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-6">
                    Your payment was cancelled or not completed.
                    You can return to checkout and try again.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        to="/checkout"
                        className="bg-[#B45309] hover:bg-[#92400E] text-white font-semibold px-6 py-3 rounded-lg transition"
                    >
                        Back to Checkout
                    </Link>

                    <Link
                        to="/"
                        className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Home
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default PaymentCancel;
