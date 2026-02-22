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
import { authMiddleware, authorize } from '../middlewares/auth.js';

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

// CREATE product → admin only
productRouter.post('/', authMiddleware, authorize("admin"), upload.single('image'), createProduct);

// READ all products → admin + customer
productRouter.get('/', authMiddleware, authorize("admin", "customer"), getAllProducts);

// READ single product → admin + customer
productRouter.get('/:id', authMiddleware, authorize("admin", "customer"), getProductById);

// DELETE product → admin only
productRouter.delete('/:id', authMiddleware, authorize("admin"), deleteProduct);

// UPDATE product → admin only
productRouter.put('/:id', authMiddleware, authorize("admin"), upload.single('image'), updateProduct);

export default productRouter;