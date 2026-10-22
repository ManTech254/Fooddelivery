import React from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaEye,
  FaCheck,
} from "react-icons/fa";

const OrderCard = ({
  order,
  status,
  onViewDetails,
  onConfirm,
}) => {
  const isPending = status === "pending";

  return (
    <div className="col-md-6 col-xl-4 mb-4">
      <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
        <div className="card-body pb-2">

          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <small className="text-muted">Order</small>
              <h5 className="fw-bold mb-0">
                #{order.id}
              </h5>
            </div>

            <span
              className={`badge rounded-pill px-3 py-2 ${
                isPending
                  ? "bg-warning text-dark"
                  : "bg-success"
              }`}
            >
              {isPending ? "Pending" : "Confirmed"}
            </span>
          </div>

          <h6 className="fw-bold mb-2">
            {order.customer_name || "Unknown Customer"}
          </h6>

          <div className="text-muted small mb-1">
            <FaPhone className="me-2" />
            {order.phone_number || "No phone number"}
          </div>

          <div className="text-muted small mb-3">
            <FaMapMarkerAlt className="me-2" />
            {order.address || "No address provided"}
          </div>

          <div className="border-top pt-3">
            <h6 className="fw-bold mb-2">
              Order Items
            </h6>

            {order.items?.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span className="text-muted">
                  {item.food_name || item.food || "Food Item"}
                </span>

                <span className="fw-semibold">
                  ×{item.quantity}
                </span>
              </div>
            ))}

            {order.items?.length > 3 && (
              <small className="text-primary">
                +{order.items.length - 3} more item(s)
              </small>
            )}
          </div>

          <div className="border-top mt-3 pt-3">

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">
                <FaMoneyBillWave className="me-2" />
                Payment
              </span>

              <strong>
                {order.payment_method || "N/A"}
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-muted">
                <FaClock className="me-2" />
                Total
              </span>

              <strong className="text-success">
                KES {order.total_amount}
              </strong>
            </div>

          </div>
        </div>

        <div className="card-footer bg-white border-0 px-3 pb-3">
          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-dark rounded-pill flex-grow-1"
              onClick={() => onViewDetails(order)}
            >
              <FaEye className="me-2" />
              View Details
            </button>

            {isPending && (
              <button
                className="btn btn-success rounded-pill px-3"
                onClick={() => onConfirm(order.id)}
                title="Confirm Order"
              >
                <FaCheck />
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;