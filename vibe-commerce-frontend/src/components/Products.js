import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // Search query
  const [showTopBtn, setShowTopBtn] = useState(false); // Back to top button

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

    // Show back-to-top button on scroll
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["Clothes", "Footwear", "Accessories"];

  // Highlight matched text
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <div className="products-page">
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      {categories.map((category) => {
        const filtered = products.filter(
          (p) =>
            p.category === category &&
            p.name.toLowerCase().includes(search.toLowerCase())
        );

        if (filtered.length === 0) return null;

        return (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="product-grid">
              {filtered.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{highlightText(product.name, search)}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
};

export default Products;
