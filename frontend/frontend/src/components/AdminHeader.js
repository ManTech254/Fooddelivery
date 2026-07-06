import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/styles/admin.css";
import {
  FaBars,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };

  return (
    <nav className="navbar navbar-expand-lg admin-navbar">
      {/* Mobile Sidebar Toggle */}
      <button className="btn btn-dark d-lg-none me-3" onClick={toggleSidebar}>
        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Brand */}
      <a className="navbar-brand fw-bold" href="/">
        Food Admin
      </a>

      {/* Navbar Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Content */}
      <div className="collapse navbar-collapse" id="adminNavbar">
        {/* Left side */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="/admin-dashboard">
              Dashboard
            </a>
          </li>
        </ul>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3">
          {/* Notification */}
          <div className="position-relative header-icon">
            <FaBell />

            <span className="notification-badge">3</span>
          </div>

          {/* Logout */}
          <button
            className="btn btn-danger d-flex align-items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
