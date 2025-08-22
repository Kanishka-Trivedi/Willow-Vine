import express from "express";
import { getPlants, getPlantById, searchPlants } from "../controllers/plantController.js";

const router = express.Router();

router.get("/", getPlants);
router.get("/search", searchPlants);  // <-- put this first
router.get("/:id", getPlantById);

export default router;
