import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../pages/styles/auth.css";
import deliveryImg from "../assets/delivery.avif";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD CHECK
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      alert("Registration successful");

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT */}
      <div className="auth-form">
        <h2>Create Account 🍔</h2>

        <p>Join us and enjoy delicious meals delivered fast</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            placeholder="07xxxxxxxx"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <p className="mt-3">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>

      {/* RIGHT */}
      <div className="auth-image">
        <img src={deliveryImg} alt="Delivery" />

        <h3>Fast Food Delivery 🚀</h3>

        <p>Fresh meals delivered straight to your doorstep</p>
      </div>
    </div>
  );
};

export default Register;
