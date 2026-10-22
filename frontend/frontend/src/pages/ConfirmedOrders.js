import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import OrderCard from "../components/OrderCard";
import OrderList from "../components/OrderList";
import OrderDetailsModal from "../components/OrderDetailsModal";
import OrderViewToggle from "../components/OrderViewToggle";
import adminApi from "../utils/AdminApi";
import { FaSearch, FaSyncAlt } from "react-icons/fa";

const ConfirmedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("cards");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await adminApi(
        "http://127.0.0.1:8000/api/orders/?status=confirmed"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch confirmed orders");
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
      console.error(
        "Error fetching confirmed orders:",
        error
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
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
        .includes(search)
    );
  });

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Confirmed Orders
          </h2>

          <p className="text-muted mb-0">
            View and manage successfully confirmed orders
          </p>
        </div>

        <div className="badge bg-success p-3 fs-6 rounded-pill">
          {orders.length} Confirmed
        </div>

      </div>

      {/* Controls */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body">

          <div className="row g-3 align-items-center">

            {/* Search */}
            <div className="col-lg-6">

              <div className="input-group">

                <span className="input-group-text bg-white">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by order ID, customer, phone or address..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

              </div>

            </div>

            {/* Controls */}
            <div className="col-lg-6 d-flex justify-content-lg-end">

              <div className="d-flex gap-2">

                <button
                  className="btn btn-outline-secondary"
                  onClick={fetchOrders}
                  title="Refresh orders"
                >
                  <FaSyncAlt className="me-1" />
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
            className="spinner-border text-success mb-3"
            role="status"
          />

          <h5 className="fw-bold">
            Loading confirmed orders...
          </h5>

          <p className="text-muted mb-0">
            Please wait while we fetch the orders.
          </p>

        </div>

      ) : filteredOrders.length === 0 ? (

        /* Empty State */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

          <h4 className="fw-bold text-muted">
            {searchTerm
              ? "No matching orders"
              : "No confirmed orders"}
          </h4>

          <p className="text-secondary mb-0">
            {searchTerm
              ? "Try a different search term."
              : "Confirmed customer orders will appear here."}
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
                  status="confirmed"
                  onViewDetails={setSelectedOrder}
                />
              ))}

            </div>

          ) : (

            <OrderList
              orders={filteredOrders}
              status="confirmed"
              onViewDetails={setSelectedOrder}
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

export default ConfirmedOrders;