import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const OrderFilters = ({
  searchTerm,
  setSearchTerm,
  paymentFilter,
  setPaymentFilter,
  dateFilter,
  setDateFilter,
  paymentMethods = [],
  onClear,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">

        <div className="row g-3 align-items-end">

          {/* Search */}
          <div className="col-lg-5">
            <label className="form-label fw-semibold text-dark">
              Search Orders
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>

              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Order ID, customer, phone or address..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>
          </div>

          {/* Payment */}
          <div className="col-md-6 col-lg-2">
            <label className="form-label fw-semibold text-dark">
              Payment
            </label>

            <select
              className="form-select"
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(e.target.value)
              }
            >
              <option value="all">
                All Payments
              </option>

              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="col-md-6 col-lg-2">
            <label className="form-label fw-semibold text-dark">
              Date
            </label>

            <select
              className="form-select"
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
            >
              <option value="all">
                All Dates
              </option>

              <option value="today">
                Today
              </option>

              <option value="7days">
                Last 7 Days
              </option>

              <option value="30days">
                Last 30 Days
              </option>
            </select>
          </div>

          {/* Clear */}
          <div className="col-md-6 col-lg-3">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={onClear}
            >
              <FaTimes className="me-2" />
              Clear Filters
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderFilters;