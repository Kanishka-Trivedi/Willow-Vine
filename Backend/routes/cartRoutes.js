import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js'; // Use the new Firebase middleware

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart);

router.route('/:plantId')
  .delete(protect, removeFromCart)
  .put(protect, updateCartItemQuantity);

export default router;