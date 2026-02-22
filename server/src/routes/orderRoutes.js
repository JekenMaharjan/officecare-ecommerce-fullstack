import express from "express"
import { authMiddleware } from "../middlewares/auth.js";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.use(authMiddleware); // protect all ordes routes

orderRouter.post("/createOrder", createOrder); // Create order
orderRouter.get("/getAllOrders", getAllOrders); // Get all orders
orderRouter.put("/updateOrderStatus/:id", updateOrderStatus); // Update order status

export default orderRouter;