import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart } from '../api';
import { getAuthHeaders } from '../auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCartCount = async () => {
    try {
      const config = await getAuthHeaders();
      const { data } = await getCart(config);
      
      // Check if it's the actual cart with cartItems
      if (data && data.cartItems) {
        const totalItems = data.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      // If error (like unauthorized), reset count
      console.warn("Cart fetch failed or user not logged in. Cart count reset.");
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for auth state changes to refresh cart
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCartCount();
      } else {
        setCartCount(0);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount, loading }}>
      {children}
    </CartContext.Provider>
  );
};
