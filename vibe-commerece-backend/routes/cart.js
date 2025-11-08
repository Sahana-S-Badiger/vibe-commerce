import express from "express";
const router = express.Router();

let cart = [];

// POST /api/cart → add item
router.post("/", (req, res) => {
  const { productId, qty, name, price, image } = req.body;

  const id = Number(productId);
  const quantity = Number(qty);
  const itemPrice = Number(price);

  if (!id || !quantity) return res.status(400).json({ error: "productId and qty required" });

  const existing = cart.find((item) => item.id === id);
  if (existing) existing.qty += quantity;
  else cart.push({ id, qty: quantity, name, price: itemPrice, image });

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ success: true, cart, total });
});

// GET /api/cart → get cart
router.get("/", (req, res) => {
  const total = cart.reduce((sum, i) => sum + Number(i.price) * Number(i.qty), 0);
  res.json({ cart, total });
});

// DELETE /api/cart/:id → remove item
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  cart = cart.filter((item) => item.id !== id);
  const total = cart.reduce((sum, i) => sum + Number(i.price) * Number(i.qty), 0);
  res.json({ success: true, cart, total });
});

// POST /api/cart/checkout → mock checkout
router.post("/checkout", (req, res) => {
  const { cartItems, name, email } = req.body;

  if (!cartItems || cartItems.length === 0) return res.status(400).json({ error: "Cart is empty" });
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  const total = cartItems.reduce((sum, i) => sum + Number(i.price) * Number(i.qty), 0);
  const timestamp = new Date().toISOString();

  res.json({
    success: true,
    receipt: {
      name,
      email,
      cartItems,
      total,
      timestamp,
    },
  });

  // clear cart after checkout
  cart = [];
});

export default router;
