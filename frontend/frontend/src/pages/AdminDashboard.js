import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaShoppingBag,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaUtensils,
  FaSyncAlt,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import OrderDetailsModal from "../components/OrderDetailsModal";
import { FaEye } from "react-icons/fa";
import adminApi from "../utils/AdminApi";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesPeriod, setSalesPeriod] = useState("7days");
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(null);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);

      const response = await adminApi(
        "http://127.0.0.1:8000/api/users/"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.results)) {
        setUsers(data.results);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const response = await adminApi(
        "http://127.0.0.1:8000/api/orders/"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard orders");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.results)) {
        setOrders(data.results);
      } else {
        setOrders([]);
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchDashboardData();
    fetchUsers();
  }, []);
  
  // Calculate dashboard statistics
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      (order.status || "").toLowerCase() === "pending"
  ).length;


  const confirmedOrders = orders.filter(
    (order) =>
      (order.status || "").toLowerCase() === "confirmed"
  ).length;

  const revenue = orders
    .filter(
      (order) =>
        (order.status || "").toLowerCase() === "confirmed"
    )
    .reduce(
      (total, order) =>
        total + Number(order.total_amount || 0),
      0
    );
    
    const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.creation_date) -
        new Date(a.creation_date)
    )
    .slice(0, 5);

    const getSalesData = () => {
  const today = new Date();

  let days = 7;

  if (salesPeriod === "30days") {
    days = 30;
  }

  if (salesPeriod === "year") {
    days = 12;
  }

  const data = [];

  if (salesPeriod === "year") {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        1
      );

      const month = date.getMonth();
      const year = date.getFullYear();

      const revenue = orders
        .filter((order) => {
          if (
            (order.status || "").toLowerCase() !==
            "confirmed"
          ) {
            return false;
          }

          if (!order.creation_date) {
            return false;
          }

          const orderDate = new Date(order.creation_date);

          return (
            orderDate.getMonth() === month &&
            orderDate.getFullYear() === year
          );
        })
        .reduce(
          (total, order) =>
            total + Number(order.total_amount || 0),
          0
        );

      data.push({
        date: date.toLocaleDateString("en-KE", {
          month: "short",
        }),
        revenue,
      });
    }

    return data;
  }

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    const dateKey = date.toDateString();

    const revenue = orders
      .filter((order) => {
        if (
          (order.status || "").toLowerCase() !==
          "confirmed"
        ) {
          return false;
        }

        if (!order.creation_date) {
          return false;
        }

        return (
          new Date(order.creation_date).toDateString() ===
          dateKey
        );
      })
      .reduce(
        (total, order) =>
          total + Number(order.total_amount || 0),
        0
      );

    data.push({
      date:
        salesPeriod === "7days"
          ? date.toLocaleDateString("en-KE", {
              weekday: "short",
            })
          : date.toLocaleDateString("en-KE", {
              day: "numeric",
              month: "short",
            }),
      revenue,
    });
  }

  return data;
};

