// Backend/models/Cart.js

import mongoose from "mongoose";

// Sub-schema for individual items in the cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Plant', // References the existing Plant model
  },
  title: {
    type: String, // Name of the product
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String, // Matches your existing Plant model price type
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

// Main Cart schema linked to a user
const cartSchema = new mongoose.Schema(
  {
    userId: { // Stores the Firebase UID extracted from the token
      type: String, 
      required: true,
      unique: true, // Ensures one cart document per user
    },
    items: [cartItemSchema], // Array of cart items
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;