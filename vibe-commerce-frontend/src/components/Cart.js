import React, { useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, refreshCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState(null);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
    0
  );

  const handleCheckout = async () => {
    if (!name || !email) {
      setMessage("Name and email are required.");
      return;
    }

    const cartItems = cart.map((item) => ({
      id: Number(item.id),
      name: item.name,
      price: Number(item.price),
      qty: Number(item.qty),
      image: item.image,
    }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/checkout",
        { cartItems, name, email }
      );

      if (response.data.success) {
        setReceipt(response.data.receipt);
        setMessage("✅ Checkout successful!");
        setName("");
        setEmail("");
        refreshCart();
      }
    } catch (err) {
      // Silently ignore errors
      console.log("Checkout error:", err);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      {message && <p className="message">{message}</p>}

      {cart.length === 0 && !receipt ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price} × {item.qty}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <h3>Total: ${total.toFixed(2)}</h3>

            <div className="checkout-form">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {receipt && (
        <div className="receipt-modal">
          <div className="receipt-content">
            <h3>Receipt ✅</h3>
            <p><strong>Name:</strong> {receipt.name}</p>
            <p><strong>Email:</strong> {receipt.email}</p>
            <p><strong>Total:</strong> ${receipt.total}</p>
            <p><strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
            <h4>Items:</h4>
            <ul>
              {receipt.cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.qty} → ${item.price * item.qty}
                </li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setReceipt(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
