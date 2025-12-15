// Frontend/src/pages/Checkout.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../auth';
import { getCart, getAddresses, addAddress, deleteAddress, createOrder } from '../api';
import { FaSpinner, FaMapMarkerAlt, FaPlus, FaTimes, FaTrashAlt } from 'react-icons/fa';

// --- INITIAL STATES ---
const initialAddressState = {
    name: '',
    phoneNumber: '',
    email: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
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
// Example shipping logic matching the backend (free over Rs. 249)
const shippingPrice = (subtotal) => subtotal >= 249 ? 0.00 : 50.00; 

const Address = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddressForm, setNewAddressForm] = useState(initialAddressState);
    
    const [loading, setLoading] = useState(true);
    const [isSavingAddress, setIsSavingAddress] = useState(false);
    const [error, setError] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false); 
    const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);


    // --- Core API Fetching Function ---
    const fetchCheckoutData = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = await getAuthHeaders();
            
            // 1. Fetch Cart
            const cartResponse = await getCart(config);
            if (!cartResponse.data.cartItems || cartResponse.data.cartItems.length === 0) {
                navigate('/cart');
                return;
            }
            setCart(cartResponse.data);

            // 2. Fetch Addresses
            const addressResponse = await getAddresses(config);
            const fetchedAddresses = addressResponse.data;
            setAddresses(fetchedAddresses);

            // Select the default or the first address
            if (fetchedAddresses.length > 0) {
                const defaultAddress = fetchedAddresses.find(addr => addr.isDefault) || fetchedAddresses[0];
                setSelectedAddress(defaultAddress);
            } else {
                setIsAddingNew(true); // Auto-open form if no addresses saved
            }

        } catch (err) {
            // Detailed console logging for initial fetch failure (e.g., 401, 404)
            const errorMessage = err.response?.data?.message || 'Failed to load checkout data.';
            console.error("--- CHECKOUT INITIAL FETCH FAILED ---");
            console.error("Server Message:", errorMessage);
            console.error("Full Error Object:", err);
            
            if (err.response?.status === 401) {
                navigate('/login');
            }
            setError(errorMessage);
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
        
        const requiredFields = ['name', 'phoneNumber', 'email', 'addressLine', 'city', 'pincode', 'state'];
        const isValid = requiredFields.every(field => newAddressForm[field] && newAddressForm[field].trim() !== '');

        if (!isValid) {
            setError('Please fill out all required fields.');
            setIsSavingAddress(false);
            return;
        }

        try {
            const config = await getAuthHeaders();
            const { data } = await addAddress(newAddressForm, config);
            
            // Update the address list locally and select the new address
            setAddresses(prev => {
                // If the new address is default, ensure old defaults are deselected visually
                const newArr = prev.map(addr => ({ ...addr, isDefault: false }));
                return [...newArr, data];
            });
            setSelectedAddress(data);
            
            // Reset form and hide it
            setNewAddressForm(initialAddressState);
            setIsAddingNew(false);
            
        } catch (err) {
            // --- DETAILED ERROR LOGGING AND MESSAGE EXTRACTION START ---
            let errorMessage = 'Failed to save address. Check network or server logs.';
            
            if (err.response) {
                errorMessage = err.response.data.message || `Server Error (${err.response.status}).`;
                
                // CRITICAL DEBUGGING: Log the specific failure to the console
                console.error("--- ADDRESS SAVE FAILED ---");
                console.error("Status:", err.response.status);
                console.error("Server Message:", err.response.data.message);
                console.error("Full Error Object:", err);
                console.error("---------------------------");

            } else if (err.request) {
                errorMessage = 'No response from server. Check backend URL.';
            } else {
                errorMessage = err.message || 'An unknown error occurred.';
            }

            setError(errorMessage);
            // --- DETAILED ERROR LOGGING AND MESSAGE EXTRACTION END ---
        } finally {
            setIsSavingAddress(false);
        }
    };
    
    // --- 3. Delete Address Handler ---
    const handleDeleteAddress = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        
        try {
            const config = await getAuthHeaders();
            await deleteAddress(id, config);
            
            // Update local state
            const updatedAddresses = addresses.filter(addr => addr._id !== id);
            setAddresses(updatedAddresses);
            
            if (selectedAddress?._id === id) {
                setSelectedAddress(updatedAddresses.find(addr => addr.isDefault) || updatedAddresses[0] || null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete address.');
        }
    };

    // --- 4. Place Order Handler ---
    const placeOrderHandler = async () => {
        if (!selectedAddress) {
            alert('Please select a shipping address.');
            return;
        }
        
        setIsProcessingOrder(true);
        setError(null);

        // Map selected address fields to backend's expected 'shippingAddress' structure
        const shippingAddressData = {
            fullName: selectedAddress.name,
            address: selectedAddress.addressLine, 
            city: selectedAddress.city,
            postalCode: selectedAddress.pincode, 
            country: selectedAddress.state, 
            email: selectedAddress.email,
        };

        try {
            const config = await getAuthHeaders();
            
            const orderData = {
                shippingAddress: shippingAddressData,
                paymentMethod: paymentMethod,
            };

            // This is the call to the future order API
            const { data } = await createOrder(orderData, config);
            
            alert(`Order ${data._id} placed successfully!`);
            navigate(`/`); 

        } catch (err) {
            // --- DETAILED ERROR LOGGING FOR ORDER PLACEMENT START ---
            let errorMessage = 'Failed to place order. Check connection.';

            if (err.response) {
                errorMessage = err.response.data.message || `Server Error (${err.response.status}).`;
                
                console.error("--- ORDER PLACEMENT FAILED ---");
                console.error("Status:", err.response.status);
                console.error("Server Message:", err.response.data.message);
                console.error("Full Error Object:", err);
                console.error("------------------------------");

            } else if (err.request) {
                errorMessage = 'No response from server.';
            } else {
                errorMessage = err.message || 'An unknown error occurred.';
            }

            setError(errorMessage);
            // --- DETAILED ERROR LOGGING FOR ORDER PLACEMENT END ---
        } finally {
            setIsProcessingOrder(false);
        }
    };


    // --- Render Logic ---

    if (loading) return <div className="text-center py-20"><FaSpinner className="animate-spin text-4xl text-green-600 mx-auto" /><p className="mt-3">Loading checkout...</p></div>;
    if (!cart) return null; // Should only hit if cart is initially null, usually covered by loading

    
    const subtotal = calculateSubtotal(cart?.cartItems);
    const finalShippingPrice = shippingPrice(subtotal);
    const totalPrice = subtotal + finalShippingPrice;

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 border-b pb-2 text-gray-800">Checkout</h1>
            
            {/* General Error Banner */}
            {error && !isSavingAddress && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}

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
                                        className={`p-4 border rounded-lg transition 
                                            ${selectedAddress?._id === addr._id ? 'border-green-600 ring-2 ring-green-200 bg-green-50' : 'border-gray-300 hover:border-green-400'}`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div onClick={() => setSelectedAddress(addr)} className="cursor-pointer flex-grow">
                                                <p className="font-bold text-lg flex items-center">
                                                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                                                    {addr.name} 
                                                    {addr.isDefault && <span className="ml-3 text-xs bg-gray-200 px-2 py-1 rounded">Default</span>}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                                <p className="text-sm text-gray-600">Phone: {addr.phoneNumber} | Email: {addr.email}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteAddress(addr._id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded-full transition ml-4 flex-shrink-0"
                                                title="Delete Address"
                                            >
                                                <FaTrashAlt className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No saved addresses. Please add a new one below.</p>
                            )}

                            {/* Toggle Add New Address Form */}
                            <button
                                onClick={() => {setIsAddingNew(prev => !prev); setError(null);}}
                                type="button"
                                className={`w-full text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 mt-4 transition duration-200 ${isAddingNew ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {isAddingNew ? <FaTimes /> : <FaPlus />}
                                <span>{isAddingNew ? 'Close Address Form' : 'Add New Address'}</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. Add New Address Form */}
                    {isAddingNew && (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 text-green-700 border-b pb-2">Add New Address Details</h2>
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
                                <div className='col-span-full'>
                                    <input
                                        type="text"
                                        placeholder="Address Line (Street, House No.)"
                                        value={newAddressForm.addressLine}
                                        onChange={(e) => setNewAddressForm({...newAddressForm, addressLine: e.target.value})}
                                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>
                                
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
                                </div>
                                {error && isAddingNew && <p className="text-red-500 text-sm mt-3 text-center col-span-full">{error}</p>}
                            </form>
                        </div>
                    )}
                    
                    {/* 3. Payment Method Section (Unchanged) */}
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

                {/* Right Column: Order Summary (Unchanged) */}
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
                            <span className={`font-bold ${finalShippingPrice === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                {finalShippingPrice === 0 ? 'FREE' : `Rs. ${finalShippingPrice.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="flex justify-between text-xl font-extrabold mb-6">
                            <span>Order Total:</span>
                            <span className="text-red-600">Rs. {totalPrice.toFixed(2)}</span>
                        </div>
                        
                        {/* Place Order Button */}
                        <button
                            type="button" 
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
                        {!selectedAddress && <p className="text-red-500 text-sm mt-3 text-center">Please select a shipping address.</p>}
                        {/* Only show order placement errors here, general errors handled by banner */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;