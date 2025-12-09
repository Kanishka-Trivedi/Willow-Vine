import asyncHandler from 'express-async-handler';
import admin from 'firebase-admin'; 

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Use the globally initialized Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Attach the Firebase User ID (UID) to the request object
      req.user = { uid: decodedToken.uid }; 

      next();
    } catch (error) {
      console.error('Firebase ID Token verification error:', error.message);
      res.status(401);
      throw new Error('Not authorized, invalid or expired token. Please log in again.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided.');
  }
});

export { protect };