import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupForm.css";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    setError("");
    setSubmitted(true);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="signup-container">
      {!submitted ? (
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          {error && <p className="error">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <div className="thankyou-message">
          <h2>🎉 Thank You for Signing Up!</h2>
          <p>Welcome to <strong>Vibe Commerce</strong>. You can now explore our products!</p>
          <Link to="/" className="back-home">Go Shopping 🛍️</Link>
        </div>
      )}
    </div>
  );
}
