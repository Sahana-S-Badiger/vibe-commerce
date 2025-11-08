import React from "react";
import "./Navbar.css";

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Vibe Commerce" />
        <h1>Vibe Commerce</h1>
      </div>
      <div className="search-cart">
        <input type="text" placeholder="Search products..." className="search-bar"/>
        <div className="cart">
          Cart: <span>{cartCount}</span>
        </div>
      </div>
    </nav>
  );
}
