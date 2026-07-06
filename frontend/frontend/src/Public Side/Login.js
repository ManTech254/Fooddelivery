import React, { useState } from "react";
import axios from "axios";
import "../pages/styles/auth.css";
import deliveryImg from "../assets/delivery.avif";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/customer-login/",
        formData,
      );

      localStorage.setItem("token", res.data.access);
      alert("Login successful");
    } catch (err) {
      console.log("Login Error:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT - FORM */}
      <div className="auth-form">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue ordering your favorite food</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>

      {/* RIGHT - IMAGE */}
      <div className="auth-image">
        <img src={deliveryImg} alt="Delivery" />

        <h3>Fast Delivery 🚀</h3>
        <p>We deliver your food hot & fresh to your doorstep</p>
      </div>
    </div>
  );
};

export default Login;
