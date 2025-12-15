// import axios from "axios";

// // Shared Axios instance
// export const API = axios.create({
//   baseURL: "https://willow-vine.onrender.com/api",
// });

// // PLANTS
// export const getPlants = () => API.get("/plants");
// export const getPlantById = (id) => API.get(`/plants/${id}`);
// export const getPlantBySlug = (slug) => API.get(`/plants/slug/${slug}`);

// // CART — must include config with Authorization header
// export const getCart = (config) => API.get("/cart", config);

// // Add to Cart (POST)
// export const addToCart = (data, config) => {
//   console.log("API addToCart called with:", data, config);
//   return API.post("/cart", data, config);
// };

// // Remove item from cart (DELETE)
// export const removeFromCart = (plantId, config) =>
//   API.delete(`/cart/${plantId}`, config);  // FIXED

// // Update Quantity (PUT)
// export const updateCartItemQuantity = (plantId, data, config) =>
//   API.put(`/cart/${plantId}`, data, config);



// export const getAddresses = async (config) => {
//     const response = await axios.get(`${BASE_URL}/addresses`, config);
//     return response;
// };

// export const addAddress = async (addressData, config) => {
//     const response = await axios.post(`${BASE_URL}/addresses`, addressData, config);
//     return response;
// };

// export const deleteAddress = async (id, config) => {
//     const response = await axios.delete(`${BASE_URL}/addresses/${id}`, config);
//     return response;
// };

// export const createOrder = async (order, config) => {
//     const response = await axios.post(`${BASE_URL}/orders`, order, config);
//     return response;
// };





// Frontend/src/api.js (CORRECTED AND CONSOLIDATED)

import axios from "axios";

// Shared Axios instance using the static base URL.
// Since you are using a static URL here, we will stick to it
// for consistency across all calls.
export const API = axios.create({
  baseURL: "https://willow-vine.onrender.com/api",
});

// ------------------------------------
// PLANTS
// ------------------------------------

export const getPlants = () => API.get("/plants");
export const getPlantById = (id) => API.get(`/plants/${id}`);
export const getPlantBySlug = (slug) => API.get(`/plants/slug/${slug}`);

// ------------------------------------
// CART — must include config with Authorization header
// ------------------------------------

export const getCart = (config) => API.get("/cart", config);

export const addToCart = (data, config) => {
  console.log("API addToCart called with:", data, config);
  return API.post("/cart", data, config);
};

export const removeFromCart = (plantId, config) =>
  API.delete(`/cart/${plantId}`, config);  

export const updateCartItemQuantity = (plantId, data, config) =>
  API.put(`/cart/${plantId}`, data, config);


// ------------------------------------
// ADDRESSES & ORDERS (Using the shared API instance)
// ------------------------------------

export const getAddresses = async (config) => {
    // Use API.get() instead of axios.get() and remove BASE_URL
    return API.get("/addresses", config);
};

export const addAddress = async (addressData, config) => {
    // Use API.post() instead of axios.post() and remove BASE_URL
    return API.post("/addresses", addressData, config);
};

export const deleteAddress = async (id, config) => {
    // Use API.delete() instead of axios.delete() and remove BASE_URL
    return API.delete(`/addresses/${id}`, config);
};

export const createOrder = async (order, config) => {
    // Use API.post() instead of axios.post() and remove BASE_URL
    return API.post("/orders", order, config);
};