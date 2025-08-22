import Plant from "../models/Plant.js";

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

// ✅ Export everything ONCE at the bottom
export { getPlants, getPlantById, searchPlants };
