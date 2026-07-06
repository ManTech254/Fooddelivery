import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../Public Side/PublicLayout";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useContext(CartContext);

  return (
    <PublicLayout>
      <div className="container py-5">
        <h2 className="mb-4">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="alert alert-warning">Your cart is empty</div>
        ) : (
          <div className="row">
            {/* Cart Items */}
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div key={item.id} className="card mb-3 shadow-sm border-0">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Image */}
                      <div className="col-md-2 text-center">
                        <img
                          src={item.image}
                          alt={item.food_name}
                          className="img-fluid rounded"
                          style={{
                            height: "80px",
                            width: "80px",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="col-md-4">
                        <h5 className="fw-bold">{item.food_name}</h5>

                        <p className="text-muted mb-0">KES {item.price}</p>
                      </div>

                      {/* Quantity */}
                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2">
                          {/* Minus */}
                          <button
                            className="btn btn-sm btn-dark"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <FaMinus />
                          </button>

                          {/* Quantity */}
                          <span className="fw-bold">{item.quantityCount}</span>

                          {/* Plus */}
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-md-2">
                        <h6 className="fw-bold text-danger">
                          KES {item.price * item.quantityCount}
                        </h6>
                      </div>

                      {/* Delete */}
                      <div className="col-md-1 text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="fw-bold mb-4">Order Summary</h4>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Total Items</span>

                    <strong>{cartItems.length}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-4">
                    <span>Grand Total</span>

                    <strong className="text-danger">KES {cartTotal}</strong>
                  </div>

                  {/* Checkout */}
                  <Link to="/checkout" className="btn btn-danger w-100">
                    Proceed To Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default Cart;
