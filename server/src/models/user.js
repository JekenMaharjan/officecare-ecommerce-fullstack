import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
});

// create model
const User = mongoose.model('User', userSchema);

export default User;