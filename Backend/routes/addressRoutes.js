// Backend/routes/addressRoutes.js

import express from 'express';
const router = express.Router();
import { 
    getAddresses, 
    addAddress, 
    deleteAddress, 
} from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, getAddresses) // GET all saved addresses
    .post(protect, addAddress);  // POST to add a new address

router.route('/:id')
    .delete(protect, deleteAddress); // DELETE an address

export default router;