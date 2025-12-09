// 🚨 IMPORTANT: Replace './firebase' with the actual path and function 
// you use to access the Firebase Auth object on your client side.
import { getAuth } from "firebase/auth"; 

/**
 * Retrieves the Firebase ID token for the currently signed-in user.
 * @returns {Promise<string|null>} The ID token string or null if no user is signed in.
 */
export const getFirebaseIdToken = async () => {
  // Get the Firebase Auth instance
  const auth = getAuth();
  const user = auth.currentUser; 

  if (!user) {
    // If there is no user, return null
    return null;
  }

  try {
    // Get the fresh ID token (this handles refreshing the token if expired)
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error getting Firebase ID Token:", error);
    // You might want to handle this error by signing the user out or redirecting to login
    return null;
  }
};

/**
 * Creates the Axios configuration object containing the Authorization header.
 * This is used for all protected API calls to your Express backend.
 * @returns {Promise<object>} The Axios configuration object.
 * @throws {Error} If the user is not authenticated.
 */
export const getAuthHeaders = async () => {
    const token = await getFirebaseIdToken();
    
    if (!token) {
        // Throwing an error forces the calling component (like CartPage) 
        // to handle the unauthenticated state (e.g., redirect to /login).
        throw new Error("User not authenticated. No Firebase ID token found.");
    }
    
    return {
        headers: {
            'Content-Type': 'application/json',
            // This is the header your backend's `authMiddleware.js` is expecting
            'Authorization': `Bearer ${token}`, 
        },
    };
};