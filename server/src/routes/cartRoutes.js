import express from "express"
import { authMiddleware } from "../middlewares/auth.js";
import {
    addToCart,
    getCartCount,
    getCartItems,
    removeFromCart,
    updateCartQuantity,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.use(authMiddleware); // protect all cart routes

cartRouter.get("/count", getCartCount); // Get cart count
cartRouter.get("/items", getCartItems); // Get cart details

cartRouter.post("/", addToCart); // Add product
cartRouter.patch("/quantity", updateCartQuantity); // update cart quantity
cartRouter.delete("/", removeFromCart); // Remove product

export default cartRouter;