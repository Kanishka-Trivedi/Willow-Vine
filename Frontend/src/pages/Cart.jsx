// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuthHeaders } from '../auth';
// import { getCart, removeFromCart, updateCartItemQuantity } from '../api';
// import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon

// const CartPage = () => {
//   const [cart, setCart] = useState({ cartItems: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const calculateSubtotal = (items) => {
//     if (!items || items.length === 0) return '0.00';
    
//     // FIX: Parse price string (e.g., "Rs. 99.00") before calculating
//     return items.reduce(
//       (acc, item) => acc + (parseFloat(item.plant.price.replace('Rs. ', '').trim()) * item.quantity),
//       0
//     ).toFixed(2);
//   };

//   const fetchCart = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const config = await getAuthHeaders();
//       const { data } = await getCart(config);
//       setCart(data);
//     } catch (err) {
//       if (err.message.includes("not authenticated") || err.response?.status === 401) {
//         setCart({ cartItems: [] }); 
//         navigate('/login');
//       }
//       setError(err.response?.data?.message || err.message || 'Failed to fetch cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const removeItemHandler = async (plantId) => {
//     try {
//       const config = await getAuthHeaders();
//       const { data } = await removeFromCart(plantId, config); 
//       setCart(data);
//     } catch (err) {
//       console.error('Error removing item:', err);
//     }
//   };

//   const updateQuantityHandler = async (plantId, newQuantity) => {
//     const quantity = Number(newQuantity);
    
//     if (quantity <= 0) {
//       await removeItemHandler(plantId);
//       return;
//     }

//     try {
//       const config = await getAuthHeaders();
//       const { data } = await updateCartItemQuantity(
//         plantId,
//         { quantity },
//         config 
//       );
//       setCart(data);
//     } catch (err) {
//       console.error('Error updating quantity:', err);
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading cart...</div>;
//   if (error && !error.includes("not authenticated")) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

//   const cartItems = cart?.cartItems || [];
//   const isCartEmpty = cartItems.length === 0;

//   return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8 border-b pb-2 text-gray-800">Shopping Cart</h1>

//         {isCartEmpty ? (
//           <div className="text-center p-16 bg-green-50 rounded-lg shadow-inner">
//             <p className="text-xl text-green-700 mb-6 font-semibold">Your cart is empty.</p>
//             <Link 
//               to="/" 
//               className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Cart Items List */}
//             <div className="lg:w-3/4">
//               <div className="space-y-4">
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.plant._id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
//                   >
//                     {/* Assuming link field contains a full path like '/product/slug-name' */}
//                     <Link to={`/product/${item.plant.link.split('/product/')[1]}`} className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
//                       <img
//                         src={item.plant.image}
//                         alt={item.plant.title}
//                         className="w-24 h-24 object-cover rounded-lg border border-gray-100"
//                       />
//                     </Link>
                    
//                     <div className="flex-grow">
//                       <Link to={`/product/${item.plant.link.split('/product/')[1]}`}>
//                         <h2 className="text-lg font-bold text-gray-800 hover:text-green-600 transition">
//                           {item.plant.title}
//                         </h2>
//                       </Link>
//                       <div className="flex items-center mt-1">
//                           <p className="text-xl font-semibold text-green-700 mr-2">
//                             {item.plant.price}
//                           </p>
//                           {item.plant.oldPrice && (
//                             <p className="text-md text-gray-400 line-through">
//                               {item.plant.oldPrice}
//                             </p>
//                           )}
//                       </div>
//                     </div>

//                     <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start space-x-6 mt-4 sm:mt-0">
//                       {/* Quantity Control */}
//                       <div className="flex flex-col items-center">
//                           <label className="text-xs text-gray-500 mb-1">Quantity</label>
//                           <select
//                             value={item.quantity}
//                             onChange={(e) => updateQuantityHandler(item.plant._id, e.target.value)}
//                             className="border border-gray-300 rounded-lg p-2 text-center w-16 focus:ring-green-500 focus:border-green-500"
//                           >
//                             {[...Array(10).keys()].map((x) => (
//                               <option key={x + 1} value={x + 1}>
//                                 {x + 1}
//                               </option>
//                             ))}
//                           </select>
//                       </div>

//                       {/* Total for Item */}
//                       <div className="flex flex-col items-center">
//                           <label className="text-xs text-gray-500 mb-1">Total</label>
//                           <span className="text-lg font-bold text-gray-800">
//                             Rs. {(parseFloat(item.plant.price.replace('Rs. ', '').trim()) * item.quantity).toFixed(2)}
//                           </span>
//                       </div>

//                       {/* Remove Button */}
//                       <button
//                         onClick={() => removeItemHandler(item.plant._id)}
//                         className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150 ml-4"
//                         aria-label="Remove item from cart"
//                       >
//                         <FaTrashAlt className="h-5 w-5" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Cart Summary */}
//             <div className="lg:w-1/4">
//               <div className="border border-green-300 rounded-xl p-6 bg-green-50 shadow-lg sticky top-8">
//                 <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-green-700">
//                   Order Summary
//                 </h2>
//                 <div className="flex justify-between text-lg font-medium mb-3">
//                   <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items:</span>
//                   <span className="font-bold text-gray-800">Rs. {calculateSubtotal(cartItems)}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-medium mb-4 pb-4 border-b">
//                     <span>Shipping:</span>
//                     <span className="font-bold text-green-600">FREE</span>
//                 </div>
//                 <div className="flex justify-between text-xl font-extrabold mb-6">
//                     <span>Order Total:</span>
//                     <span className="text-red-600">Rs. {calculateSubtotal(cartItems)}</span>
//                 </div>
                
