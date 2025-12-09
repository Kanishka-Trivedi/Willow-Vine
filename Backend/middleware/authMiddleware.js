// Backend/middleware/authMiddleware.js (What you need to finalize)

import asyncHandler from "express-async-handler";
// 1. IMPORT YOUR FIREBASE ADMIN SDK SETUP
import admin from '../config/firebaseAdmin.js'; // You need to create this file

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 2. USE THE ADMIN SDK TO VERIFY THE TOKEN
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // 3. ATTACH THE AUTHENTICATED USER'S ID TO THE REQUEST
      req.userId = decodedToken.uid; 

      next();
    } catch (error) {
      // Handles expired, invalid, or tampered tokens
      console.error("Token verification failed:", error);
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token provided.");
  }
});

export { protect };