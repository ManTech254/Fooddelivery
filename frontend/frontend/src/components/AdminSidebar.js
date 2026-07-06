import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/styles/admin.css";
import {
  FaTachometerAlt,
  FaUserFriends,
  FaListAlt,
  FaPlus,
  FaEdit,
  FaUtensils,
  FaSearch,
  FaStar,
  FaSignOutAlt,
  FaChevronDown,
  FaShoppingBag,
  FaCheckCircle,
  FaClock,
  FaChartBar,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const Sidebar = ({ showSidebar }) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openFood, setOpenFood] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  return (
    <div
      className={`bg-dark text-white sidebar d-flex flex-column ${
        showSidebar ? "active" : ""
      }`}
    >
      {/* Profile */}
      <div className="text-center p-3">
        <img src="/images/admin.png" alt="Admin" className="profile-img mb-2" />
        <h6 className="mb-0">Admin</h6>
        <small className="text-light">Administrator</small>
      </div>

      {/* Menu */}
      <div className="list-group flex-grow-1 px-2">
        {/* Dashboard */}
        <Link to="/admin-dashboard" className="list-group-item">
          <FaTachometerAlt className="me-2" /> Dashboard
        </Link>

        {/* Users */}
        <Link to="/admin-users" className="list-group-item">
          <FaUserFriends className="me-2" /> Reg Users
        </Link>

        {/* FOOD CATEGORIES */}
        <div
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={() => setOpenCategory(!openCategory)}
        >
          <span>
            <FaListAlt className="me-2" /> Food Categories
          </span>
          <FaChevronDown
            style={{
              transform: openCategory ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </div>

        {openCategory && (
          <div className="submenu">
            <Link to="/admin-add-category" className="list-group-item ps-4">
              <FaPlus className="me-2" /> Add Category
            </Link>

            <Link to="/admin-manage-category" className="list-group-item ps-4">
              <FaEdit className="me-2" /> Manage Category
            </Link>
          </div>
        )}

        {/* FOOD ITEMS */}
        <div
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={() => setOpenFood(!openFood)}
        >
          <span>
            <FaUtensils className="me-2" /> Food Items
          </span>
          <FaChevronDown
            style={{
              transform: openFood ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </div>

        {openFood && (
          <div className="submenu">
            <Link to="/admin-add-food" className="list-group-item ps-4">
              <FaPlus className="me-2" /> Add Food Item
            </Link>

            <Link to="/admin-manage-food" className="list-group-item ps-4">
              <FaEdit className="me-2" /> Manage Food Items
            </Link>
          </div>
        )}

        {/* ORDERS */}
        <div
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={() => setOpenOrders(!openOrders)}
        >
          <span>
            <FaShoppingBag className="me-2" /> Orders
          </span>

          <FaChevronDown
            style={{
              transform: openOrders ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </div>

        {openOrders && (
          <div className="submenu">
            <Link to="/Admin_Confirmed_Orders" className="list-group-item ps-4">
              <FaCheckCircle className="me-2" />
              Confirmed Orders
            </Link>

            <Link to="/Admin_Pending_Orders" className="list-group-item ps-4">
              <FaClock className="me-2" />
              Pending Orders
            </Link>
          </div>
        )}

        {/* REPORTS */}
        <div
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={() => setOpenReports(!openReports)}
        >
          <span>
            <FaChartBar className="me-2" /> Reports
          </span>

          <FaChevronDown
            style={{
              transform: openReports ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </div>

        {openReports && (
          <div className="submenu">
            <Link to="/Admin-DailyReports" className="list-group-item ps-4">
              <FaCalendarDay className="me-2" />
              Daily Reports
            </Link>

            <Link to="/Admin-WeeklyReports" className="list-group-item ps-4">
              <FaCalendarWeek className="me-2" />
              Weekly Reports
            </Link>

            <Link to="/Admin-MonthlyReports" className="list-group-item ps-4">
              <FaCalendarAlt className="me-2" />
              Monthly Reports
            </Link>

            <Link to="/admin-SalesReports" className="list-group-item ps-4">
              <FaMoneyBillWave className="me-2" />
              Sales Reports
            </Link>
          </div>
        )}

        {/* Other */}
        <Link to="/admin-search" className="list-group-item">
          <FaSearch className="me-2" /> Search
        </Link>

        <Link to="/admin-reviews" className="list-group-item">
          <FaStar className="me-2" /> Manage Reviews
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