//                 <button
//                   onClick={() => navigate('/checkout')} 
//                   className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
//                   disabled={isCartEmpty}
//                 >
//                   Proceed to Checkout
//                 </button>
//                 <Link to="/" className="block text-center mt-3 text-sm text-green-600 hover:text-green-800 transition">
//                     Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//   );
// };

// export default CartPage;







import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../auth';
import { getCart, removeFromCart, updateCartItemQuantity } from '../api';
import { FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const calculateSubtotal = (items) => {
    if (!items || items.length === 0) return '0.00';
    
    // Parse price string (e.g., "Rs. 99.00") before calculating
    return items.reduce(
      (acc, item) => acc + (parseFloat(item.plant.price.replace('Rs. ', '').trim()) * item.quantity),
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
      const ErrorLayout = <div className="text-center py-10 text-red-500">Error: {err.response?.data?.message || err.message || 'Failed to fetch cart'}</div>;
      
      if (err.message.includes("not authenticated") || err.response?.status === 401) {
        setCart({ cartItems: [] }); 
        navigate('/login');
      }
      setError(ErrorLayout);
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

  if (loading) return <div className="text-center py-10">Loading cart...</div>;
  if (error) return error;

  const cartItems = cart?.cartItems || [];
  const isCartEmpty = cartItems.length === 0;

  return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 border-b pb-2 text-gray-800">Shopping Cart</h1>

        {isCartEmpty ? (
          <div className="text-center p-16 bg-green-50 rounded-lg shadow-inner">
            <p className="text-xl text-green-700 mb-6 font-semibold">Your cart is empty.</p>
            <Link 
              to="/" 
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-3/4">
              {/* Header Row for Alignment */}
              <div className="hidden sm:flex text-gray-500 font-semibold border-b pb-2 mb-4">
                <div className="w-[45%] pl-4">Product Details</div>
                <div className="w-[15%] text-center">Price</div>
                <div className="w-[15%] text-center">Quantity</div>
                <div className="w-[20%] text-right pr-6">Total</div>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.plant._id}
                    className="flex flex-wrap sm:flex-nowrap items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
                  >
                    {/* 1. Product Details (45% width) */}
                    <div className="w-full sm:w-[45%] flex items-center mb-4 sm:mb-0">
                        <Link to={`/product/${item.plant.link.split('/product/')[1]}`} className="flex-shrink-0 mr-4">
                            <img
                                src={item.plant.image}
                                alt={item.plant.title}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                            />
                        </Link>
                        <div className="flex-grow">
                            <Link to={`/product/${item.plant.link.split('/product/')[1]}`}>
                                <h2 className="text-md font-bold text-gray-800 hover:text-green-600 transition line-clamp-2">
                                    {item.plant.title}
                                </h2>
                            </Link>
                        </div>
                    </div>
                    
                    {/* 2. Price (15% width) - CENTERED */}
                    <div className="w-1/3 sm:w-[15%] flex justify-center items-center flex-col">
                        <label className="sm:hidden text-xs text-gray-500 mb-1">Price</label>
                        <div className="text-lg font-semibold text-green-700 whitespace-nowrap text-center"> {/* Added text-center */}
                            {item.plant.price}
                        </div>
                        {item.plant.oldPrice && (
                            <p className="text-sm text-gray-400 line-through text-center">
                              {item.plant.oldPrice}
                            </p>
                        )}
                    </div>

                    {/* 3. Quantity (15% width) - CENTERED */}
                    <div className="w-1/3 sm:w-[15%] flex justify-center items-center flex-col">
                        <label className="sm:hidden text-xs text-gray-500 mb-1">Quantity</label>
                        <select
                            value={item.quantity}
                            onChange={(e) => updateQuantityHandler(item.plant._id, e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-center w-16 focus:ring-green-500 focus:border-green-500"
                        >
                            {[...Array(10).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 4. Total and Delete Button (25% width combined) - RIGHT ALIGNED */}
                    <div className="w-1/3 sm:w-[25%] flex justify-end items-center space-x-4">
                        {/* Total */}
                        <div className="flex flex-col items-end"> {/* Used items-end for right alignment */}
                          <label className="sm:hidden text-xs text-gray-500 mb-1">Total</label>
                          <span className="text-lg font-bold text-gray-800 whitespace-nowrap">
                            Rs. {(parseFloat(item.plant.price.replace('Rs. ', '').trim()) * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => removeItemHandler(item.plant._id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150 flex-shrink-0"
                            aria-label="Remove item from cart"
                        >
                            <FaTrashAlt className="h-5 w-5" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary (Unchanged) */}
            <div className="lg:w-1/4">
              <div className="border border-green-300 rounded-xl p-6 bg-green-50 shadow-lg sticky top-8">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-green-700">
                  Order Summary
                </h2>
                <div className="flex justify-between text-lg font-medium mb-3">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items:</span>
                  <span className="font-bold text-gray-800">Rs. {calculateSubtotal(cartItems)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium mb-4 pb-4 border-b">
                    <span>Shipping:</span>
                    <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold mb-6">
                    <span>Order Total:</span>
                    <span className="text-red-600">Rs. {calculateSubtotal(cartItems)}</span>
                </div>
                
                <button
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
                  disabled={isCartEmpty}
                >
                  Proceed to Checkout
                </button>
                <Link to="/" className="block text-center mt-3 text-sm text-green-600 hover:text-green-800 transition">
                    Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default CartPage;