import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaMoneyBillWave,
  FaShoppingBag,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import adminApi from "../utils/AdminApi";

const MonthlyReports = () => {
  const [report, setReport] = useState({
    revenue: 0,
    total_orders: 0,
    confirmed_orders: 0,
  });

  const [performance, setPerformance] = useState([]);
  const [customers, setCustomers] = useState(0);
  
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );


  useEffect(() => {
    adminApi(`http://127.0.0.1:8000/api/reports/monthly/?month=${selectedMonth}`)
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

        setPerformance(data.weekly_performance);
      })
      .catch((error) => {
        console.log("Monthly Report Error:", error);
      });

    adminApi("http://127.0.0.1:8000/api/users/")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Users request failed: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setCustomers(data.length);
        } else if (Array.isArray(data.results)) {
          setCustomers(data.results.length);
        } else {
          setCustomers(0);
        }
      })
      .catch((error) => {
        console.log("Customers Error:", error);
        setCustomers(0);
      });
  }, [selectedMonth]);

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="fw-bold">Monthly Reports 📈</h2>
            <p className="text-muted mb-0">
              Full monthly restaurant business analytics
            </p>
          </div>

          <div>
            <label className="form-label fw-semibold mb-1">
              Select Month
            </label>

            <input
              type="month"
              className="form-control"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
        </div>
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

              <h2 className="fw-bold">{customers}</h2>
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
