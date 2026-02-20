import jwt from "jsonwebtoken";

// 1️⃣ Auth middleware: protects routes
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // get token after "Bearer "
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// 2️⃣ Admin middleware: allows only admin access
export const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};