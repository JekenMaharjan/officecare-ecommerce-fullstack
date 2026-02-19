import Product from '../models/product.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        // Optional: convert file path to URL so frontend can display image easily
        const productsWithUrls = products.map(product => {
            return {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: `/uploads/${product.image.replace(/\\/g, "/").split('/').pop()?.split(".")[0]}.png`,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            };
        });

        res.status(200).json(productsWithUrls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Basic validation
        if (!name || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const product = await Product.create({
            name,
            description,
            price,
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
