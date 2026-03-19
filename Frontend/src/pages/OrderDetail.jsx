import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../api';
import { getAuthHeaders } from '../auth';
import { FaSpinner, FaCheckCircle, FaTruck, FaBox, FaHome, FaRegClock, FaMapMarkerAlt, FaFileAlt, FaHeadset, FaLeaf } from 'react-icons/fa';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = await getAuthHeaders();
                const { data } = await getOrderById(id, config);
                setOrder(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcf8f4]">
            <FaSpinner className="animate-spin text-5xl text-green-600" />
        </div>
    );

    if (!order) return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcf8f4] text-center px-4">
            <h1 className="text-2xl font-bold text-gray-800">Order not found.</h1>
            <Link to="/order-tracking" className="mt-4 text-green-600 font-bold hover:underline">Back to tracking list</Link>
        </div>
    );

    const deliveryDate = new Date(order.createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const steps = [
        { label: 'Order Confirmed', time: '10:30 AM', date: new Date(order.createdAt).toLocaleDateString(), icon: <FaBox />, completed: true, desc: "Your order has been received and is being processed." },
        { label: 'Quality Verification', time: '12:45 PM', date: new Date(order.createdAt).toLocaleDateString(), icon: <FaCheckCircle />, completed: true, desc: "Our nursery team is selecting the healthiest specimens for you." },
        { label: 'Packed & Dispatched', time: 'In Progress', date: '--', icon: <FaLeaf />, completed: order.isPaid, desc: "Carefully wrapped in eco-friendly packaging." },
        { label: 'Shipped & Out for Delivery', time: 'Pending', date: '--', icon: <FaTruck />, completed: false, desc: "On its way to your city via Willow Express." },
        { label: 'Order Delivered', time: 'Estimated', date: deliveryDate.toLocaleDateString(), icon: <FaHome />, completed: order.isDelivered, desc: "Arrived at your doorstep. Happy planting!" },
    ];

    return (
        <div className="bg-[#fcf8f4] min-h-screen py-10 lg:py-20 px-4 font-sans text-gray-900 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* --- HEADER DASHBOARD --- */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 mb-16 px-4">
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                             <div className="bg-green-600 px-5 py-2 rounded-full shadow-[0_10px_30px_rgba(22,163,74,0.3)] flex items-center">
                                 <span className="w-2 h-2 bg-white rounded-full mr-3 animate-ping"></span>
                                 <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Live Tracking</span>
                             </div>
                             <span className="text-[12px] font-bold text-gray-300 uppercase tracking-widest">#{order._id.substring(0, 12).toUpperCase()}</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-4">Tracking Journey</h1>
                        <p className="text-gray-400 font-medium text-lg italic max-w-lg">Follow the travel path of your newest botanical friends from our nursery to your home.</p>
                    </div>

                    <div className="flex gap-4">
                        <Link to={`/order-confirmation/${order._id}`} className="bg-white text-gray-800 px-8 py-5 rounded-[24px] font-bold flex items-center shadow-lg hover:bg-gray-50 transition border border-gray-100 group">
                             <FaFileAlt className="mr-3 text-green-600 transition-transform group-hover:scale-125" /> View Receipt
                        </Link>
                    </div>
                </div>

                {/* --- MAIN GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* LEFT PANEL: The Tracking Stepper */}
                    <div className="lg:col-span-8 flex flex-col space-y-10">
                        <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-16 border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
                             {/* Decorative Background Leaf */}
                             <FaLeaf className="absolute -right-10 -bottom-10 text-green-50 opacity-[0.03] scale-[4]" />

                             <h2 className="text-2xl font-bold mb-16 flex items-center border-b pb-8 border-gray-50">
                                <FaRegClock className="mr-4 text-green-600 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]" /> 
                                Shipment History
                             </h2>

                             <div className="relative">
                                {/* Vertical Main Trace */}
                                <div className="absolute left-[26px] top-4 bottom-4 w-1.5 bg-gray-50 rounded-full"></div>
                                <div className="absolute left-[26px] top-4 h-[35%] w-1.5 bg-green-500 rounded-full z-10 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>

                                <div className="space-y-16 relative z-20">
                                    {steps.map((step, idx) => (
                                        <div key={idx} className={`flex items-start transition-all duration-1000 ${step.completed ? 'opacity-100' : 'opacity-85'}`}>


                                            {/* Icon Point */}
                                            <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center shrink-0 border-4 border-white shadow-2xl transition-all duration-700 ${step.completed ? 'bg-green-600 text-white scale-110' : 'bg-gray-100 text-gray-300'}`}>
                                                {React.cloneElement(step.icon, { size: 22 })}
                                            </div>

                                            {/* Step Content */}
                                            <div className="ml-10 flex-grow pt-1">
                                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                                                    <h3 className={`text-xl font-bold ${step.completed ? 'text-gray-900' : 'text-gray-600'}`}>{step.label}</h3>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{step.date}</span>
                                                        <span className="text-[10px] font-black text-green-800 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">{step.time}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-800 font-medium text-sm leading-relaxed max-w-md">{step.desc}</p>
                                                
                                                {step.completed && idx === 1 && (
                                                    <div className="mt-6 bg-gradient-to-br from-green-700 to-green-900 text-white p-6 rounded-[28px] shadow-2xl shadow-green-200/50 relative overflow-hidden group">
                                                        <div className="relative z-10 space-y-2">
                                                            <p className="text-[10px] font-bold text-green-100 uppercase tracking-widest opacity-90">Latest Update</p>
                                                            <p className="text-sm font-bold italic leading-relaxed">"Verification Complete. We are now selecting the most healthy and vibrant succulents for your specific order."</p>
                                                        </div>
                                                        <FaLeaf className="absolute -bottom-4 -right-4 text-white opacity-10 rotate-45 group-hover:scale-125 transition-transform duration-1000" size={80} />
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Meta Info & Status Sidebar */}
                    <div className="lg:col-span-4 flex flex-col space-y-10">
                        
                        {/* 1. Feature Product Card */}
                        <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100 overflow-hidden group">
                            <div className="relative rounded-[32px] overflow-hidden aspect-square mb-6 border border-gray-50 shadow-inner">
                                <img 
                                    src={order.orderItems[0]?.image || '/fallback.png'} 
                                    alt={order.orderItems[0]?.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                {order.orderItems.length > 1 && (
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-white">
                                        <p className="text-xs font-bold text-green-700">+{order.orderItems.length - 1} more items</p>
                                    </div>
                                )}
                            </div>
                            <div className="px-4 pb-4">
                                <h3 className="text-2xl font-bold text-gray-900 tracking-tighter leading-none mb-2">{order.orderItems[0]?.name}</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{order.orderItems[0]?.qty} units in this order</p>
                            </div>
                        </div>

                        {/* 2. Unified Shipping & Order Detail Box */}
                        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 relative group overflow-hidden">
                             <div className="absolute left-0 top-0 w-1.5 h-full bg-green-600 opacity-100"></div>
                             
                             <div className="mb-10 flex justify-between items-start">
                                 <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-[0.2em]">Shipping & Order</h3>
                                 <Link to={`/order-confirmation/${order._id}`} className="text-green-600 hover:text-green-800 transition">
                                     <FaFileAlt size={18} />
                                 </Link>
                             </div>

                             <div className="space-y-8">
                                <div className="flex items-start space-x-5">
                                    <div className="w-12 h-12 bg-gray-50 rounded-[18px] shadow-inner flex items-center justify-center text-green-600 shrink-0">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-gray-900 mb-1">{order.shippingAddress.fullName}</p>
                                        <p className="text-sm font-bold text-gray-700 leading-snug">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                                        <p className="mt-2 text-[10px] font-black text-green-700 uppercase tracking-widest">Pin: {order.shippingAddress.postalCode}</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-50 space-y-4">
                                     <div className="flex justify-between items-center">
                                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Payment</p>
                                         <p className="text-sm font-black text-gray-900">{order.paymentMethod === 'CashOnDelivery' ? 'Cash on Delivery' : order.paymentMethod}</p>
                                     </div>
                                     <div className="flex justify-between items-center">
                                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Items Count</p>
                                         <p className="text-sm font-black text-gray-900">{order.orderItems.reduce((acc, i) => acc + i.qty, 0)} Plants</p>
                                     </div>
                                </div>

                                <div className="pt-8 border-t border-green-50 mt-4">
                                     <div className="flex justify-between items-end">
                                         <div>
                                             <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Total Payable</p>
                                             <p className="text-3xl font-black text-gray-900 tracking-tighter">Rs. {order.totalPrice.toFixed(0)}</p>
                                         </div>
                                         <span className="bg-green-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase">COD</span>
                                     </div>
                                </div>
                             </div>
                        </div>
                    </div>


                </div>

                {/* --- FOOTER BACK LINK --- */}
                <div className="text-center mt-20 pb-16">
                    <Link to="/order-tracking" className="text-gray-600 font-extrabold uppercase tracking-widest text-sm flex items-center justify-center group hover:text-green-700 transition duration-500">
                         <span className="transition-transform group-hover:-translate-x-4 text-3xl font-light mr-4 flex items-center h-full">←</span> 
                         <span className="border-b-2 border-transparent group-hover:border-green-200 pb-1">My Order Dashboard</span>
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default OrderDetail;
