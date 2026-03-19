import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route: /api/orders
// access: Private
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);


export default router;
