import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"  // change to deployed backend later
});

export const getPlants = () => API.get("/plants");
export const getPlantById = (id) => API.get(`/plants/${id}`);

