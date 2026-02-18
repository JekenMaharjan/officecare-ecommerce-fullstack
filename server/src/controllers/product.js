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

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.path; // path of uploaded image

        const product = new Product({ name, description, price, image });
        await product.save();

        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};