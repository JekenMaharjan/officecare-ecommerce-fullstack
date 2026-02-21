import express from "express";
import connect from "./db/connect.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to DB
connect();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes with proper paths
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

// Root test route
app.get("/", (req, res) => {
    console.log("Hello World!!");
    res.send("Server is working!");
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});