// Backend/controllers/cartController.js

import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";
import Plant from "../models/Plant.js"; 

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });

  if (cart) {
    // Return the actual cart content
    res.json(cart);
  } else {
    // Return an empty cart object if no cart document exists
    res.json({ userId: req.userId, items: [] });
  }
});

// @desc    Add or update item in cart
// @route   POST /api/cart/add
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  if (!productId || !quantity || quantity < 1) {
    res.status(400);
    throw new Error("Invalid product ID or quantity");
  }

  // Fetch plant details to store (title, image, price)
  const plant = await Plant.findById(productId); 
  if (!plant) {
    res.status(404);
    throw new Error("Product not found");
  }

  const itemDetails = {
    productId: plant._id,
    title: plant.title,
    image: plant.image,
    price: plant.price,
    quantity: parseInt(quantity),
  };

  let cart = await Cart.findOne({ userId });

  if (cart) {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItemIndex > -1) {
      // Item exists, update quantity (allows full replacement)
      cart.items[existingItemIndex].quantity = itemDetails.quantity;
    } else {
      // Item does not exist, add new item
      cart.items.push(itemDetails);
    }
  } else {
    // No cart exists for user, create a new one
    cart = new Cart({
      userId,
      items: [itemDetails],
    });
  }

  const updatedCart = await cart.save();
  res.status(200).json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;

  let cart = await Cart.findOne({ userId });

  if (cart) {
    const originalLength = cart.items.length;
    
    // Filter out the item to be removed
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    
    if (cart.items.length < originalLength) {
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } else {
        res.status(404);
        throw new Error("Item not found in cart");
    }

  } else {
    res.status(404);
    throw new Error("Cart not found for this user");
  }
});

// @desc    Update quantity of an item (uses PUT since it's quantity-specific)
// @route   PUT /api/cart/update
// @access  Private
const updateItemQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  if (!productId || !quantity || quantity < 1) {
    res.status(400);
    throw new Error("Invalid product ID or quantity");
  }

  let cart = await Cart.findOne({ userId });

  if (cart) {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity = parseInt(quantity);
      
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      res.status(404);
      throw new Error("Item not found in cart");
    }
  } else {
    res.status(404);
    throw new Error("Cart not found for this user");
  }
});

export { getCart, addItemToCart, removeItemFromCart, updateItemQuantity };