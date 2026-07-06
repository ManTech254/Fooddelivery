import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const ConfirmedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH CONFIRMED ORDERS
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/orders/?status=confirmed",
      );

      setOrders(response.data);
    } catch (error) {
      console.log("Error fetching confirmed orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center mt-5">
          <h4>Loading confirmed orders...</h4>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Confirmed Orders</h2>

          <p className="text-muted">Successfully confirmed customer orders</p>
        </div>

        <div className="badge bg-success p-3 fs-6">
          {orders.length} Confirmed
        </div>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
          <h4 className="text-muted">No confirmed orders yet</h4>

          <p className="text-secondary">
            Confirmed customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card border-0 shadow-lg rounded-4 h-100">
                <div className="card-body">
                  {/* TOP */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Order #{order.id}</h5>

                    <span className="badge bg-success">Confirmed</span>
                  </div>

                  {/* CUSTOMER */}
                  <div className="mb-3">
                    <h6 className="fw-bold">{order.customer_name}</h6>

                    <p className="text-muted mb-1">📞 {order.phone_number}</p>

                    <p className="text-muted">📍 {order.address}</p>
                  </div>

                  {/* PAYMENT */}
                  <div className="mb-3">
                    <p className="mb-1">
                      <strong>Payment:</strong> {order.payment_method}
                    </p>

                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(order.creation_date).toLocaleString()}
                    </p>
                  </div>

                  {/* ITEMS */}
                  <div className="mb-3">
                    <h6 className="fw-bold">Ordered Items</h6>

                    <ul className="list-group">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{item.food_name || item.food}</strong>
                          </div>

                          <div>x{item.quantity}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TOTAL */}
                  <div className="mt-4 text-end">
                    <h4 className="text-success fw-bold">
                      KES {order.total_amount}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ConfirmedOrders;
