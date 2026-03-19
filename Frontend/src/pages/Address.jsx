// Frontend/src/pages/Checkout.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../auth';
import { getCart, getAddresses, addAddress, deleteAddress, createOrder, createRazorpayOrder, verifyRazorpayPayment } from '../api';
import { FaSpinner, FaMapMarkerAlt, FaPlus, FaTimes, FaTrashAlt, FaWallet, FaRegCreditCard, FaLeaf, FaChevronRight, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import { SiGooglepay, SiPhonepe, SiPaytm } from 'react-icons/si';

// ... (Sub-components)
const PaymentOption = ({ id, title, desc, icon, active, onClick }) => (
    <label 
        onClick={onClick}
        className={`relative flex items-center p-6 border-2 rounded-[28px] cursor-pointer transition-all duration-500 overflow-hidden group
            ${active ? 'border-green-600 bg-green-50 shadow-xl scale-[1.02]' : 'border-gray-100 bg-white hover:border-green-200 hover:bg-gray-50'}`}
    >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${active ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-green-600'}`}>
            {icon}
        </div>
        <div className="ml-5 flex-grow">
            <h4 className={`text-base font-black transition-colors ${active ? 'text-gray-900' : 'text-gray-700'}`}>{title}</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{desc}</p>
        </div>
        <div className={`transition-all duration-500 ${active ? 'text-green-600 translate-x-0 opacity-100' : 'text-gray-200 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`}>
            <FaChevronRight size={14} />
        </div>
        {active && <div className="absolute top-0 right-0 w-12 h-12 bg-green-600/5 rounded-bl-[40px]"></div>}
    </label>
);

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
    const [selectedSubMethod, setSelectedSubMethod] = useState(null);
    const [preferredApp, setPreferredApp] = useState(null);
    const [showUPIModal, setShowUPIModal] = useState(false);
    const [transactionId, setTransactionId] = useState('');
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
            
            // --- QR CODE PAYMENT FLOW ---
            if (paymentMethod === 'Online' && !showUPIModal) {
                setShowUPIModal(true);
                setIsProcessingOrder(false);
                return;
            }


            // If submitting from the modal
            const finalPaymentMethod = paymentMethod === 'Online' ? `UPI (${preferredApp || 'Direct'}) - Ref: ${transactionId}` : 'CashOnDelivery';

            const { data } = await createOrder({
                shippingAddress: shippingAddressData,
                paymentMethod: finalPaymentMethod,
                isPaid: false, // Admin will verify transactionId later
            }, config);
            
            navigate(`/order-confirmation/${data._id}`); 

        } catch (err) {
            console.error("ORDER PLACEMENT ERROR:", err);
            setError(err.response?.data?.message || 'Order failed. Please try again.');
            setIsProcessingOrder(false);
        }
    };

    const UPIPaymentModal = () => {
        const upiID = import.meta.env.VITE_MY_UPI_ID || "your@upi";
        const upiUrl = `upi://pay?pa=${upiID}&pn=WillowAndVine&am=${finalTotalPrice}&cu=INR&tn=Order_${Date.now()}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="p-8 text-center bg-green-600 text-white relative">
                        <button onClick={() => setShowUPIModal(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><FaTimes size={24} /></button>
                        <h3 className="text-2xl font-black mb-2">Scan & Pay</h3>
                        <p className="text-green-100 text-sm opacity-80 uppercase tracking-widest font-bold">Total: Rs. {finalTotalPrice.toFixed(2)}</p>
                    </div>


                    <div className="p-10 space-y-8">
                        <div className="flex justify-center">
                            <div className="p-4 bg-white border-4 border-dashed border-green-100 rounded-[32px] shadow-inner">
                                <img src={qrUrl} alt="UPI QR Code" className="w-[180px] h-[180px]" />
                            </div>
                        </div>

                        <div className="space-y-4 text-center">
                            <p className="text-gray-500 text-sm font-medium">Scan this QR in any UPI App (GPay, PhonePe, etc.) and complete the payment.</p>
                            
                            <div className="w-full h-px bg-gray-100"></div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Enter 12-digit UTR / Ref ID</label>
                                <input 
                                    type="text"
                                    placeholder="e.g. 408239012345"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-green-600 rounded-2xl outline-none font-bold text-center transition-all"
                                />
                                <p className="text-[10px] text-gray-400 text-center px-4 mt-2">Required for verification. Keep your screen open after payment.</p>
                            </div>
                        </div>

                        <button 
                            onClick={placeOrderHandler}
                            disabled={transactionId.length < 10}
                            className={`w-full py-4 rounded-2xl font-black transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 
                                ${transactionId.length < 10 ? 'bg-gray-100 text-gray-300' : 'bg-green-600 text-white hover:bg-green-700'}`}
                        >
                            <span>Verify & Complete Order</span>
                            <FaChevronRight size={14} className="opacity-50" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };




    // --- Render Logic ---

    if (loading) return <div className="text-center py-20"><FaSpinner className="animate-spin text-4xl text-green-600 mx-auto" /><p className="mt-3">Loading checkout...</p></div>;
    if (!cart) return null; // Should only hit if cart is initially null, usually covered by loading

    
    const subtotal = calculateSubtotal(cart?.cartItems);
    const baseShipping = shippingPrice(subtotal);
    const codCharge = paymentMethod === 'CashOnDelivery' ? 20 : 0;
    const finalTotalPrice = subtotal + baseShipping + codCharge;


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
                    
                    {/* 3. Payment Method Section */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-black mb-8 text-gray-800 flex items-center">
                            <span className="w-1.5 h-6 bg-green-600 rounded-full mr-3"></span>
                            Choose Payment Method
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* 1. PhonePe */}
                            <PaymentOption 
                                id="PhonePe" 
                                title="PhonePe" 
                                desc="Pay via PhonePe app"
                                icon={<SiPhonepe size={24} className="text-[#5f259f]" />}
                                active={paymentMethod === 'Online' && selectedSubMethod === 'upi' && preferredApp === 'phonepe'}
                                onClick={() => { 
                                    setPaymentMethod('Online'); 
                                    setSelectedSubMethod('upi'); 
                                    setPreferredApp('phonepe');
                                    document.getElementById('place-order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                            />

                            {/* 2. Google Pay */}
                            <PaymentOption 
                                id="GPay" 
                                title="Google Pay" 
                                desc="Pay via GPay app"
                                icon={<SiGooglepay size={28} className="text-[#4285F4]" />}
                                active={paymentMethod === 'Online' && selectedSubMethod === 'upi' && preferredApp === 'google_pay'}
                                onClick={() => { 
                                    setPaymentMethod('Online'); 
                                    setSelectedSubMethod('upi'); 
                                    setPreferredApp('google_pay');
                                    document.getElementById('place-order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                            />

                            {/* 3. Paytm */}
                            <PaymentOption 
                                id="Paytm" 
                                title="Paytm" 
                                desc="Pay via Paytm Wallet / UPI"
                                icon={<SiPaytm size={28} className="text-[#00B9F1]" />}
                                active={paymentMethod === 'Online' && (selectedSubMethod === 'upi' || selectedSubMethod === 'wallet') && preferredApp === 'paytm'}
                                onClick={() => { 
                                    setPaymentMethod('Online'); 
                                    setSelectedSubMethod('upi'); 
                                    setPreferredApp('paytm');
                                    document.getElementById('place-order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                            />

                            {/* 4. Other UPI */}
                            <PaymentOption 
                                id="UPI" 
                                title="Other UPI" 
                                desc="Any BHIM UPI / WhatsApp Pay"
                                icon={<FaWallet size={20} className="text-orange-500" />}
                                active={paymentMethod === 'Online' && selectedSubMethod === 'upi' && !preferredApp}
                                onClick={() => { 
                                    setPaymentMethod('Online'); 
                                    setSelectedSubMethod('upi'); 
                                    setPreferredApp(null);
                                    document.getElementById('place-order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                            />

                            {/* 5. Cards */}
                            <PaymentOption 
                                id="Card" 
                                title="Credit / Debit Card" 
                                desc="Visa, Mastercard, RuPay"
                                icon={<FaRegCreditCard size={20} className="text-blue-600" />}
                                active={paymentMethod === 'Online' && selectedSubMethod === 'card'}
                                onClick={() => { 
                                    setPaymentMethod('Online'); 
                                    setSelectedSubMethod('card'); 
                                    setPreferredApp(null);
                                    document.getElementById('place-order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                            />

                            {/* 6. COD */}
                            <PaymentOption 
                                id="COD" 
                                title="Cash on Delivery" 
                                desc="Pay when plants arrive"
                                icon={<FaMapMarkerAlt size={20} className="text-green-600" />}
                                active={paymentMethod === 'CashOnDelivery'}
                                onClick={() => { 
                                    setPaymentMethod('CashOnDelivery'); 
                                    setSelectedSubMethod(null); 
                                    setPreferredApp(null);
                                }}
                            />
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
                        <div className="flex justify-between text-lg font-medium mb-2 pb-2 border-b">
                            <span>Shipping:</span>
                            <span className={`font-bold ${baseShipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                {baseShipping === 0 ? 'FREE' : `Rs. ${baseShipping.toFixed(2)}`}
                            </span>
                        </div>

                        {paymentMethod === 'CashOnDelivery' && (
                            <div className="flex justify-between text-lg font-medium mb-4 pb-4 border-b text-orange-600">
                                <span>COD Handling Charge:</span>
                                <span className="font-bold">+ Rs. 20.00</span>
                            </div>
                        )}

                        <div className="flex justify-between text-xl font-extrabold mb-6">
                            <span>Order Total:</span>
                            <span className="text-red-600">Rs. {finalTotalPrice.toFixed(2)}</span>
                        </div>
                        
                        <button
                            id="place-order-btn"
                            type="button" 
                            onClick={placeOrderHandler}
                            className={`w-full py-4 rounded-2xl font-black transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 text-lg
                                ${isProcessingOrder || !selectedAddress ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 hover:-translate-y-1 active:scale-95'}`}
                            disabled={isProcessingOrder || !selectedAddress}
                        >
                            {isProcessingOrder ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>{paymentMethod === 'CashOnDelivery' ? `Amount to Pay · Rs. ${finalTotalPrice.toFixed(2)}` : `Pay Now · Rs. ${finalTotalPrice.toFixed(2)}`}</span>
                                    {!isProcessingOrder && selectedAddress && <FaChevronRight size={14} className="opacity-50" />}
                                </>
                            )}
                        </button>

                        {!selectedAddress && <p className="text-red-500 text-sm mt-3 text-center">Please select a shipping address.</p>}
                        {/* Only show order placement errors here, general errors handled by banner */}
                    </div>
                </div>
            </div>
            {showUPIModal && <UPIPaymentModal />}
        </div>
    );
};


export default Address;