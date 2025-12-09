// Frontend/src/context/AuthContext.jsx (NEW FILE)

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
// 💡 Import the 'auth' instance exported from your firebase.js file
import { auth as firebaseAuth } from '../firebase'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // The 'firebaseAuth' instance is used directly here
  const authInstance = firebaseAuth;

  useEffect(() => {
    // This listener runs every time the user's signed-in status changes
    const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
      if (currentUser) {
        // Get the token needed for protected backend routes
        const token = await currentUser.getIdToken(); 
        setUser(currentUser);
        setIdToken(token);
      } else {
        setUser(null);
        setIdToken(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on component unmount
  }, [authInstance]);

  const value = {
    user,
    idToken, // The token needed for API authorization
    isLoggedIn: !!user,
    loading, // True while Firebase is checking auth status
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only after the initial authentication check is complete */}
      {!loading && children} 
    </AuthContext.Provider>
  );
};