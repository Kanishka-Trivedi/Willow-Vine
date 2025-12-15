// Backend/controllers/addressController.js

import asyncHandler from 'express-async-handler';
import Address from '../models/Address.js';

// @desc    Get all user addresses
// @route   GET /api/addresses
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
    // Sort by default status (default first), then by creation date
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
        addressLine, 
        city, 
        state, 
        pincode, 
        isDefault = false 
    } = req.body;

    // Validation check for all required fields
    if (!name || !phoneNumber || !email || !addressLine || !city || !state || !pincode) {
        res.status(400);
        throw new Error('Please fill all required address fields.');
    }
    
    // Check if user already has addresses
    const existingAddressesCount = await Address.countDocuments({ user: req.user.uid });
    
    // If no addresses exist, automatically make the first one default, regardless of input
    const shouldBeDefault = existingAddressesCount === 0 ? true : isDefault;

    const newAddress = await Address.create({
        user: req.user.uid,
        name,
        phoneNumber,
        email,
        addressLine,
        city,
        state,
        pincode,
        isDefault: shouldBeDefault
    });

    res.status(201).json(newAddress);
});

// @desc    Delete an address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);

    if (address) {
        // Authorization check: Ensure user owns the address
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