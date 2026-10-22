import React from "react";
import { FaEye, FaCheck } from "react-icons/fa";

const OrderList = ({
  orders,
  status,
  onViewDetails,
  onConfirm,
}) => {
  const isPending = status === "pending";

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">

          <thead className="table-light">
            <tr>
              <th className="px-4">Order</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-end px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>

                <td className="px-4">
                  <strong>#{order.id}</strong>

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
                    {order.customer_name || "Unknown"}
                  </strong>

                  <div className="small text-muted">
                    {order.address || "No address"}
                  </div>
                </td>

                <td>
                  {order.phone_number || "N/A"}
                </td>

                <td>
                  <span className="badge bg-light text-dark">
                    {order.items?.length || 0} item(s)
                  </span>
                </td>

                <td>
                  {order.payment_method || "N/A"}
                </td>

                <td>
                  <strong className="text-success">
                    KES {order.total_amount}
                  </strong>
                </td>

                <td>
                  <span
                    className={`badge rounded-pill ${
                      isPending
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {isPending ? "Pending" : "Confirmed"}
                  </span>
                </td>

                <td className="text-end px-4">
                  <div className="d-flex justify-content-end gap-2">

                    <button
                      className="btn btn-sm btn-outline-dark rounded-pill"
                      onClick={() => onViewDetails(order)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>

                    {isPending && (
                      <button
                        className="btn btn-sm btn-success rounded-pill"
                        onClick={() => onConfirm(order.id)}
                        title="Confirm Order"
                      >
                        <FaCheck />
                      </button>
                    )}

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default OrderList;