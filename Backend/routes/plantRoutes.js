import express from "express";
import { 
  getPlants, 
  getPlantById, 
  searchPlants, 
  getPlantBySlug 
} from "../controllers/plantController.js";

const router = express.Router();

// ORDER MATTERS!
router.get("/", getPlants);
router.get("/search", searchPlants);
router.get("/slug/:slug", getPlantBySlug); // <-- MOVE THIS ABOVE :id
router.get("/:id", getPlantById);

export default router;
