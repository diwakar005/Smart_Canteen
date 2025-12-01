import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Plus, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const { user, logout } = useAuth();
    const { addToCart, cartCount, clearCart } = useCart();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [orderType, setOrderType] = useState('dine-in');
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedCanteen, setSelectedCanteen] = useState(null);

    const [notifications, setNotifications] = useState([]);

    const categories = ['All', 'South Indian', 'Snacks', 'Lunch', 'Beverages', 'Chinese'];

    useEffect(() => {
        fetchProducts();
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get('/api/orders/notifications', {
                headers: { 'x-user-id': user._id }
            });
            setNotifications(res.data);
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/products');
            setProducts(res.data);
            if (res.data.length === 0) {
                // Auto-seed if empty for demo
                await axios.post('/api/products/seed');
                const seeded = await axios.get('/api/products');
                setProducts(seeded.data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products", error);
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Glassmorphic Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Logo & Search */}
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-200">
                                    <span className="text-2xl text-white">🍴</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">SmartCanteen</h1>
                                    <p className="text-xs text-gray-500 font-medium">{currentDate}</p>
                                </div>
                            </div>

                            <div className="hidden md:block w-px h-10 bg-gray-200 mx-2"></div>

                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search for food..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                            <div className="flex items-center gap-2 mr-2">
                                <span className="text-sm font-medium text-gray-600 hidden sm:block">Hi, {user?.name.split(' ')[0]}</span>
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs border border-orange-200">
                                    {user?.name.charAt(0)}
                                </div>
                            </div>

                            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all group">
                                <Bell className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                                )}
                                {/* Notification Dropdown */}
                                {showNotifications && (
                                    <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-2 border-b border-gray-50">
                                            <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                                        </div>
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                                <p>No new notifications</p>
                                            </div>
                                        ) : (
                                            notifications.map(notification => (
                                                <div key={notification._id} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                                                    <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </button>

                            <button onClick={() => navigate('/cart')} className="relative p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all group">
                                <ShoppingBag className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button onClick={() => navigate('/orders')} className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all text-sm font-medium text-gray-600 hover:text-orange-600">
                                My Orders
                            </button>

                            {user?.role === 'admin' && (
                                <button onClick={() => navigate('/admin')} className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-200 transition-all">
                                    Admin
                                </button>
                            )}

                            <button onClick={() => { clearCart(); logout(); }} className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium hover:bg-red-100 transition-all">
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search - Visible only on small screens */}
                    <div className="mt-4 md:hidden relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search for food..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 shadow-xl shadow-orange-200 mb-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 opacity-20 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-2xl"></div>

                    <div className="relative z-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Delicious Food,<br /> Delivered to You.
                        </h2>
                        <p className="text-orange-100 text-lg mb-8 max-w-xl">
                            Skip the queue and enjoy fresh, hot meals from your campus canteen. Order now and pick up when ready!
                        </p>

                        {/* Canteen Selector */}
                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-3 text-white/90">
                                <span className="bg-white/20 p-1 rounded-lg">👇</span>
                                <span className="text-sm font-bold uppercase tracking-wider">Start by selecting your canteen</span>
                            </div>
                            <div className="inline-flex bg-white/20 backdrop-blur-md p-2 rounded-2xl border border-white/30 shadow-lg">
                                <button
                                    onClick={() => setSelectedCanteen('GF')}
                                    className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCanteen === 'GF'
                                        ? 'bg-white text-orange-600 shadow-md transform scale-105'
                                        : 'text-white hover:bg-white/10'
                                        }`}
                                >
                                    GF Canteen
                                </button>
                                <button
                                    onClick={() => setSelectedCanteen('1st F')}
                                    className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCanteen === '1st F'
                                        ? 'bg-white text-orange-600 shadow-md transform scale-105'
                                        : 'text-white hover:bg-white/10'
                                        }`}
                                >
                                    1st Floor Canteen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories & Menu */}
                {selectedCanteen && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Explore Menu</h3>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-[60%] md:max-w-none">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${activeCategory === cat
                                            ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500'
                                            }`}
                                    >
                                        {cat.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-500 font-medium">Loading delicious options...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <div key={product._id} className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="relative mb-4 overflow-hidden rounded-xl">
                                            <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                                {product.category.toUpperCase()}
                                            </div>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <button
                                                onClick={() => addToCart({ ...product, canteen: selectedCanteen })}
                                                className="absolute bottom-2 right-2 bg-white text-orange-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-600 hover:text-white"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                                            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{product.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                                                <div className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
                                                    {selectedCanteen}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {!selectedCanteen && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🏪</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Select a Canteen</h3>
                        <p className="text-gray-500 max-w-xs mx-auto">Please select your preferred canteen above to view the available menu and start ordering.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Menu;
