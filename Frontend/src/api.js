import axios from "axios";

const API = axios.create({
  baseURL: "https://willow-vine.onrender.com/api"  // change to deployed backend later
});

// Helper function to attach the Firebase ID Token for protected routes
const setAuthHeader = (idToken) => ({
  headers: {
    Authorization: `Bearer ${idToken}`,
  },
});

export const getPlants = () => API.get("/plants");
export const getPlantById = (id) => API.get(`/plants/${id}`);
export const getPlantBySlug = (slug) => API.get(`/plants/slug/${slug}`);


export const getCart = (idToken) => API.get("/cart", setAuthHeader(idToken));

export const addItemToCart = (idToken, productId, quantity) => 
  API.post("/cart/add", { productId, quantity }, setAuthHeader(idToken));

export const removeItemFromCart = (idToken, productId) => 
  API.delete(`/cart/remove/${productId}`, setAuthHeader(idToken));

export const updateItemQuantity = (idToken, productId, quantity) => 
  API.put("/cart/update", { productId, quantity }, setAuthHeader(idToken));