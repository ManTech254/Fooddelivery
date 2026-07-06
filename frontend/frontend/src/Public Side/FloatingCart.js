import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const FloatingCart = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <Link
      to="/cart"
      className="
        btn
        btn-danger
        rounded-pill
        shadow-lg
        position-fixed
        d-flex
        d-lg-none
        align-items-center
        gap-2
      "
      style={{
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        padding: "12px 18px",
      }}
    >
      <FaShoppingCart />
      <span>{cartItems.length}</span>
    </Link>
  );
};

export default FloatingCart;
