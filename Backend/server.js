import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import plantRoutes from "./routes/plantRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cartRoutes from "./routes/cartRoutes.js";
import initializeFirebaseAdmin from "./config/firebaseAdmin.js"; // NEW IMPORT

dotenv.config();
connectDB();
initializeFirebaseAdmin();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/api/plants", plantRoutes);
app.use("/api/cart", cartRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
