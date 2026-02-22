import Cart from "../models/cart.js";
import Product from "../models/product.js";

// Add a product to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        // Fetch product to check stock
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found!" });
        if (product.stock < quantity) return res.status(400).json({ message: "Not enough stock!" });

        // Update stock
        product.stock -= quantity;
        await product.save();

        // Fetch user cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create cart if it doesn't exist
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }],
            });
            return res.status(200).json({ cart, updatedStock: product.stock });
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

        // Return updated cart and stock
        res.status(200).json({ cart, updatedStock: product.stock });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: "Failed to add to cart" });
    }
};

// ====================================================================================================

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

// ===============================================================================================

// Decrease quantity by 1
export const removeOneFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        // Decrease quantity by 1
        cart.items[itemIndex].quantity -= 1;

        // Remove if quantity <= 0
        if (cart.items[itemIndex].quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();

        // Optional: increase product stock
        await Product.findByIdAndUpdate(productId, { $inc: { stock: 1 } });

        res.status(200).json(cart);
    } catch (error) {
        console.error("Remove one from cart error:", error);
        res.status(500).json({ message: "Failed to remove one from cart" });
    }
};

// ===============================================================================================

// Remove a product from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Remove product from cart
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        // Increase product stock
        const product = await Product.findById(productId);
        if (product) {
            product.stock += quantity;
            await product.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({ message: "Failed to remove from cart" });
    }
};