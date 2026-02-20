import Product from '../models/product.js';

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithUrls = products.map(product => {
            return {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image ? `/uploads/${product.image.split("\\").pop()}` : null,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            };
        });

        res.status(200).json(productsWithUrls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.image ? `/uploads/${product.image.split("\\").pop()}` : null,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        // Basic validation
        if (!name || !description || !price || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image: req.file.path,
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

// Delete selected product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

// Update selected product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        const updateData = { name, description, price, stock };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};