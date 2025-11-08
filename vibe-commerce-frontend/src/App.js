import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import SignupForm from "./components/SignupForm";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="navbar">
        <Link to="/" className="logo">
          🛍️ Vibe Commerce
        </Link>
        <div className="nav-links">
          <Link to="/">Shop</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/cart" className="cart-link">
            🛒 <span className="cart-count">{cart.length}</span>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
