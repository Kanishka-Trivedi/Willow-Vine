# Willow & Vine | Full-Stack E-Commerce Plant Nursery

Willow & Vine is a sophisticated e-commerce platform designed for the modern plant enthusiast. This project implements a complete shopping experience, from secure user authentication and product discovery to personalized cart management and shipping address persistence.

---

## 🏗 System Architecture

The application is built using a decoupled architecture with a dedicated React frontend and a RESTful Node.js backend, ensuring scalability and ease of maintenance.

### Technical Stack

- **Frontend:** Built with React 19 and Vite for rapid development and optimized builds.
- **Backend:** Powered by Express 5.1, utilizing ES Modules for modern JavaScript syntax.
- **Database:** MongoDB via Mongoose for flexible, document-based data storage.
- **Security:** Firebase Admin SDK integrated into the backend middleware to provide robust, token-based authentication.
- **Styling:** A combination of Tailwind CSS 4.0 and Styled Components for a highly responsive and professional UI.

---

## 📂 Project Structure
```plaintext
Willow-Vine/
├── Backend/
│   ├── config/             # DB connection and Firebase Admin setup
│   ├── controllers/        # Logic for plants, cart, and addresses
│   ├── middleware/         # Auth verification and error handling
│   ├── models/             # Mongoose schemas (Plant, Cart, Address)
│   ├── routes/             # Express route definitions
│   └── server.js           # Main entry point and middleware assembly
├── Frontend/
│   ├── src/
│   │   ├── components/     # UI components (Sliders, Navigation, Search)
│   │   ├── pages/          # View-level components (Cart, Detail, Categories)
│   │   ├── api.js          # Axios configuration for backend communication
│   │   └── firebase.js     # Client-side Firebase initialization
│   └── vite.config.js      # Vite build and server configuration
```

---

## 🛰 API Reference

### Plant Catalog

Endpoints for browsing and searching the plant inventory.

- `GET /api/plants` — Retrieve a full list of available plants.
- `GET /api/plants/search` — Search the catalog based on query parameters.
- `GET /api/plants/slug/:slug` — Fetch detailed information via SEO-friendly slug.
- `GET /api/plants/:id` — Fetch plant details by unique MongoDB ID.

### Shopping Cart (Protected)

> **Required:** Valid Firebase ID Token in `Authorization` header.

- `GET /api/cart` — Retrieve the current user's shopping cart items.
- `POST /api/cart` — Add a new plant or increment quantity in the cart.
- `PUT /api/cart/:plantId` — Update the quantity for a specific item.
- `DELETE /api/cart/:plantId` — Remove an item from the cart.

### User Addresses (Protected)

> **Required:** Valid Firebase ID Token in `Authorization` header.

- `GET /api/addresses` — List all saved shipping addresses for the user.
- `POST /api/addresses` — Save a new shipping address to the profile.
- `DELETE /api/addresses/:id` — Remove a specific address record.

---

## 🔧 Installation & Configuration

### 1. Environment Setup

Create a `.env` file in the `/Backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
# Firebase Admin SDK credentials should be configured in config/firebaseAdmin.js
```

### 2. Backend Initialization
```bash
cd Backend
npm install
npm run dev   # Starts server with Nodemon
```

### 3. Frontend Initialization
```bash
cd Frontend
npm install
npm run dev   # Starts Vite development server
```

---

## 🛡 Security Implementation

The project employs a **"Zero Trust"** approach for user data. The `authMiddleware.js` uses the `firebase-admin` SDK to intercept requests to protected routes (`/cart`, `/addresses`), verifying the `Authorization: Bearer <token>` header before allowing the controller logic to execute.
