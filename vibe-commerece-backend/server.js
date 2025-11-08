import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.js";
import productRoutes from "./routes/products.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
