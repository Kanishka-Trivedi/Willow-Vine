import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';
import Plant from '../models/Plant.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private (uses Firebase UID)
const getCart = asyncHandler(async (req, res) => {
  // Use req.user.uid from the auth middleware
  const cart = await Cart.findOne({ user: req.user.uid }).populate({
    path: 'cartItems.plant',
    model: 'Plant',
    select: 'title image price oldPrice discountLabel link', 
  });

  if (cart) {
    res.json(cart);
  } else {
    // If no cart exists, return an empty cart structure with the user's UID
    res.json({ user: req.user.uid, cartItems: [] });
  }
});

// @desc    Add a plant to cart or update quantity
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { plantId, quantity } = req.body;

  // ... (validation code remains the same)

  let cart = await Cart.findOne({ user: req.user.uid }); // Find by UID

  if (cart) {
    // ... (logic to update existing item or push new item remains the same)
    
    // Check if item is already in cart
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.plant.toString() === plantId
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({ plant: plantId, quantity });
    }

    await cart.save();
  } else {
    // Create a new cart using the Firebase UID
    cart = await Cart.create({
      user: req.user.uid, 
      cartItems: [{ plant: plantId, quantity }],
    });
  }

  // Populate and send back the updated cart
  await cart.populate({
    path: 'cartItems.plant',
    model: 'Plant',
    select: 'title image price oldPrice discountLabel link',
  });

  res.status(201).json(cart);
});

// @desc    Remove an item from cart
// @route   DELETE /api/cart/:plantId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { plantId } = req.params;

  let cart = await Cart.findOne({ user: req.user.uid }); // Find by UID

  // ... (rest of logic remains the same)
  // ... (save and populate)
});

// @desc    Update quantity of a single item in cart
// @route   PUT /api/cart/:plantId
// @access  Private
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { plantId } = req.params;
  const { quantity } = req.body;

  // ... (validation code remains the same)

  let cart = await Cart.findOne({ user: req.user.uid }); // Find by UID

  // ... (rest of logic remains the same)
  // ... (update quantity, save and populate)
});

export { getCart, addToCart, removeFromCart, updateCartItemQuantity };