import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaArrowUp,
  FaWallet,
} from "react-icons/fa";
import adminApi from "../utils/AdminApi";


const SalesReports = () => {
  const [page, setPage] = useState(1);

  const [sales, setSales] = useState({
    recent_orders: [],
    total_pages: 1,
    has_next: false,
    has_previous: false,
    total_sales: 0,
    total_orders: 0,
    confirmed_orders: 0,
    confirmation_rate: 0,
  });

  useEffect(() => {
    adminApi(`http://127.0.0.1:8000/api/reports/sales/?page=${page}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        setSales(data);
      })
      .catch((error) => {
        console.log("Sales Report Error:", error);
      });
  }, [page]);

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Sales Reports 💰</h2>

          <p className="text-muted">
            Monitor restaurant sales performance and revenue analytics
          </p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row">
        {/* TOTAL SALES */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-success text-white">
            <div className="card-body">
              <FaMoneyBillWave size={40} />

              <h5 className="mt-3">Total Sales</h5>

              <h2 className="fw-bold">KES {sales.total_sales}</h2>
            </div>
          </div>
        </div>

        {/* TOTAL ORDERS */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-primary text-white">
            <div className="card-body">
              <FaShoppingCart size={40} />

              <h5 className="mt-3">Orders</h5>

              <h2 className="fw-bold">{sales.total_orders}</h2>
            </div>
          </div>
        </div>

        {/* PROFIT GROWTH */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-warning text-dark">
            <div className="card-body">
              <FaArrowUp size={40} />

              <h5 className="mt-3">Confirmation Rate</h5>

              <h2 className="fw-bold">{sales.confirmation_rate}%</h2>
            </div>
          </div>
        </div>

        {/* NET PROFIT */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-dark text-white">
            <div className="card-body">
              <FaWallet size={40} />

              <h5 className="mt-3">Confirmed Sales</h5>

              <h2 className="fw-bold">
                KES {Number(sales.total_sales).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* SALES TABLE */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Recent Sales Transactions</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {sales.recent_orders.length > 0 ? (
                  sales.recent_orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>

                      <td>{order.customer_name}</td>

                      <td>
                        KES {Number(order.amount).toLocaleString()}
                      </td>

                      <td>{order.payment_method}</td>

                      <td>
                        {order.status === "confirmed" ? (
                          <span className="badge bg-success">
                            Confirmed
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        )}
                      </td>

                      <td>{order.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No sales records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-danger"
                disabled={!sales.has_previous}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <span className="fw-bold">
                Page {page} of {sales.total_pages}
              </span>

              <button
                className="btn btn-danger"
                disabled={!sales.has_next}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          
          </div>
        </div>
      </div>

      {/* SALES ANALYTICS */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Sales Analytics</h5>

          <div className="sales-placeholder">
            <h1>📈</h1>

            <p className="text-muted">
              Sales charts and financial analytics will appear here.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SalesReports;
