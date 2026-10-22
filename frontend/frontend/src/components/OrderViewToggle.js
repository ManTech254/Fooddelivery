import React from "react";
import { FaThLarge, FaList } from "react-icons/fa";

const OrderViewToggle = ({ view, setView }) => {
  return (
    <div className="btn-group shadow-sm" role="group">
      <button
        type="button"
        className={`btn ${
          view === "cards" ? "btn-dark" : "btn-outline-dark"
        }`}
        onClick={() => setView("cards")}
      >
        <FaThLarge className="me-2" />
        Cards
      </button>

      <button
        type="button"
        className={`btn ${
          view === "list" ? "btn-dark" : "btn-outline-dark"
        }`}
        onClick={() => setView("list")}
      >
        <FaList className="me-2" />
        List
      </button>
    </div>
  );
};

export default OrderViewToggle;