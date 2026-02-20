import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
    
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;