const salesData = getSalesData();

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaShoppingBag />,
      color: "primary",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <FaClock />,
      color: "warning",
    },
    {
      title: "Confirmed Orders",
      value: confirmedOrders,
      icon: <FaCheckCircle />,
      color: "success",
    },
    {
      title: "Revenue",
      value: `KES ${revenue.toLocaleString()}`,
      icon: <FaMoneyBillWave />,
      color: "dark",
    },
    {
      title: "Total Users",
      value: usersLoading ? "..." : users.length,
      icon: <FaUsers />,
      color: "info",
    },
  ];

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold">
            Admin Dashboard 👋
          </h2>

          <p className="text-muted mb-0">
            Welcome back. Monitor your food ordering system here.
          </p>
        </div>

        <button
          className="btn btn-outline-secondary rounded-pill"
          onClick={fetchDashboardData}
          disabled={loading}
        >
          <FaSyncAlt
            className={`me-2 ${
              loading ? "fa-spin" : ""
            }`}
          />
          Refresh
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center mb-4">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          />

          <h5 className="fw-bold">
            Loading dashboard...
          </h5>

          <p className="text-muted mb-0">
            Fetching the latest order statistics.
          </p>
        </div>
      ) : (
        <>
          {/* STATISTICS */}
          <div className="row">
            {stats.map((stat, index) => (
              <div
                className="col-md-6 col-lg-3 mb-4"
                key={index}
              >
                <div
                  className={`card border-0 shadow-lg dashboard-card bg-${stat.color} text-white`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-2">
                          {stat.title}
                        </h6>

                        <h3 className="fw-bold mb-0">
                          {stat.value}
                        </h3>
                      </div>

                      <div className="dashboard-icon">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div className="row">

            {/* RECENT ORDERS */}
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-bold mb-1">
                        Recent Orders
                      </h5>

                      <small className="text-muted">
                        Latest customer orders
                      </small>
                    </div>

                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                      Latest 5
                    </span>
                  </div>

                  {recentOrders.length === 0 ? (
                    <div className="text-center py-5">
                      <FaShoppingBag
                        className="text-muted mb-3"
                        size={35}
                      />

                      <h6 className="fw-bold">
                        No orders yet
                      </h6>

                      <p className="text-muted mb-0">
                        Recent customer orders will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">
                          <tr>
                            <th>Order</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th className="text-end">
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id}>

                              <td>
                                <strong>
                                  #{order.id}
                                </strong>

                                <div className="small text-muted">
                                  {order.creation_date
                                    ? new Date(
                                        order.creation_date
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </div>
                              </td>

                              <td>
                                <strong>
                                  {order.customer_name ||
                                    "Unknown Customer"}
                                </strong>

                                <div className="small text-muted">
                                  {order.phone_number || "No phone"}
                                </div>
                              </td>

                              <td>
                                <span
                                  className={`badge rounded-pill ${
                                    order.status === "pending"
                                      ? "bg-warning text-dark"
                                      : order.status === "confirmed"
                                      ? "bg-success"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {order.status
                                    ? order.status
                                        .charAt(0)
                                        .toUpperCase() +
                                      order.status.slice(1)
                                    : "Unknown"}
                                </span>
                              </td>

                              <td>
                                <strong className="text-success">
                                  KES{" "}
                                  {Number(
                                    order.total_amount || 0
                                  ).toLocaleString()}
                                </strong>
                              </td>

                              <td className="text-end">
                                <button
                                  className="btn btn-sm btn-outline-dark rounded-pill"
                                  onClick={() =>
                                    setSelectedOrder(order)
                                  }
                                  title="View order details"
                                >
                                  <FaEye />
                                </button>
                              </td>

                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">
                    Quick Actions
                  </h5>

                  <button
                    className="btn btn-dark w-100 mb-3 rounded-pill"
                    onClick={() => navigate("/admin-add-food")}
                  >
                    <FaUtensils className="me-2" />
                    Add Food Item
                  </button>

                  <button
                    className="btn btn-success w-100 mb-3 rounded-pill"
                    onClick={() => navigate("/Admin_Pending_Orders")}
                  >
                    <FaShoppingBag className="me-2" />
                    View Orders
                  </button>

                  <button
                    className="btn btn-primary w-100 rounded-pill"
                    onClick={() => navigate("/admin-users")}
                  >
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

              <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                <div>
                  <h5 className="fw-bold mb-1">
                    Sales Overview
                  </h5>

                  <p className="text-muted mb-0">
                    Confirmed revenue performance
                  </p>
                </div>

                <select
                  className="form-select"
                  style={{ width: "180px" }}
                  value={salesPeriod}
                  onChange={(e) => setSalesPeriod(e.target.value)}
                >
                  <option value="7days">
                    Last 7 Days
                  </option>

                  <option value="30days">
                    Last 30 Days
                  </option>

                  <option value="year">
                    This Year
                  </option>
                </select>
              </div>

              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={salesData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="date"
                    />

                    <YAxis
                      tickFormatter={(value) =>
                        `KES ${value.toLocaleString()}`
                      }
                    />

                    <Tooltip
                      formatter={(value) => [
                        `KES ${Number(value).toLocaleString()}`,
                        "Revenue",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#20b2a6"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />

                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>
        </>
      )}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;