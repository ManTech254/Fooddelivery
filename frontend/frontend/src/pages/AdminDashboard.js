import React from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaShoppingBag,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";

const AdminDashboard = () => {
  // TEMPORARY STATIC DATA
  // Later these will come from API

  const stats = [
    {
      title: "Total Orders",
      value: 120,
      icon: <FaShoppingBag />,
      color: "primary",
    },
    {
      title: "Pending Orders",
      value: 18,
      icon: <FaClock />,
      color: "warning",
    },
    {
      title: "Confirmed Orders",
      value: 92,
      icon: <FaCheckCircle />,
      color: "success",
    },
    {
      title: "Revenue",
      value: "KES 45,000",
      icon: <FaMoneyBillWave />,
      color: "dark",
    },
  ];

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Admin Dashboard 👋</h2>

          <p className="text-muted">
            Welcome back. Monitor your food ordering system here.
          </p>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="row">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-lg-3 mb-4" key={index}>
            <div
              className={`card border-0 shadow-lg dashboard-card bg-${stat.color} text-white`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-2">{stat.title}</h6>

                    <h3 className="fw-bold">{stat.value}</h3>
                  </div>

                  <div className="dashboard-icon">{stat.icon}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="row">
        {/* RECENT ACTIVITY */}
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Recent Activities</h5>

              <div className="activity-item">✅ New order confirmed</div>

              <div className="activity-item">
                🍔 Food item added successfully
              </div>

              <div className="activity-item">👤 New user registered</div>

              <div className="activity-item">📦 Pending order received</div>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Quick Actions</h5>

              <button className="btn btn-dark w-100 mb-3 rounded-pill">
                <FaUtensils className="me-2" />
                Add Food Item
              </button>

              <button className="btn btn-success w-100 mb-3 rounded-pill">
                <FaShoppingBag className="me-2" />
                View Orders
              </button>

              <button className="btn btn-primary w-100 rounded-pill">
                <FaUsers className="me-2" />
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SALES OVERVIEW */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Sales Overview</h5>

          <div className="sales-placeholder">
            <h1>📈</h1>

            <p className="text-muted">
              Sales charts and analytics will appear here.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
