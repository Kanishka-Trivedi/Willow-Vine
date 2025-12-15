// Backend/controllers/addressController.js

import asyncHandler from 'express-async-handler';
import Address from '../models/Address.js';

// Helper to ensure only one address is set as default (optional complexity)
const ensureSingleDefault = async (userId, currentAddressId) => {
    await Address.updateMany(
        { user: userId, _id: { $ne: currentAddressId } },
        { $set: { isDefault: false } }
    );
};

// @desc    Get all user addresses
// @route   GET /api/addresses
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
    // Sort by default status first, then by creation date
    const addresses = await Address.find({ user: req.user.uid }).sort({ isDefault: -1, createdAt: -1 });
    res.json(addresses);
});

// @desc    Add a new address
// @route   POST /api/addresses
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
    const { 
        name, 
        phoneNumber, 
        email, 
        address, 
        city, 
        pincode, 
        state, 
        isDefault = false 
    } = req.body;

    // Basic validation
    if (!name || !phoneNumber || !email || !address || !city || !pincode || !state) {
        res.status(400);
        throw new Error('Please fill all required address fields.');
    }

    const newAddress = await Address.create({
        user: req.user.uid,
        name,
        phoneNumber,
        email,
        address,
        city,
        pincode,
        state,
        isDefault
    });

    // If the new address is marked as default, unset default from others
    if (newAddress.isDefault) {
        await ensureSingleDefault(req.user.uid, newAddress._id);
    }
    
    res.status(201).json(newAddress);
});

// @desc    Delete an address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);

    if (address) {
        // Authorization check
        if (address.user.toString() !== req.user.uid) {
            res.status(401);
            throw new Error('Not authorized to delete this address');
        }

        await Address.deleteOne({ _id: req.params.id });
        res.json({ message: 'Address removed' });
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

export { getAddresses, addAddress, deleteAddress };