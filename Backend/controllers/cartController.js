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
    // Select the necessary fields to display on the frontend
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

  // --- START VALIDATION ---
  if (!plantId || typeof quantity !== 'number' || quantity <= 0) {
    res.status(400);
    throw new Error('Invalid plant ID or quantity. Quantity must be a positive number.');
  }

  const plant = await Plant.findById(plantId);

  if (!plant) {
    res.status(404);
    throw new Error('Plant not found');
  }
  // --- END VALIDATION ---

  let cart = await Cart.findOne({ user: req.user.uid }); // Find by UID

  if (cart) {
    // Cart exists, check if item is already in cart
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.plant.toString() === plantId
    );

    if (itemIndex > -1) {
      // Item exists, update quantity by adding the new quantity
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      // Item does not exist, add new item
      cart.cartItems.push({ plant: plantId, quantity });
    }

    await cart.save();
  } else {
    // No cart exists for this user, create a new one
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
  
  // --- START VALIDATION ---
  if (!plantId) {
    res.status(400);
    throw new Error('Plant ID is required to remove item.');
  }
  // --- END VALIDATION ---

  let cart = await Cart.findOne({ user: req.user.uid }); // Find by UID

  if (cart) {
    const initialLength = cart.cartItems.length;

    // Filter out the item to be removed
    cart.cartItems = cart.cartItems.filter(
      (item) => item.plant.toString() !== plantId
    );

    if (cart.cartItems.length === initialLength) {
        res.status(404);
        throw new Error('Item not found in cart.');
    }

    await cart.save();

    // Populate and send back the updated cart
    await cart.populate({
      path: 'cartItems.plant',
      model: 'Plant',
      select: 'title image price oldPrice discountLabel link',
    });

    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Update quantity of a single item in cart
// @route   PUT /api/cart/:plantId
// @access  Private
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { plantId } = req.params;
  const { quantity } = req.body;

  // --- START VALIDATION ---
  if (typeof quantity !== 'number' || quantity <= 0) {
    res.status(400);
    throw new Error('Invalid quantity. Quantity must be a positive number.');
  }
  // --- END VALIDATION ---

  let cart = await Cart.findOne({ user: req.user.uid }); // Find by UID

  if (cart) {
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.plant.toString() === plantId
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity = quantity;
      await cart.save();

      // Populate and send back the updated cart
      await cart.populate({
        path: 'cartItems.plant',
        model: 'Plant',
        select: 'title image price oldPrice discountLabel link',
      });

      res.json(cart);
    } else {
      res.status(404);
      throw new Error('Item not found in cart');
    }
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export { getCart, addToCart, removeFromCart, updateCartItemQuantity };