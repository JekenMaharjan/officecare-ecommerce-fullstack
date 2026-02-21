import Cart from "../models/cart.js";

// Add a product to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create cart if it doesn't exist
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }],
            });
            return res.status(200).json(cart);
        }

        // Check if product already in cart
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Product exists → update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new product
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: "Failed to add to cart" });
    }
};

// Get cart count
export const getCartCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId });

        const count = cart
            ? cart.items.reduce((acc, item) => acc + item.quantity, 0)
            : 0;

        res.status(200).json({ count });
    } catch (error) {
        console.error("Cart count error:", error);
        res.status(500).json({ count: 0 });
    }
};

// Get all cart items
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        res.status(200).json(cart || { items: [] });
    } catch (error) {
        console.error("Get cart items error:", error);
        res.status(500).json({ items: [] });
    }
};

// Remove a product from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({ message: "Failed to remove from cart" });
    }
};