import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import {
  FaMoneyBillWave,
  FaShoppingBag,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

const MonthlyReports = () => {
  const [report, setReport] = useState({
    revenue: 0,
    total_orders: 0,
    confirmed_orders: 0,
  });

  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/reports/monthly/")
      .then((response) => {
        setPerformance(response.data.weekly_performance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Monthly Reports 📈</h2>

        <p className="text-muted">Full monthly restaurant business analytics</p>
      </div>

      {/* CARDS */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-lg rounded-4 bg-success text-white">
            <div className="card-body">
              <FaMoneyBillWave size={40} />

              <h5 className="mt-3">Monthly Revenue</h5>

              <h2 className="fw-bold">KES {report.revenue}</h2>
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
              <FaUsers size={40} />

              <h5 className="mt-3">Customers</h5>

              <h2 className="fw-bold">310</h2>
            </div>
          </div>
        </div>
      </div>

      {/* PERFORMANCE TABLE */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Monthly Business Performance</h5>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Growth</th>
                </tr>
              </thead>

              <tbody>
                {performance.map((week, index) => (
                  <tr key={index}>
                    <td>{week.week}</td>

                    <td>{week.orders}</td>

                    <td>KES {Number(week.revenue).toLocaleString()}</td>

                    <td>
                      <span className="text-success">Active</span>
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

export default MonthlyReports;
