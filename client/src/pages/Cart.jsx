import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, MapPin, CreditCard, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import paymentQR from '../assets/payment-qr.png';

const Cart = () => {
    const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [orderType, setOrderType] = useState('');
    const [location, setLocation] = useState({
        department: user?.department || '',
        building: '',
        classroom: user?.classroom || '',
        contactNo: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showQR, setShowQR] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const handlePaymentClick = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        const newErrors = {};
        if (!orderType) newErrors.orderType = 'Please select an order type';
        if (!location.department) newErrors.department = 'Required';
        if (orderType !== 'dine-in') {
            if (!location.building) newErrors.building = 'Required';
            if (!location.classroom) newErrors.classroom = 'Required';
        }
        if (!location.contactNo || location.contactNo.length !== 10) newErrors.contactNo = 'Valid 10-digit number required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setShowQR(true);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            // Bypass Payment Flow (For Demo)
            const canteen = cartItems.length > 0 ? cartItems[0].canteen : '';
            const orderData = {
                items: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartTotal,
                deliveryLocation: location,
                orderType,
                canteen
            };

            if (!transactionId) {
                alert("Please enter Transaction ID");
                setLoading(false);
                return;
            }

            await axios.post('/api/payment/bypass-order', { orderData, transactionId }, {
                headers: { 'x-user-id': user._id }
            });

            // alert("Order Placed Successfully! (Demo Mode)");
            clearCart();
            setPaymentSuccess(true);
            // navigate('/orders');

        } catch (error) {
            console.error("Payment Error", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button onClick={() => navigate('/menu')} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6">
                <div className="space-y-6">
                    {/* Cart Items */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item._id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-orange-50 w-16 h-16 rounded-lg flex items-center justify-center text-2xl">
                                            🍔
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Type Selection */}
                    <div className={`bg-white rounded-2xl p-6 shadow-sm ${errors.orderType ? 'ring-2 ring-red-500' : ''}`}>
                        <h2 className="text-lg font-bold mb-4">Order Type <span className="text-red-500">*</span></h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setOrderType('dine-in');
                                    if (errors.orderType) setErrors({ ...errors, orderType: null });
                                }}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${orderType === 'dine-in'
                                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                    }`}
                            >
                                Dine-In
                            </button>
                            <button
                                onClick={() => {
                                    setOrderType('pre-order');
                                    if (errors.orderType) setErrors({ ...errors, orderType: null });
                                }}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${orderType === 'pre-order'
                                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                    }`}
                            >
                                Pre-Order
                            </button>
                        </div>
                        {errors.orderType && <p className="text-red-500 text-xs mt-2 font-medium">{errors.orderType}</p>}
                    </div>

                    {/* Delivery Location Form */}
                    {orderType && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-orange-600" />
                                <h2 className="text-lg font-bold">Delivery Location</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {user?.role === 'teacher' ? 'Floor' : 'Department'} <span className="text-red-500">*</span>
                                    </label>
                                    {user?.role === 'teacher' ? (
                                        <select
                                            required
                                            value={location.department}
                                            onChange={(e) => {
                                                setLocation({ ...location, department: e.target.value });
                                                if (errors.department) setErrors({ ...errors, department: null });
                                            }}
                                            className={`w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white ${errors.department ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="" disabled>Select Floor</option>
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select
                                            required
                                            value={location.department}
                                            onChange={(e) => {
                                                setLocation({ ...location, department: e.target.value });
                                                if (errors.department) setErrors({ ...errors, department: null });
                                            }}
                                            className={`w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white ${errors.department ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="" disabled>Select Department</option>
                                            <option value="CSE-DS">CSE-DS</option>
                                            <option value="CSE-AIML">CSE-AIML</option>
                                            <option value="CSE">CSE</option>
                                            <option value="CS">CS</option>
                                            <option value="IT">IT</option>
                                            <option value="EC">EC</option>
                                            <option value="ELCE">ELCE</option>
                                        </select>
                                    )}
                                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                                </div>
                                {orderType !== 'dine-in' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {user?.role === 'teacher' ? 'Block' : 'Building'} <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            required
                                            value={location.building}
                                            onChange={(e) => {
                                                setLocation({ ...location, building: e.target.value });
                                                if (errors.building) setErrors({ ...errors, building: null });
                                            }}
                                            className={`w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white ${errors.building ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="" disabled>{user?.role === 'teacher' ? 'Select Block' : 'Select Building'}</option>
                                            <option value="KC Block">KC Block</option>
                                            <option value="RJ Block">RJ Block</option>
                                            <option value="BH Block">BH Block</option>
                                            <option value="AB Block">AB Block</option>
                                        </select>
                                        {errors.building && <p className="text-red-500 text-xs mt-1">{errors.building}</p>}
                                    </div>
                                )}
                                <div className="md:col-span-2">
                                    {user?.role === 'teacher' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {orderType !== 'dine-in' && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Name <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={location.classroom}
                                                        onChange={(e) => {
                                                            setLocation({ ...location, classroom: e.target.value });
                                                            if (errors.classroom) setErrors({ ...errors, classroom: null });
                                                        }}
                                                        className={`w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 ${errors.classroom ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                                                        placeholder="e.g. HOD Cabin"
                                                    />
                                                    {errors.classroom && <p className="text-red-500 text-xs mt-1">{errors.classroom}</p>}
                                                </div>
                                            )}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact No <span className="text-red-500">*</span></label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={location.contactNo}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, '');
                                                        if (val.length <= 10) {
                                                            setLocation({ ...location, contactNo: val });
                                                            if (errors.contactNo) setErrors({ ...errors, contactNo: null });
                                                        }
                                                    }}
                                                    className={`w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 ${errors.contactNo ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                                                    placeholder="e.g. 9876543210"
                                                />
                                                {errors.contactNo && <p className="text-red-500 text-xs mt-1">{errors.contactNo}</p>}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {orderType !== 'dine-in' && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Classroom <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={location.classroom}
                                                        onChange={(e) => {
                                                            setLocation({ ...location, classroom: e.target.value });
                                                            if (errors.classroom) setErrors({ ...errors, classroom: null });
                                                        }}
                                                        className={`w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 ${errors.classroom ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                                                        placeholder="e.g. 301"
                                                    />
                                                    {errors.classroom && <p className="text-red-500 text-xs mt-1">{errors.classroom}</p>}
                                                </div>
                                            )}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact No <span className="text-red-500">*</span></label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={location.contactNo}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, '');
                                                        if (val.length <= 10) {
                                                            setLocation({ ...location, contactNo: val });
                                                            if (errors.contactNo) setErrors({ ...errors, contactNo: null });
                                                        }
                                                    }}
                                                    className={`w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 ${errors.contactNo ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                                                    placeholder="e.g. 9876543210"
                                                />
                                                {errors.contactNo && <p className="text-red-500 text-xs mt-1">{errors.contactNo}</p>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment & Total */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-600">Total Amount</span>
                            <span className="text-3xl font-bold text-gray-900">₹{cartTotal}</span>
                        </div>

                        <button
                            onClick={handlePaymentClick}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-5 h-5" />
                                    Pay Now
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </main>

            {/* QR Code Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
                        {paymentSuccess ? (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
                                <p className="text-gray-500 mb-8">Waiting for acceptance.</p>
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                                >
                                    View My Orders
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Scan to Pay</h2>
                                <p className="text-gray-500 text-sm mb-6">Scan the QR code with any UPI app</p>

                                <div className="bg-white p-4 rounded-xl border-2 border-orange-100 inline-block mb-6 shadow-sm">
                                    <img
                                        src={paymentQR}
                                        alt="Payment QR Code"
                                        className="w-48 h-48 object-contain"
                                    />
                                </div>

                                <div className="mb-4 text-left">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter UPI Transaction ID"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>

                                <div className="text-2xl font-bold text-gray-800 mb-6">
                                    ₹{cartTotal}
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Payment Completed'
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowQR(false)}
                                        disabled={loading}
                                        className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
