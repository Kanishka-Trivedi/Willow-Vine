// Backend/models/Address.js

import mongoose from 'mongoose';

const addressSchema = mongoose.Schema(
    {
        user: {
            type: String, // Stores Firebase UID
            required: true,
            ref: 'User',
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        addressLine: { // Required field
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: { // Required field
            type: String,
            required: true,
            trim: true,
        },
        pincode: { // Required field
            type: String,
            required: true,
            trim: true,
        },
        isDefault: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware to ensure only one address is set as default for the user
addressSchema.pre('save', async function(next) {
    if (this.isModified('isDefault') && this.isDefault) {
        await this.model('Address').updateMany(
            { user: this.user, _id: { $ne: this._id } },
            { $set: { isDefault: false } }
        );
    }
    next();
});


const Address = mongoose.model('Address', addressSchema);

export default Address;