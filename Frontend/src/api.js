// import axios from "axios";

// // Export the API instance to be used by components for authenticated calls
// export const API = axios.create({ 
//   baseURL: "https://willow-vine.onrender.com/api" 
// });

// // Existing exports
// export const getPlants = () => API.get("/plants");
// export const getPlantById = (id) => API.get(`/plants/${id}`);
// export const getPlantBySlug = (slug) => API.get(`/plants/slug/${slug}`);

// // NEW CART EXPORTS: These functions must accept a 'config' object containing the Authorization header
// export const getCart = (config) => API.get("/cart", config);

// export const addToCart = (data, config) => {
//   console.log("API addToCart called with:", data, config);
//   return API.post("/cart", data, config);
// };
//  // data = { plantId, quantity }

// export const removeFromCart = (plantId, config) => 
//   API.delete(`/cart/${plantId}`, config);

// export const updateCartItemQuantity = (plantId, data, config) => 
//   API.put(`/cart/${plantId}`, data, config); // data = { quantity }





import axios from "axios";

// Shared Axios instance
export const API = axios.create({
  baseURL: "https://willow-vine.onrender.com/api",
});

// PLANTS
export const getPlants = () => API.get("/plants");
export const getPlantById = (id) => API.get(`/plants/${id}`);
export const getPlantBySlug = (slug) => API.get(`/plants/slug/${slug}`);

// CART — must include config with Authorization header
export const getCart = (config) => API.get("/cart", config);

// Add to Cart (POST)
export const addToCart = (data, config) => {
  console.log("API addToCart called with:", data, config);
  return API.post("/cart", data, config);
};

// Remove item from cart (DELETE)
export const removeFromCart = (plantId, config) =>
  API.delete(`/cart/${plantId}`, config);  // FIXED

// Update Quantity (PUT)
export const updateCartItemQuantity = (plantId, data, config) =>
  API.put(`/cart/${plantId}`, data, config);
