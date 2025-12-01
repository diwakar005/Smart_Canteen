import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm w-full">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
                <p className="text-gray-500 mb-8">
                    Your order has been sent to the canteen admin. It will be delivered to your location shortly.
                </p>
                <button
                    onClick={() => navigate('/menu')}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
