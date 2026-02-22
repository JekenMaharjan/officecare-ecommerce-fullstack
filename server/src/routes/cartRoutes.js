import express from "express"
import { authMiddleware } from "../middlewares/auth.js";
import {
    addToCart,
    getCartCount,
    getCartItems,
    removeFromCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.use(authMiddleware); // protect all cart routes

cartRouter.get("/count", getCartCount); // Get cart count

cartRouter.post("/", addToCart);           // Add product
cartRouter.get("/items", getCartItems);         // Get cart details
cartRouter.delete("/", removeFromCart);    // Remove product

export default cartRouter;