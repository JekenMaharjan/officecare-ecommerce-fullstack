import express from "express"
import { authMiddleware, authorize } from "../middlewares/auth.js";
import {
    addToCart,
    getCartCount,
    getCartItems,
    removeFromCart,
    updateCartQuantity,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

// =================================================================================================

// Protect all order routes
cartRouter.use(authMiddleware);

// =================================================================================================

// CART ROUTES

// GET: Get cart count -> customer only
cartRouter.get("/count", authorize("customer"), getCartCount); 

// GET: Get cart details -> customer only
cartRouter.get("/items", authorize("customer"), getCartItems); 

// POST: Add product to cart -> customer only
cartRouter.post("/", authorize("customer"), addToCart);

// PATCH: Update cart quantity -> customer only
cartRouter.patch("/quantity", authorize("customer"), updateCartQuantity);

// DELETE: Remove product from cart -> customer only
cartRouter.delete("/", authorize("customer"), removeFromCart);

export default cartRouter;