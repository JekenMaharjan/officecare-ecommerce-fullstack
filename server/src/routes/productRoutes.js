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

// =================================================================================================

// Protect all order routes
productRouter.use(authMiddleware);

// =================================================================================================

// PRODUCT ROUTES

// GET: Get all products -> admin + customer
productRouter.get('/', authMiddleware, authorize("admin", "customer"), getAllProducts);

// GET: Get single product -> admin + customer
productRouter.get('/:id', authMiddleware, authorize("admin", "customer"), getProductById);

// POST: Create product -> admin only
productRouter.post('/', authMiddleware, authorize("admin"), upload.single('image'), createProduct);

// PUT: Update product -> admin only
productRouter.put('/:id', authMiddleware, authorize("admin"), upload.single('image'), updateProduct);

// DELETE: Delete product -> admin only
productRouter.delete('/:id', authMiddleware, authorize("admin"), deleteProduct);

export default productRouter;