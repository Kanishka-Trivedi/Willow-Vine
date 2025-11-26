import express from "express";
import { getPlants, getPlantById, searchPlants, getPlantBySlug, } from "../controllers/plantController.js";

const router = express.Router();

router.get("/", getPlants);
router.get("/search", searchPlants);  // <-- put this first
router.get("/:id", getPlantById);
router.get("/slug/:slug", getPlantBySlug);  // NEW route for slug

export default router;
