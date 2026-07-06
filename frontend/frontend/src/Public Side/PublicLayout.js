import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FloatingCart from "./FloatingCart";
import { CartContext } from "../context/CartContext";
import {
  FaHome,
  FaUtensils,
  FaTruck,
  FaUser,
  FaUserShield,
  FaUserPlus,
  FaShoppingCart,
} from "react-icons/fa";

const PublicLayout = ({ children }) => {
  const { cartItems } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    window.location.href = "/";
  };
  return (
    <div>
      {/* Navbar */}
      <nav
        className="
    navbar
    navbar-expand-lg
    navbar-dark
    bg-danger
    sticky-top
    shadow-sm
    py-3
  "
      >
        <div className="container ">
          {/* Logo */}
          <Link className="navbar-brand fw-bold" to="/">
            Food Ordering
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {/* Home */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome className="me-1" />
                  Home
                </Link>
              </li>

              {/* Menu */}
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  <FaUtensils className="me-1" />
                  Menu
                </Link>
              </li>

              {/* Track Order */}
              <li className="nav-item">
                <Link className="nav-link" to="/track-order">
                  <FaTruck className="me-1" />
                  Track
                </Link>
              </li>

              {/* Cart */}
              <li className="nav-item me-lg-3">
                <Link className="nav-link position-relative" to="/cart">
                  <FaShoppingCart className="me-1" />
                  Cart
                  {/* Badge */}
                  <span
                    className="
                        position-absolute
                        top-0
                        start-100
                        translate-middle
                        badge
                        rounded-pill
                        bg-warning
                        text-dark
                    "
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
              </li>

              {/* Login */}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <FaUser className="me-1" />
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <FaUserPlus className="me-1" />
                      Register
                    </Link>
                  </li>
                </>
              )}

              {/* Admin */}
              {(!isLoggedIn || user?.role === "admin") && (
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <Link to="/admin-login" className="btn btn-dark">
                    <FaUserShield className="me-1" />
                    Admin
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <FaUser className="me-1" />
                    {user.username}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
      <FloatingCart />

      {/* Footer */}
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container text-center">
          <h5 className="fw-bold">Food Ordering System</h5>

          <p className="mb-0">© 2026 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
