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



// @desc    Get all user addresses
// @route   GET /api/addresses
export const getAddresses = async (config) => {
    const response = await axios.get(`${BASE_URL}/addresses`, config);
    return response;
};

// @desc    Add a new address
// @route   POST /api/addresses
export const addAddress = async (addressData, config) => {
    const response = await axios.post(`${BASE_URL}/addresses`, addressData, config);
    return response;
};

// @desc    Delete an address
// @route   DELETE /api/addresses/:id
export const deleteAddress = async (id, config) => {
    const response = await axios.delete(`${BASE_URL}/addresses/${id}`, config);
    return response;
};

export const createOrder = async (order, config) => {
    const response = await axios.post(`${BASE_URL}/orders`, order, config);
    return response;
};
