import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../auth';
import { getMyOrders } from '../api';
import { FaBoxOpen, FaChevronRight, FaSpinner, FaShoppingBag, FaClock, FaRupeeSign } from 'react-icons/fa';

const OrderTracking = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Stats Calculation
    const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = await getAuthHeaders();
                const { data } = await getMyOrders(config);
                setOrders(data);
            } catch (err) {
                console.error("Fetch Orders Error:", err);
                if (err.response?.status === 401) {
                    navigate('/login');
                } else {
                    setError('Unable to load your orders.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#fcf8f4]">
            <FaSpinner className="animate-spin text-5xl text-green-600 mb-4" />
            <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">Accessing Order History</p>
        </div>
    );

    return (
        <div className="bg-[#fcf8f4]/50 min-h-screen py-10 lg:py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">My Orders</h1>
                        <p className="text-gray-500 text-lg">Manage and track your nature-inspired purchases.</p>
                    </div>
                </header>

                {/* Dashboard Stats Section */}
                {!error && orders.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5 transition hover:shadow-lg">
                            <div className="bg-green-100 text-green-600 p-4 rounded-2xl shadow-inner"><FaShoppingBag size={24} /></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5 transition hover:shadow-lg">
                            <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl shadow-inner"><FaClock size={24} /></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Now</p>
                                <p className="text-2xl font-bold text-gray-800 tracking-tighter">{orders.filter(o => !o.isDelivered).length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5 transition hover:shadow-lg">
                            <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl shadow-inner"><FaRupeeSign size={24} /></div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Lifetime Spend</p>
                                <p className="text-2xl font-bold text-gray-800">Rs. {totalSpent.toFixed(0)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {error ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-8 rounded-[40px] text-center font-bold uppercase tracking-widest text-sm shadow-inner">
                        {error}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-[50px] p-24 text-center shadow-xl border border-gray-100 transition hover:shadow-green-100/50">
                        <div className="bg-green-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 text-green-300 shadow-inner">
                            <FaBoxOpen size={64} />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Your garden is waiting...</h2>
                        <p className="text-gray-500 text-xl font-medium mb-12 max-w-md mx-auto leading-relaxed">You haven't placed any orders yet. Bring home some greenery today!</p>
                        <Link to="/" className="bg-[#1e975a] text-white px-14 py-6 rounded-[24px] font-bold hover:scale-105 active:scale-95 transition shadow-2xl inline-block uppercase tracking-widest text-sm shadow-green-200">
                            Start Shopping Now
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10">
                        {orders.map((order) => {
                            const totalQty = order.orderItems.reduce((acc, i) => acc + i.qty, 0);
                            return (
                                <div 
                                    key={order._id}
                                    onClick={() => navigate(`/order-confirmation/${order._id}`)}

                                    className="group relative bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:border-green-200 border border-gray-100 transition-all duration-700 cursor-pointer flex flex-col lg:flex-row items-center"

                                >
                                    {/* Product Visual */}
                                    <div className="p-10 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 flex-grow w-full">
                                        <div className="w-32 h-32 bg-gray-50 rounded-[32px] overflow-hidden shrink-0 shadow-inner group-hover:rotate-3 group-hover:scale-110 transition-transform duration-700 border border-gray-100">
                                            <img 
                                                src={order.orderItems[0]?.image || '/fallback.png'} 
                                                alt={order.orderItems[0]?.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="space-y-3 flex-grow text-center md:text-left">
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                                <span className="px-4 py-1.5 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-md shadow-green-100">In Processing</span>
                                                <span className="text-[12px] font-bold text-[#1e975a] uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">Order #{order._id.substring(0, 12).toUpperCase()}</span>
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition duration-500 tracking-tight leading-none">
                                                {order.orderItems[0]?.name}
                                                {order.orderItems.length > 1 && (
                                                    <span className="text-gray-300 font-medium text-2xl ml-3 tracking-normal">
                                                        +{order.orderItems.length - 1} more
                                                    </span>
                                                )}
                                            </h2>
                                            <div className="flex items-center justify-center md:justify-start space-x-5 text-xs font-bold text-gray-400 uppercase tracking-widest pt-2">
                                                <span className="flex items-center"><FaClock className="mr-2 text-gray-300" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                                <span className="text-gray-100">/</span>
                                                <span>{totalQty} Items</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary & Action */}
                                    <div className="bg-gray-50/70 p-10 flex flex-row lg:flex-col justify-between items-center lg:items-end lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-100 w-full lg:h-full group-hover:bg-green-50/30 transition duration-700">
                                        <div className="lg:text-right">
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 opacity-60">Order Total</p>
                                            <p className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition tracking-tight">
                                                Rs. {order.totalPrice.toFixed(0)}
                                            </p>
                                        </div>

                                        
                                        <div className="flex items-center space-x-6 mt-0 lg:mt-8">
                                            <div className="hidden lg:block text-right">
                                                <p className="text-[11px] font-bold text-green-600 uppercase tracking-widest mb-1 group-hover:opacity-100 opacity-0 transition-opacity duration-700">Detail View</p>
                                                <div className="w-12 h-1.5 bg-green-200 rounded-full ml-auto group-hover:w-full transition-all duration-700"></div>
                                            </div>
                                            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-green-600 shadow-xl border border-gray-100 group-hover:bg-green-600 group-hover:text-white transition-all duration-700 group-hover:rotate-90">
                                                <FaChevronRight size={22} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            <div className="text-center mt-24 pb-20">
                 <Link to="/" className="text-gray-600 font-bold flex items-center justify-center space-x-5 group uppercase tracking-[0.2em] text-xs transition hover:text-green-700">

                    <span className="transition-transform group-hover:-translate-x-6 text-2xl font-normal leading-none">←</span>
                    <span className="border-b-[3px] border-transparent group-hover:border-green-300 pb-1">Continue Shopping</span>
                 </Link>
            </div>
        </div>
    );
};

export default OrderTracking;
