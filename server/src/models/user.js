import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
    fullName: String, 
    email: String, 
    password: String, 
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer",
    },
}, { timestamps: true });

// Create model
const User = mongoose.model('User', userSchema);

export default User;