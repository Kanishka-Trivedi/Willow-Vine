import axios from "axios";

const API = axios.create({
  baseURL: "https://willow-vine.onrender.com/api"  // change to deployed backend later
});

export const getPlants = () => API.get("/plants");
export const getPlantById = (id) => API.get(`/plants/${id}`);
export const getPlantBySlug = (slug) => API.get(`/plants/slug/${slug}`);