// Frontend/src/pages/Checkout.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../auth';
import { getCart, getAddresses, addAddress, createOrder } from '../api'; // Import all necessary API functions
import { FaSpinner, FaMapMarkerAlt, FaPlus, FaCheckCircle } from 'react-icons/fa';

// --- INITIAL STATES ---
const initialAddressState = {
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    isDefault: false,
};

// --- Helper Functions ---
const calculateSubtotal = (items) => {
    if (!items || items.length === 0) return 0.00;
    return items.reduce(
        (acc, item) => acc + (parseFloat(item.plant.price.replace('Rs. ', '').trim()) * item.quantity),
        0
    );
};


const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddressForm, setNewAddressForm] = useState(initialAddressState);
    
    const [loading, setLoading] = useState(true);
    const [isSavingAddress, setIsSavingAddress] = useState(false);
    const [error, setError] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false); // Controls visibility of the Add Address form
    
    // Placeholder for payment and order state (to be used in next step)
    const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);


    // --- 1. Fetch Cart and Addresses on Load ---
    const fetchCheckoutData = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = await getAuthHeaders();
            
            // Fetch Cart
            const cartResponse = await getCart(config);
            if (!cartResponse.data.cartItems || cartResponse.data.cartItems.length === 0) {
                navigate('/cart');
                return;
            }
            setCart(cartResponse.data);

            // Fetch Addresses
            const addressResponse = await getAddresses(config);
            const fetchedAddresses = addressResponse.data;
            setAddresses(fetchedAddresses);

            // Automatically select the default or the first address
            if (fetchedAddresses.length > 0) {
                const defaultAddress = fetchedAddresses.find(addr => addr.isDefault) || fetchedAddresses[0];
                setSelectedAddress(defaultAddress);
            } else {
                // If no addresses, show the Add New form immediately
                setIsAddingNew(true);
            }

        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            }
            setError(err.response?.data?.message || 'Failed to load checkout data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCheckoutData();
    }, [navigate]);


    // --- 2. Add New Address Handler ---
    const handleAddAddress = async (e) => {
        e.preventDefault();
        setIsSavingAddress(true);
        setError(null);
        
        const requiredFields = ['name', 'phoneNumber', 'email', 'address', 'city', 'pincode', 'state'];
        const isValid = requiredFields.every(field => newAddressForm[field].trim() !== '');

        if (!isValid) {
            setError('Please fill out all required fields.');
            setIsSavingAddress(false);
            return;
        }

        try {
            const config = await getAuthHeaders();
            const { data } = await addAddress(newAddressForm, config);
            
            // Update local state
            const updatedAddresses = [...addresses, data];
            setAddresses(updatedAddresses);
            setSelectedAddress(data); // Select the newly added address
            
            // Reset form and hide it
            setNewAddressForm(initialAddressState);
            setIsAddingNew(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save address.');
        } finally {
            setIsSavingAddress(false);
        }
    };

    // --- 3. Place Order Handler (Simplified for this step) ---
    const placeOrderHandler = async () => {
        if (!selectedAddress) {
            alert('Please select or add a shipping address.');
            return;
        }
        
        setIsProcessingOrder(true);
        setError(null);

        // Map frontend address fields to backend's expected fields (shippingAddress)
        // NOTE: The backend model expects {fullName, address, city, postalCode, country, email}
        // We will adjust the mapping to fit the new frontend fields.
        const shippingAddressData = {
            fullName: selectedAddress.name,
            address: selectedAddress.address,
            city: selectedAddress.city,
            postalCode: selectedAddress.pincode, // Mapping pincode to postalCode
            country: selectedAddress.state, // Mapping state to country for simplicity in this step
            email: selectedAddress.email,
        };

        try {
            const config = await getAuthHeaders();
            
            const orderData = {
                shippingAddress: shippingAddressData,
                paymentMethod: paymentMethod,
            };

            const { data } = await createOrder(orderData, config);
            
            setOrderSuccess(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order.');
            console.error('Order Error:', err);
        } finally {
            setIsProcessingOrder(false);
        }
    };


    // --- Render Logic ---

    if (loading) return <div className="text-center py-20"><FaSpinner className="animate-spin text-4xl text-green-600 mx-auto" /><p className="mt-3">Loading checkout...</p></div>;
    if (orderSuccess) {
        return (
            <div className="container mx-auto py-20 max-w-2xl text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-800 mb-3">Order Placed Successfully!</h1>
                <p className="text-lg text-gray-600 mb-6">Your order has been confirmed.</p>
                <button
                    onClick={() => navigate(`/`)} 
                    className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }
    
    const subtotal = calculateSubtotal(cart?.cartItems);
    const shippingPrice = subtotal >= 249 ? 0.00 : 50.00;
    const totalPrice = subtotal + shippingPrice;

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 border-b pb-2 text-gray-800">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Address Selection & New Form */}
                <div className="lg:w-2/3 space-y-8">
                    
                    {/* 1. Address Selection Section */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 text-green-700 border-b pb-2">1. Select Shipping Address</h2>
                        
                        <div className="space-y-4">
                            {addresses.length > 0 ? (
                                addresses.map(addr => (
                                    <div
                                        key={addr._id}
                                        onClick={() => setSelectedAddress(addr)}
                                        className={`p-4 border rounded-lg cursor-pointer transition 
                                            ${selectedAddress?._id === addr._id ? 'border-green-600 ring-2 ring-green-200 bg-green-50' : 'border-gray-300 hover:border-green-400'}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-lg flex items-center">
                                                <FaMapMarkerAlt className="text-red-500 mr-2" />
                                                {addr.name} 
                                                {addr.isDefault && <span className="ml-3 text-xs bg-gray-200 px-2 py-1 rounded">Default</span>}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p className="text-sm text-gray-600">Phone: {addr.phoneNumber} | Email: {addr.email}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No saved addresses. Please add a new one below.</p>
                            )}

                            {/* Toggle Add New Address Form */}
                            <button
                                onClick={() => setIsAddingNew(prev => !prev)}
                                type="button"
                                className="w-full text-green-600 hover:text-white hover:bg-green-600 border border-green-600 transition duration-200 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 mt-4"
                            >
                                <FaPlus />
                                <span>{isAddingNew ? 'Hide Form' : 'Add New Address'}</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. Add New Address Form */}
                    {isAddingNew && (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 text-green-700 border-b pb-2">Add New Address</h2>
                            <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={newAddressForm.name}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, name: e.target.value})}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={newAddressForm.phoneNumber}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, phoneNumber: e.target.value})}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newAddressForm.email}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, email: e.target.value})}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Address (Street, House No.)"
                                    value={newAddressForm.address}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, address: e.target.value})}
                                    className="border border-gray-300 p-3 rounded-lg col-span-full focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={newAddressForm.city}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, city: e.target.value})}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Pincode"
                                    value={newAddressForm.pincode}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, pincode: e.target.value})}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={newAddressForm.state}
                                    onChange={(e) => setNewAddressForm({...newAddressForm, state: e.target.value})}
                                    className="border border-gray-300 p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <div className='col-span-full flex items-center'>
                                    <input
                                        type="checkbox"
                                        id="isDefault"
                                        checked={newAddressForm.isDefault}
                                        onChange={(e) => setNewAddressForm({...newAddressForm, isDefault: e.target.checked})}
                                        className="form-checkbox text-green-600 h-5 w-5 rounded"
                                    />
                                    <label htmlFor="isDefault" className="ml-2 text-gray-700">Set as default address</label>
                                </div>
                                <div className='col-span-full'>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md flex items-center justify-center space-x-2"
                                        disabled={isSavingAddress}
                                    >
                                        {isSavingAddress ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                <span>Saving Address...</span>
                                            </>
                                        ) : (
                                            <span>Save Address</span>
                                        )}
                                    </button>
                                    {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                                </div>
                            </form>
                        </div>
                    )}
                    
                    {/* 3. Payment Method Section (Minimal, will be fully implemented later) */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 text-green-700 border-b pb-2">2. Payment Method</h2>
                        <div className="space-y-3">
                            <label className="flex items-center p-3 border border-green-300 rounded-lg bg-green-50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="CashOnDelivery"
                                    checked={paymentMethod === 'CashOnDelivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="form-radio text-green-600 h-5 w-5"
                                />
                                <span className="ml-3 text-lg font-medium text-gray-800">Cash On Delivery (COD)</span>
                            </label>
                        </div>
                    </div>

                </div>

                {/* Right Column: Order Summary (Using selectedAddress to enable/disable button) */}
                <div className="lg:w-1/3">
                    <div className="border border-green-400 rounded-xl p-6 bg-green-50 shadow-lg sticky lg:top-8">
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-green-700">Order Summary</h2>
                        
                        {/* Item List Summary */}
                        <div className="space-y-3 max-h-48 overflow-y-auto mb-4 border-b pb-3">
                            {cart?.cartItems.map((item) => (
                                <div key={item.plant._id} className="flex justify-between text-sm">
                                    <span className="text-gray-600 line-clamp-1">{item.quantity} x {item.plant.title}</span>
                                    <span className="font-medium text-gray-800">Rs. {(parseFloat(item.plant.price.replace('Rs. ', '').trim()) * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Price Details */}
                        <div className="flex justify-between text-lg font-medium mb-2">
                            <span>Items Subtotal:</span>
                            <span className="font-bold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-medium mb-4 pb-4 border-b">
                            <span>Shipping:</span>
                            <span className={`font-bold ${shippingPrice === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                {shippingPrice === 0 ? 'FREE' : `Rs. ${shippingPrice.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="flex justify-between text-xl font-extrabold mb-6">
                            <span>Order Total:</span>
                            <span className="text-red-600">Rs. {totalPrice.toFixed(2)}</span>
                        </div>
                        
                        {/* Place Order Button */}
                        <button
                            type="button" // Change type to button as the form is not wrapping it
                            onClick={placeOrderHandler}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition shadow-md flex items-center justify-center space-x-2 disabled:bg-gray-400"
                            disabled={isProcessingOrder || !selectedAddress}
                        >
                            {isProcessingOrder ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Placing Order...</span>
                                </>
                            ) : (
                                <span>{`Place Order (Rs. ${totalPrice.toFixed(2)})`}</span>
                            )}
                        </button>
                        {!selectedAddress && <p className="text-red-500 text-sm mt-3 text-center">Please select a shipping address to place the order.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;