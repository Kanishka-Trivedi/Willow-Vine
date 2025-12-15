// Backend/models/Address.js

import mongoose from 'mongoose';

const addressSchema = mongoose.Schema(
    {
        user: {
            type: String, // Storing Firebase UID as String
            required: true,
            index: true // Index for fast lookup by user
        },
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        // Used to pre-select an address on the checkout page
        isDefault: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model('Address', addressSchema);

export default Address;