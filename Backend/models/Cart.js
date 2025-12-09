import mongoose from "mongoose";

// Schema for a single item in the cart
const cartItemSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Plant", // Reference the existing Plant model
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1, // Quantity must be at least 1
  },
});

// Schema for the Cart itself
const cartSchema = new mongoose.Schema(
  {
    // Changed to String to store the Firebase UID
    user: {
      type: String, 
      required: true,
      unique: true, // Only one cart document per Firebase UID
    },
    cartItems: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;