import mongoose from "mongoose";

const { Schema } = mongoose;

// Define product schema
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
}, { timestamps: true });

// Create model
const Product = mongoose.model('Product', productSchema);

export default Product;