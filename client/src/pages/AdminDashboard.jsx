import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, MapPin, User, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchOrders = async () => {
        try {
            const res = await axios.get('/api/orders');
            setOrders(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    useEffect(() => {
        fetchOrders();
        // Poll every 5 seconds for new orders (Notification simulation)
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (orderId, status, orderType) => {
        try {
            let estimatedTime = null;

            // For Dine-in: Prompt time when Accepting (Preparation Time)
            if (status === 'accepted' && orderType === 'dine-in') {
                estimatedTime = prompt("Enter Estimated Preparation Time (e.g., '15 mins'):");
                if (!estimatedTime) return;
            }

            // For Pre-order (Delivery): Prompt time when Marking Ready (Delivery Time)
            if (status === 'ready' && orderType === 'pre-order') {
                estimatedTime = prompt("Enter Estimated Delivery Time (e.g., '10 mins'):");
                if (!estimatedTime) return;
            }

            await axios.put(`/api/orders/${orderId}/status`, { status, estimatedTime });
            fetchOrders();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        {user?.canteen && (
                            <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded mt-1 inline-block">
                                Managing: {user.canteen} Canteen
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Live Updates
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders
                        .filter(order => !user?.canteen || order.canteen === user.canteen)
                        .map(order => (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                                <div className={`p-4 border-b flex justify-between items-center ${order.user?.role === 'teacher' ? 'bg-purple-50' : 'bg-blue-50'
                                    }`}>
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <p className="font-bold text-gray-800">{order.user?.name || 'Unknown User'}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${order.user?.role === 'teacher' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'
                                                    }`}>
                                                    {order.user?.role?.toUpperCase()}
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium">
                                                    ID: {order.user?.identifier}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg">Order #{order._id.slice(-6)}</h3>
                                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                                            {order.transactionId && (
                                                <p className="text-xs font-mono bg-gray-100 p-1 rounded mt-1 inline-block">
                                                    Txn: {order.transactionId}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${order.orderType === 'pre-order' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                                {order.orderType ? order.orderType.toUpperCase() : 'DINE-IN'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 space-y-4">
                                    {/* Location */}
                                    <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <MapPin className="w-4 h-4 mt-0.5 text-orange-500" />
                                        <div>
                                            <p><span className="font-semibold">{order.user?.role === 'teacher' ? 'Floor' : 'Dept'}:</span> {order.deliveryLocation.department}</p>
                                            <p><span className="font-semibold">{order.user?.role === 'teacher' ? 'Block' : 'Bldg'}:</span> {order.deliveryLocation.building}</p>
                                            <p><span className="font-semibold">{order.user?.role === 'teacher' ? 'Cabin' : 'Room'}:</span> {order.deliveryLocation.classroom}</p>
                                            {order.deliveryLocation.contactNo && (
                                                <p><span className="font-semibold">Contact:</span> {order.deliveryLocation.contactNo}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase">Items</p>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span>{item.quantity}x {item.name}</span>
                                                <span className="text-gray-500">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                        <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
                                            <span>Total</span>
                                            <span>₹{order.totalAmount}</span>
                                        </div>
                                        {order.transactionId && (
                                            <div className="text-xs text-gray-500 pt-1 flex justify-between">
                                                <span>UTR:</span>
                                                <span className="font-mono">{order.transactionId}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                order.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                                                    order.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {order.status.toUpperCase()}
                                            </span>

                                            {order.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateStatus(order._id, 'accepted', order.orderType)}
                                                        className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded hover:bg-green-600"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(order._id, 'rejected', order.orderType)}
                                                        className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}

                                            {order.status === 'accepted' && (
                                                <button
                                                    onClick={() => updateStatus(order._id, 'ready', order.orderType)}
                                                    className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600"
                                                >
                                                    Mark Ready
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
