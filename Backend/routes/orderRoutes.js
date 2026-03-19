import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getMyOrders, createRazorpayOrder, verifyRazorpayPayment } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route: /api/orders
// access: Private
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.post('/razorpay', protect, createRazorpayOrder);
router.post('/razorpay/verify', protect, verifyRazorpayPayment);
router.route('/:id').get(protect, getOrderById);

export default router;

