import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaMoneyBillWave, FaShoppingBag, FaCheckCircle } from "react-icons/fa";
import adminApi from "../utils/AdminApi";

const DailyReports = () => {
  const [report, setReport] = useState({
    revenue: 0,
    total_orders: 0,
    confirmed_orders: 0,
  });
  const [todaysOrders, setTodaysOrders] = useState([]);

  useEffect(() => {
    adminApi("http://127.0.0.1:8000/api/reports/daily/")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setReport({
          revenue: data.revenue,
          total_orders: data.total_orders,
          confirmed_orders: data.confirmed_orders,
        });
        setTodaysOrders(data.orders);
      })
      .catch((error) => {
        console.log("Daily Report Error:", error);
      });
  }, []);
  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Daily Reports 📊</h2>

        <p className="text-muted">Overview of today's restaurant performance</p>
      </div>

      {/* STATISTICS */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-success text-white">
            <div className="card-body">
              <FaMoneyBillWave size={40} />

              <h5 className="mt-3">Revenue</h5>

              <h2 className="fw-bold">KES {report.revenue}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-primary text-white">
            <div className="card-body">
              <FaShoppingBag size={40} />

              <h5 className="mt-3">Orders</h5>

              <h2 className="fw-bold">{report.total_orders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-warning text-dark">
            <div className="card-body">
              <FaCheckCircle size={40} />

              <h5 className="mt-3">Confirmed</h5>

              <h2 className="fw-bold">{report.confirmed_orders}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT TABLE */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Today's Orders</h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {todaysOrders.length > 0 ? (
                  todaysOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.customer_name}</td>

                      <td>KES {Number(order.amount).toLocaleString()}</td>

                      <td>{order.payment_method}</td>

                      <td>
                        {order.status === "confirmed" ? (
                          <span className="badge bg-success">Confirmed</span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        )}
                      </td>

                      <td>{order.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No orders placed today
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DailyReports;
