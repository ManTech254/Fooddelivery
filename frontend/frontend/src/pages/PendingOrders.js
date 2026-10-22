import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import OrderCard from "../components/OrderCard";
import OrderList from "../components/OrderList";
import OrderDetailsModal from "../components/OrderDetailsModal";
import OrderViewToggle from "../components/OrderViewToggle";
import adminApi from "../utils/AdminApi";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import OrderFilters from "../components/OrderFilters";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  
  const [view, setView] = useState("cards");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await adminApi(
        "http://127.0.0.1:8000/api/orders/?status=pending"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pending orders");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.results)) {
        setOrders(data.results);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching pending orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmOrder = async (id) => {
    try {
      const response = await adminApi(
        `http://127.0.0.1:8000/api/orders/${id}/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "confirmed",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to confirm order");
      }

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );

      setSelectedOrder(null);
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm order. Please try again.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      String(order.id)
        .toLowerCase()
        .includes(search) ||
      (order.customer_name || "")
        .toLowerCase()
        .includes(search) ||
      (order.phone_number || "")
        .toLowerCase()
        .includes(search) ||
      (order.address || "")
        .toLowerCase()
        .includes(search);

    const matchesPayment =
      paymentFilter === "all" ||
      (order.payment_method || "").toLowerCase() ===
        paymentFilter.toLowerCase();

    let matchesDate = true;

    if (dateFilter !== "all" && order.creation_date) {
      const orderDate = new Date(order.creation_date);
      const now = new Date();

      if (dateFilter === "today") {
        matchesDate =
          orderDate.toDateString() === now.toDateString();
      }

      if (dateFilter === "7days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);

        matchesDate = orderDate >= sevenDaysAgo;
      }

      if (dateFilter === "30days") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        matchesDate = orderDate >= thirtyDaysAgo;
      }
    }
    
    return (
      matchesSearch &&
      matchesPayment &&
      matchesDate
    );
  });
  const paymentMethods = [
  ...new Set(
    orders
      .map((order) => order.payment_method)
      .filter(Boolean)
  ),
];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Pending Orders
          </h2>

          <p className="text-muted mb-0">
            Manage customer pending orders
          </p>
        </div>

        <div className="badge bg-warning text-dark p-3 fs-6 rounded-pill">
          {orders.length} Pending
        </div>
      </div>

      {/* Controls */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body">

          <div className="row g-3 align-items-center">

            {/* Search */}
            {/* Filters */}
<OrderFilters
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  paymentFilter={paymentFilter}
  setPaymentFilter={setPaymentFilter}
  dateFilter={dateFilter}
  setDateFilter={setDateFilter}
  paymentMethods={paymentMethods}
  onClear={() => {
    setSearchTerm("");
    setPaymentFilter("all");
    setDateFilter("all");
  }}
/>

{/* View Controls */}
<div className="d-flex justify-content-between align-items-center mb-4">

    <div>
      <span className="text-muted">
        Showing{" "}
        <strong className="text-dark">
          {filteredOrders.length}
        </strong>{" "}
        of{" "}
        <strong className="text-dark">
          {orders.length}
        </strong>{" "}
        orders
      </span>
    </div>

    <div className="d-flex gap-2">

      <button
        className="btn btn-outline-secondary rounded-pill"
        onClick={fetchOrders}
        title="Refresh orders"
      >
        <FaSyncAlt className="me-2" />
        Refresh
      </button>

      <OrderViewToggle
        view={view}
        setView={setView}
      />

    </div>

  </div>

            
            

          </div>

        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
          <div
            className="spinner-border text-warning mb-3"
            role="status"
          />

          <h5 className="fw-bold">
            Loading pending orders...
          </h5>

          <p className="text-muted mb-0">
            Please wait while we fetch the orders.
          </p>
        </div>
      ) : filteredOrders.length === 0 ? (

        /* Empty */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

          <h4 className="fw-bold text-muted">
            {searchTerm
              ? "No matching orders"
              : "No pending orders"}
          </h4>

          <p className="text-secondary mb-0">
            {searchTerm
              ? "Try a different search term."
              : "New pending customer orders will appear here."}
          </p>

        </div>

      ) : (

        /* Orders */
        <>
          {view === "cards" ? (
            <div className="row">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  status="pending"
                  onViewDetails={setSelectedOrder}
                  onConfirm={confirmOrder}
                />
              ))}
            </div>
          ) : (
            <OrderList
              orders={filteredOrders}
              status="pending"
              onViewDetails={setSelectedOrder}
              onConfirm={confirmOrder}
            />
          )}
        </>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </AdminLayout>
  );
};

export default PendingOrders;