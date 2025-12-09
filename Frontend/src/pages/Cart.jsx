// Frontend/src/pages/Cart.jsx (FINAL CODE)

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeItemFromCart, updateItemQuantity } from '../api';
import { FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // <-- Import useAuth

const FALLBACK_IMAGE = '/fallback.png'; 

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 💡 FINAL CHANGE: Get state directly from context
  const { idToken, isLoggedIn, loading: authLoading } = useAuth(); 

  const fetchCart = useCallback(async () => {
    if (authLoading) return;

    if (!isLoggedIn || !idToken) {
      setError('Please log in to view your cart.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getCart(idToken); 
      setCart(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
      } else {
          setError('Failed to load cart. Please ensure the backend is running.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [idToken, isLoggedIn, authLoading]); 

  useEffect(() => {
    if (!authLoading) {
      fetchCart();
    }
  }, [fetchCart, authLoading]);

  const handleRemove = async (productId) => {
    if (!isLoggedIn) return;
    try {
      await removeItemFromCart(idToken, productId);
      fetchCart(); 
    } catch (err) {
      alert('Failed to remove item.');
      console.error(err);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (!isLoggedIn || newQuantity < 1) return;
    
    // Optimistic update for smooth UI
    setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.map(item => 
            item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
    }));

    try {
      await updateItemQuantity(idToken, productId, newQuantity);
    } catch (err) {
      alert('Failed to update quantity. Please refresh.');
      fetchCart(); // Revert on failure
      console.error(err);
    }
  };
  
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const priceValue = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
      return total + priceValue * item.quantity;
    }, 0);
  };
  
  // --- Loading/Error States ---
  if (loading || authLoading) { 
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <FaSpinner className="animate-spin text-4xl text-[#4CBB17]" />
      </div>
    );
  }
  
  if (!isLoggedIn) {
     return (
        <div className="p-12 text-center text-xl text-red-600 min-h-[50vh]">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Access Denied</h2>
            <p className="text-gray-600">You must be logged in to view your cart.</p>
            <Link to="/login" className="text-blue-600 hover:underline font-semibold mt-2 block">
                Go to Login Page
            </Link>
        </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center text-xl text-red-600 min-h-[50vh]">
        {error}
      </div>
    );
  }
  
  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-12 text-center min-h-[50vh]">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty!</h2>
        <p className="text-gray-600">
            Start adding some beautiful plants to your cart. 
            <Link to="/" className="text-blue-600 hover:underline ml-1">Shop Now</Link>
        </p>
      </div>
    );
  }

  // --- Render Cart ---
  const cartTotal = calculateTotal();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b pb-2">Your Shopping Cart ({cart.items.length} Items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="lg:w-3/4 space-y-4">
          {cart.items.map((item) => (
            <div key={item.productId} className="flex items-center bg-white shadow-md rounded-xl p-4 transition duration-300 hover:shadow-lg">
              
              {/* Image */}
              <img 
                src={item.image || FALLBACK_IMAGE} 
                alt={item.title} 
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              
              <div className="flex-grow">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                {/* Price */}
                <p className="text-lg text-[#1e975a] font-semibold">{item.price}</p>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mx-4 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-100 text-gray-700 text-lg font-bold hover:bg-gray-200 disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="w-8 h-8 text-center text-lg font-semibold flex items-center justify-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-100 text-gray-700 text-lg font-bold hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.productId)}
                className="ml-4 p-2 text-red-500 hover:text-red-700 transition duration-150"
                aria-label="Remove item"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
        
        {/* Cart Summary */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 shadow-2xl rounded-xl sticky top-4">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Order Summary</h2>
            
            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-lg mb-4 border-b pb-4">
              <span>Shipping:</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            
            <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6">
              <span>Total:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={() => alert('Proceeding to Checkout...')}
              className="w-full bg-[#0c472c] text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Cart;