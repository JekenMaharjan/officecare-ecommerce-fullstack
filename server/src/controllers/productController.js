import Product from "../models/product.js";
import path from "path";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const formatted = products.map((product) => ({
            ...product._doc,
            image: product.image ? `/uploads/${product.image}` : null,
        }));

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        res.json({
            ...product._doc,
            image: product.image ? `/uploads/${product.image}` : null,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        if (!name || !description || !price || !stock)
            return res.status(400).json({ message: "All fields are required" });

        if (!req.file)
            return res.status(400).json({ message: "Product image is required" });

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image: req.file ? req.file.filename : null
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        const updateData = { name, description, price, stock };

        if (req.file) {
            updateData.image = req.file ? req.file.filename : null
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { returnDocument: "after" } // modern mongoose
        );

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};