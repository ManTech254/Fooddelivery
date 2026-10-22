import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaMoneyBillWave,
  FaShoppingBag,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";
import adminApi from "../utils/AdminApi";

const WeeklyReports = () => {
  const [report, setReport] = useState({
    revenue: 0,
    total_orders: 0,
    confirmed_orders: 0,
  });
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    adminApi("http://127.0.0.1:8000/api/reports/weekly/")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        setReport({
          revenue: data.revenue,
          total_orders: data.total_orders,
          confirmed_orders: data.confirmed_orders,
          confirmation_rate: data.confirmation_rate,
        });

        setSummary(data.daily_summary);
      })
      .catch((error) => {
        console.log("Weekly Report Error:", error);
      });
  }, []);

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Weekly Reports 📅</h2>

        <p className="text-muted">
          Overview of this week's restaurant performance
        </p>
      </div>

      {/* STATISTICS */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-success text-white">
            <div className="card-body">
              <FaMoneyBillWave size={40} />

              <h5 className="mt-3">Weekly Revenue</h5>

              <h2 className="fw-bold">
                KES {Number(report.revenue).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-primary text-white">
            <div className="card-body">
              <FaShoppingBag size={40} />

              <h5 className="mt-3">Total Orders</h5>

              <h2 className="fw-bold">{report.total_orders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-warning text-dark">
            <div className="card-body">
              <FaCheckCircle size={40} />

              <h5 className="mt-3">Confirmed</h5>

              <h2 className="fw-bold">{report.confirmed_orders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-dark text-white">
            <div className="card-body">
              <FaChartLine size={40} />

              <h5 className="mt-3">Growth Rate</h5>

              <h2 className="fw-bold">{report.confirmation_rate}%</h2>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Weekly Order Summary</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {summary.map((day, index) => (
                  <tr key={index}>
                    <td>{day.day}</td>

                    <td>{day.orders}</td>

                    <td>KES {Number(day.revenue).toLocaleString()}</td>

                    <td>
                      <span
                        className={`badge ${
                          day.orders > 0 ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {day.orders > 0 ? "Completed" : "No Orders"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WeeklyReports;
