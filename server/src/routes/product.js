import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createProduct, getAllProducts } from '../controllers/product.js';

const productRouter = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'src', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // create folder if not exists
}

// Make 'uploads' folder public
productRouter.use('/uploads', express.static(uploadsDir));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); // save images in src/uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});

const upload = multer({ storage });

// POST: Create product with image
productRouter.post('/products', upload.single('image'), createProduct);

// GET: Fetch all products
productRouter.get('/products', getAllProducts);

export default productRouter;
