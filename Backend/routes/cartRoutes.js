// Backend/routes/cartRoutes.js

import express from "express";
const router = express.Router();
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js"; 

// All cart routes are protected and require a logged-in user
router.route("/").get(protect, getCart);
router.route("/add").post(protect, addItemToCart);
router.route("/remove/:productId").delete(protect, removeItemFromCart);
router.route("/update").put(protect, updateItemQuantity);

export default router;