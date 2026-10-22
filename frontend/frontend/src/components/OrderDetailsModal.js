import React from "react";
import {
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) {
    return null;
  }

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.55)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 rounded-4 shadow-lg">

          <div className="modal-header border-0 px-4 pt-4">

            <div>
              <small className="text-muted">
                Order Details
              </small>

              <h4 className="fw-bold mb-0">
                Order #{order.id}
              </h4>
            </div>

            <button
              type="button"
              className="btn btn-light rounded-circle"
              onClick={onClose}
            >
              <FaTimes />
            </button>

          </div>

          <div className="modal-body px-4">

            <div className="mb-4">
              <span
                className={`badge rounded-pill px-3 py-2 ${
                  order.status === "pending"
                    ? "bg-warning text-dark"
                    : "bg-success"
                }`}
              >
                {order.status
                  ? order.status.charAt(0).toUpperCase() +
                    order.status.slice(1)
                  : "Order"}
              </span>
            </div>

            <div className="card border-0 bg-light rounded-4 mb-4">
              <div className="card-body">

                <h5 className="fw-bold mb-3">
                  Customer Information
                </h5>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <small className="text-muted">
                      Customer
                    </small>

                    <div className="fw-semibold">
                      {order.customer_name || "Unknown Customer"}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <small className="text-muted">
                      Phone
                    </small>

                    <div className="fw-semibold">
                      <FaPhone className="me-2" />
                      {order.phone_number || "N/A"}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <small className="text-muted">
                      Address
                    </small>

                    <div className="fw-semibold">
                      <FaMapMarkerAlt className="me-2" />
                      {order.address || "N/A"}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <small className="text-muted">
                      Date
                    </small>

                    <div className="fw-semibold">
                      <FaCalendarAlt className="me-2" />
                      {order.creation_date
                        ? new Date(
                            order.creation_date
                          ).toLocaleString()
                        : "N/A"}
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <div className="mb-4">

              <h5 className="fw-bold mb-3">
                Ordered Items
              </h5>

              <div className="list-group">

                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-end-0"
                  >

                    <div>
                      <strong>
                        {item.food_name ||
                          item.food ||
                          "Food Item"}
                      </strong>

                      <div className="small text-muted">
                        Quantity: {item.quantity}
                      </div>
                    </div>

                    <strong>
                      ×{item.quantity}
                    </strong>

                  </div>
                ))}

              </div>

            </div>

            <div className="card border-0 bg-light rounded-4">

              <div className="card-body">

                <h5 className="fw-bold mb-3">
                  Payment Information
                </h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">
                    <FaCreditCard className="me-2" />
                    Payment Method
                  </span>

                  <strong>
                    {order.payment_method || "N/A"}
                  </strong>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-3 border-top">

                  <span className="fw-bold">
                    <FaMoneyBillWave className="me-2" />
                    Total Amount
                  </span>

                  <span className="fs-4 fw-bold text-success">
                    KES {order.total_amount}
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="modal-footer border-0 px-4 pb-4">

            <button
              type="button"
              className="btn btn-secondary rounded-pill px-4"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;