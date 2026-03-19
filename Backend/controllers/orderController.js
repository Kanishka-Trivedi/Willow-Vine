import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import sendEmail from '../utils/sendEmail.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourTestKey', // Fallback for safety
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourTestSecret',
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    isPaid = false,
    paidAt = null,
  } = req.body;

  // 1. Get the user's cart
  const cart = await Cart.findOne({ user: req.user.uid }).populate('cartItems.plant');

  if (!cart || cart.cartItems.length === 0) {
    res.status(400);
    throw new Error('No order items found in cart');
  }

  // 2. Map cart items to order items structure
  const orderItems = cart.cartItems.map((item) => {
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
  const shippingPrice = itemsPrice > 249 ? 0 : 50; 
  const codPrice = paymentMethod === 'CashOnDelivery' ? 20 : 0;
  const totalPrice = itemsPrice + shippingPrice + codPrice;


  // 4. Create Order in DB
  const order = new Order({
    orderItems,
    user: req.user.uid,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
  });

  const createdOrder = await order.save();

  // 5. Clear User's Cart
  cart.cartItems = [];
  await cart.save();

  // 6. Send Confirmation Email (HTML template truncated for brevity in replacement, but kept intact)
  const emailMessage = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h1 style="color: #2e7d32;">Order Confirmed!</h1>
      <p>Dear ${shippingAddress.fullName},</p>
      <p>Thank you for shopping with <strong>Willow & Vine</strong>! We've received your order and are preparing it for shipment.</p>
      <p><strong>Payment Status:</strong> ${isPaid ? 'PAID ONLINE' : 'CASH ON DELIVERY'}</p>
      
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
          ${shippingAddress.state}
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

  res.status(201).json(createdOrder);
});

// @desc    Create Razorpay Order
// @route   POST /api/orders/razorpay
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: Math.round(amount * 100), // amount in lowest currency unit (paisa)
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("--- RAZORPAY ORDER CREATION FAILED ---");
    console.error("Error Details:", error);
    res.status(500);
    throw new Error(`Razorpay Error: ${error.error?.description || error.message || 'Could not create order'}`);
  }
});


// @desc    Verify Razorpay Payment
// @route   POST /api/orders/razorpay/verify
// @access  Private
const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'YourTestSecret')
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid payment signature");
  }
});

// @desc    Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
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
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.uid }).sort({ createdAt: -1 });
  res.json(orders);
});

export { addOrderItems, getOrderById, getMyOrders, createRazorpayOrder, verifyRazorpayPayment };


