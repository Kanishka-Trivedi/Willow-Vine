import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new order

// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
  } = req.body;

  // 1. Get the user's cart
  const cart = await Cart.findOne({ user: req.user.uid }).populate('cartItems.plant');

  if (!cart || cart.cartItems.length === 0) {
    res.status(400);
    throw new Error('No order items found in cart');
  }

  // 2. Map cart items to order items structure
  const orderItems = cart.cartItems.map((item) => {
    // Ensure we parse the price correctly (e.g., "Rs. 299" -> 299)
    const priceStr = item.plant.price.replace('Rs. ', '').replace(',', '').trim();
    const price = parseFloat(priceStr);
    
    return {
      name: item.plant.title,
      qty: item.quantity,
      image: item.plant.image,
      price: price,
      plant: item.plant._id,
    };
  });

  // 3. Calculate Prices
  const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 249 ? 0 : 50; // Match frontend logic
  const totalPrice = itemsPrice + shippingPrice;

  // 4. Create Order in DB
  const order = new Order({
    orderItems,
    user: req.user.uid,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  // 5. Clear User's Cart
  cart.cartItems = [];
  await cart.save();

  // 6. Send Confirmation Email
  const emailMessage = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h1 style="color: #2e7d32;">Order Confirmed!</h1>
      <p>Dear ${shippingAddress.fullName},</p>
      <p>Thank you for shopping with <strong>Willow & Vine</strong>! We've received your order and are preparing it for shipment.</p>
      
      <h3>Order ID: #${createdOrder._id}</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead style="background-color: #f5f5f5;">
          <tr>
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderItems.map(item => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${item.name}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; text-align: center;">${item.qty}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">Rs. ${(item.price * item.qty).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div style="margin-top: 20px; text-align: right;">
        <p><strong>Subtotal:</strong> Rs. ${itemsPrice.toFixed(2)}</p>
        <p><strong>Shipping:</strong> ${shippingPrice === 0 ? 'FREE' : `Rs. ${shippingPrice.toFixed(2)}`}</p>
        <h2 style="color: #d32f2f;">Total: Rs. ${totalPrice.toFixed(2)}</h2>
      </div>
      
      <div style="margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;">
        <p><strong>Shipping Address:</strong><br/>
          ${shippingAddress.fullName}<br/>
          ${shippingAddress.address}<br/>
          ${shippingAddress.city}, ${shippingAddress.postalCode}<br/>
          ${shippingAddress.country}
        </p>
      </div>
      
      <p style="margin-top: 40px; font-size: 12px; color: #888888;">
        This is an automated message, please do not reply. For any queries, contact support@willowandvine.com.
      </p>
    </div>
  `;

  await sendEmail({
    email: shippingAddress.email,
    subject: `Order Confirmed: #${createdOrder._id} - Willow & Vine`,
    message: emailMessage,
  });

  // 7. Respond with the created order
  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // Basic authorization check: standard users can only see their own orders
    if (order.user !== req.user.uid) {
        res.status(401);
        throw new Error('Not authorized to view this order.');
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.uid }).sort({ createdAt: -1 });
  res.json(orders);
});

export { addOrderItems, getOrderById, getMyOrders };

