import express from 'express'
import connect from './db/connect.js'
import cors from 'cors'
import userRouter from './routes/user.js'
import productRouter from './routes/product.js';

import dotenv from "dotenv";
dotenv.config();

// const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // default port if env not set

// Connect to database
connect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(userRouter);
app.use(productRouter);

// Route to check server
app.get('/', (req, res) => {
    console.log("Hello World!!");      // logs on server
    res.send("Server is working!");    // sends response to browser
});

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
