import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { getAuthHeaders } from '../auth';
import { getCart, removeFromCart, updateCartItemQuantity } from '../api';

const CartPage = () => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const calculateSubtotal = (items) => {
    if (!items || items.length === 0) return '0.00';
    
    return items.reduce(
      (acc, item) => acc + (parseFloat(item.plant.price) * item.quantity),
      0
    ).toFixed(2);
  };

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const config = await getAuthHeaders();
      const { data } = await getCart(config);
      setCart(data);
    } catch (err) {
      if (err.message.includes("not authenticated") || err.response?.status === 401) {
        setCart({ cartItems: [] }); 
        navigate('/login');
      }
      setError(err.response?.data?.message || err.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItemHandler = async (plantId) => {
    try {
      const config = await getAuthHeaders();
      const { data } = await removeFromCart(plantId, config); 
      setCart(data);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const updateQuantityHandler = async (plantId, newQuantity) => {
    const quantity = Number(newQuantity);
    
    if (quantity <= 0) {
      await removeItemHandler(plantId);
      return;
    }

    try {
      const config = await getAuthHeaders();
      const { data } = await updateCartItemQuantity(
        plantId,
        { quantity },
        config 
      );
      setCart(data);
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  if (loading) return <MainLayout><div className="text-center py-10">Loading cart...</div></MainLayout>;
  if (error && !error.includes("not authenticated")) return <MainLayout><div className="text-center py-10 text-red-500">Error: {error}</div></MainLayout>;

  const cartItems = cart?.cartItems || [];
  const isCartEmpty = cartItems.length === 0;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 border-b pb-2">Shopping Cart</h1>

        {isCartEmpty ? (
          <div className="text-center p-10 bg-gray-50 rounded-lg shadow-inner">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
            <Link to="/" className="text-green-600 hover:text-green-800 font-semibold">
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-3/4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.plant._id}
                    className="flex items-center border rounded-lg p-4 shadow-sm"
                  >
                    <Link to={`/product/${item.plant._id}`} className="flex-shrink-0">
                      <img
                        src={item.plant.image}
                        alt={item.plant.title}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/product/${item.plant._id}`}>
                        <h2 className="text-lg font-semibold hover:text-green-700">
                          {item.plant.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600">
                        Price: ${item.plant.price}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Quantity Control */}
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantityHandler(item.plant._id, e.target.value)}
                        className="border border-gray-300 rounded p-2 focus:ring-green-500 focus:border-green-500"
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>

                      {/* Total for Item */}
                      <span className="text-lg font-medium w-20 text-right">
                        ${(parseFloat(item.plant.price) * item.quantity).toFixed(2)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItemHandler(item.plant._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full"
                        aria-label="Remove item from cart"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/4">
              <div className="border border-green-300 rounded-lg p-6 bg-green-50 shadow-lg sticky lg:top-8">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-green-700">
                  Order Summary
                </h2>
                <div className="flex justify-between text-lg font-medium mb-3">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items:</span>
                  <span>${calculateSubtotal(cartItems)}</span>
                </div>
                <button
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  disabled={isCartEmpty}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;