import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../api';
import { getAuthHeaders } from '../auth';

import { FaSpinner } from 'react-icons/fa';

const OrderConfirmation = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const config = await getAuthHeaders();
                const { data } = await getOrderById(id, config);
                setOrder(data);
            } catch (err) {
                console.error("Order Fetch Failed:", err);
                setError('Failed to fetch order details. Please check your network or try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#fcf8f4]">
            <FaSpinner className="animate-spin text-5xl text-green-600 mb-4" />
            <p className="text-gray-500 font-medium tracking-wide">Retrieving your order details...</p>
        </div>
    );

    if (error || !order) return (
        <div className="container mx-auto py-20 px-4 text-center bg-[#fcf8f4] min-h-screen">
            <div className="bg-red-50 border border-red-200 text-red-600 p-8 rounded-2xl shadow-sm inline-block max-w-lg">
                <p className="text-xl font-bold mb-4">Error!</p>
                <p>{error || 'Order not found'}</p>
                <Link to="/" className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition">
                    Go Back Home
                </Link>
            </div>
        </div>
    );

    return (
        <div className="bg-[#fcf8f4] min-h-screen py-16 px-4">
            {/* Side-by-Side Layout Wrapper without the white box container */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-between gap-12 lg:gap-20">
                
                {/* --- Left Side: Welcome & Address --- */}
                <div className="md:w-1/2 flex flex-col justify-center py-8">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Thank you for your purchase!
                    </h1>
                    <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                        Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.
                    </p>

                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 inline-block pb-1">Billing Address</h2>
                    
                    <div className="space-y-5 text-gray-700">
                        <div className="grid grid-cols-3 gap-2">
                            <span className="font-bold text-gray-500 uppercase text-xs flex items-center">Name</span>
                            <span className="col-span-2 text-gray-800 font-semibold text-lg">{order.shippingAddress.fullName}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <span className="font-bold text-gray-500 uppercase text-xs flex items-start mt-1">Address</span>
                            <span className="col-span-2 text-gray-700 leading-snug">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <span className="font-bold text-gray-500 uppercase text-xs flex items-center">Email</span>
                            <span className="col-span-2 text-blue-600 font-medium truncate italic">{order.shippingAddress.email}</span>
                        </div>
                    </div>

                    <div className="mt-12 space-y-4">
                        <Link 
                            to={`/track-order/${id}`} 
                            className="bg-[#ff7f50] text-white px-10 py-5 rounded-2xl font-bold hover:brightness-110 transition shadow-xl inline-block w-full text-center sm:w-auto uppercase tracking-widest text-sm"
                        >
                            Track Your Order
                        </Link>


                        <p className="text-xs text-gray-600 font-medium italic block mt-6">
                            A copy of your receipt was sent to your email.
                        </p>

                    </div>
                </div>

                {/* --- Right Side: The Receipt --- */}
                <div className="md:w-[450px] lg:w-[500px] shrink-0 bg-[#f9f9f9] relative flex flex-col pt-10 rounded-3xl shadow-xl overflow-hidden self-center md:self-auto transition hover:shadow-green-100/50">
                    <div className="receipt-container w-[90%] mx-auto bg-white shadow-lg p-8 flex-grow relative mb-12">
                        {/* Header Decorative Trim */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200"></div>
                        
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-10 text-center uppercase tracking-tighter border-b pb-4 border-dashed border-gray-100">Order Summary</h2>

                        {/* Order Metadata Info Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-10 text-[10px] sm:text-xs">
                            <div className="text-center">
                                <p className="text-gray-400 uppercase font-bold mb-2 tracking-widest">Date</p>
                                <p className="font-bold text-gray-800 text-sm">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div className="text-center border-x border-gray-100 px-2">
                                <p className="text-gray-400 uppercase font-bold mb-2 tracking-widest">Order ID</p>
                                <p className="font-bold text-gray-800 text-sm truncate px-1">{order._id.substring(0, 10).toUpperCase()}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 uppercase font-bold mb-2 tracking-widest">Method</p>
                                <p className="font-bold text-gray-800 text-sm">{order.paymentMethod}</p>
                            </div>
                        </div>

                        {/* Itemized List with custom scrollbar */}
                        <div className="space-y-6 max-h-[300px] overflow-y-auto mb-10 pr-2 custom-scrollbar">
                            {order.orderItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center group transition hover:bg-gray-50 p-2 rounded-xl">
                                    <div className="flex items-center space-x-5">
                                        <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-1">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-gray-800 text-[13px] group-hover:text-green-600 transition tracking-tight leading-tight">{item.name}</p>
                                            <p className="text-[11px] text-gray-400 font-medium italic">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 text-sm">{item.qty} x Rs. {item.price.toFixed(2)}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Total: Rs. {(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Subtotal, Shipping, Taxes */}
                        <div className="border-t border-gray-100 pt-8 space-y-4 bg-gray-50 rounded-2xl p-6">
                            <div className="flex justify-between text-xs text-gray-500 font-medium tracking-wide">
                                <span className="uppercase">Sub Total</span>
                                <span className="font-bold text-gray-800">Rs. {order.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 font-medium tracking-wide">
                                <span className="uppercase">Shipping Cost</span>
                                <span className={`font-bold ${order.shippingPrice === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                    {order.shippingPrice === 0 ? 'FREE' : `Rs. ${order.shippingPrice.toFixed(2)}`}
                                </span>
                            </div>
                            
                            {/* Final Total */}
                            <div className="flex justify-between text-2xl font-black pt-6 border-t border-gray-200 mt-6 text-gray-900 tracking-tighter">
                                <span className="uppercase text-sm flex items-center">Total Paid</span>
                                <span className="text-green-700">Rs. {order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Decorative Torn Paper SVG Edge at the bottom of the white card */}
                        <div className="absolute -bottom-5 left-0 w-full overflow-hidden leading-[0]">
                             <svg className="fill-white" viewBox="0 0 400 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0l20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20v20H0z"/>
                             </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-center mt-16 pb-12">
                 <Link to="/" className="text-gray-500 font-extrabold text-xl hover:text-green-700 transition flex items-center justify-center space-x-3 group">
                    <span className="text-2xl transition-transform group-hover:-translate-x-2">←</span>
                    <span className="underline decoration-dotted decoration-2 underline-offset-4">Continue Shopping</span>
                 </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
