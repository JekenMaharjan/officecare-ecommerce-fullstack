import Order from "../models/order.js";
import Cart from "../models/cart.js";

// GET /api/orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product", "name price");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==========================================================================

// PUT /api/orders/:id
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};          

// ==========================================================================

// POST /api/orders/createOrder
export const createOrder = async (req, res) => {
    try {
        const { fullName, phone, shippingAddress } = req.body;

        console.log("USER ID:", req.user._id);
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        console.log("CART FOUND:", cart);

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalAmount = cart.items.reduce(
            (acc, item) =>
                acc + item.product.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: req.user._id,
            fullName,
            phone,
            shippingAddress,
            products: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount,
            status: "Pending"
        });

        // Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==========================================================================