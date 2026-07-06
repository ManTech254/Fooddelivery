import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/orders/?status=pending",
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmOrder = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/orders/${id}/`, {
        status: "confirmed",
      });

      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Pending Orders</h2>

          <p className="text-muted">Manage customer pending orders</p>
        </div>

        <div className="badge bg-warning text-dark p-3">
          {orders.length} Pending
        </div>
      </div>

      {/* ORDERS */}
      <div className="row">
        {orders.map((order) => (
          <div className="col-md-6 col-lg-4 mb-4" key={order.id}>
            <div className="card border-0 shadow-lg h-100 rounded-4">
              <div className="card-body">
                {/* TOP */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold">#{order.id}</h5>

                  <span className="badge bg-warning text-dark">Pending</span>
                </div>

                {/* CUSTOMER */}
                <h6 className="fw-bold">{order.customer_name}</h6>

                <p className="text-muted mb-1">📞 {order.phone_number}</p>

                <p className="text-muted">📍 {order.address}</p>

                {/* ITEMS */}
                <div className="mt-3">
                  <h6 className="fw-bold">Order Items</h6>

                  <ul className="list-group">
                    {order.items.map((item) => (
                      <li
                        className="list-group-item d-flex justify-content-between"
                        key={item.id}
                      >
                        <span>{item.food_name}</span>

                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* TOTAL */}
                <div className="mt-3">
                  <h5 className="text-success fw-bold">
                    KES {order.total_amount}
                  </h5>
                </div>

                {/* BUTTON */}
                <button
                  className="btn btn-success w-100 mt-3 rounded-pill"
                  onClick={() => confirmOrder(order.id)}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default PendingOrders;
