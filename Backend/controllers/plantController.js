import Plant from "../models/Plant.js";
import asyncHandler from "express-async-handler";

// @desc   Fetch all plants
// @route  GET /api/plants
// @access Public
const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.json(plants);
  } catch (error) {
    console.error("DB Error in getPlants:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Search plants by title
// @route  GET /api/plants/search?q=term
// @access Public
const searchPlants = async (req, res) => {
  try {
    const q = req.query.q || "";
    console.log("Searching for:", q); 
    const plants = await Plant.find({
      title: { $regex: q, $options: "i" }
    });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Fetch single plant by ID
// @route  GET /api/plants/:id
// @access Public
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (plant) {
      res.json(plant);
    } else {
      res.status(404).json({ message: "Plant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid ID" });
  }
};


// @desc    Fetch single plant by SLUG (NEW FUNCTION)
// @route   GET /api/plants/slug/:slug
// @access  Public
const getPlantBySlug = asyncHandler(async (req, res) => {
  // Construct the link field value (e.g., "/product/moonstone")
  const fullLink = `/product/${req.params.slug}`;

  // Find the plant where the 'link' field matches the fullLink
  const plant = await Plant.findOne({ link: fullLink });

  if (plant) {
    res.json(plant);
  } else {
    res.status(404);
    throw new Error("Plant not found with that slug");
  }
});

// ✅ Export everything ONCE at the bottom
export { getPlants, getPlantById, searchPlants, getPlantBySlug};
