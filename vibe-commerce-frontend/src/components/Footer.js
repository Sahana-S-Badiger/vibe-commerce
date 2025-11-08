import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>About Us</h3>
        <p>Vibe Commerce is your one-stop online shop.</p>
      </div>
      <div>
        <h3>Contact Us</h3>
        <p>Email: support@vibecommerce.com</p>
        <p>Phone: +123456789</p>
      </div>
      <div>
        <h3>Help</h3>
        <p>FAQs</p>
        <p>Shipping & Returns</p>
      </div>
    </footer>
  );
}
