import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct 
} from '../controllers/productController.js';

const productRouter = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Product routes
productRouter.post('/', upload.single('image'), createProduct);   // POST /api/products
productRouter.get('/', getAllProducts);                           // GET /api/products
productRouter.get('/:id', getProductById);                        // GET /api/products/:id
productRouter.delete('/:id', deleteProduct);                      // DELETE /api/products/:id
productRouter.put('/:id', upload.single('image'), updateProduct); // PUT /api/products/:id

export default productRouter;