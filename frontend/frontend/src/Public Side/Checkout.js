import React, { useContext, useState } from "react";
import PublicLayout from "../Public Side/PublicLayout";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaMapMarkerAlt, FaStickyNote } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);

  // Customer Data
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Submit Order
  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validation
    if (!customerName || !phoneNumber || !address) {
      toast.error("Please fill all required fields");

      return;
    }

    const orderData = {
      customer_name: customerName,
      phone_number: phoneNumber,
      address: address,
      notes: notes,
      payment_method: paymentMethod,
      total_amount: cartTotal,
      items: cartItems,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/place-order/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message);
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };
  return (
    <PublicLayout>
      <div className="container py-5">
        <div className="row">
          {/* Checkout Form */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="fw-bold text-danger mb-4">Checkout</h3>

                <form onSubmit={handleCheckout}>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">
                      <FaUser className="me-2" />
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label className="form-label">
                      <FaPhone className="me-2" />
                      Phone Number
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="07xxxxxxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-3">
                    <label className="form-label">
                      <FaMapMarkerAlt className="me-2" />
                      Delivery Address
                    </label>

                    <textarea
                      className="form-control"
                      rows="3"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Notes */}
                  <div className="mb-3">
                    <label className="form-label">
                      <FaStickyNote className="me-2" />
                      Order Notes
                    </label>

                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Optional"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Payment */}
                  <div className="mb-4">
                    <label className="form-label">Payment Method</label>

                    <select
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="Cash">Cash On Delivery</option>

                      <option value="Mpesa">M-Pesa</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn btn-danger w-100">
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-5 mt-4 mt-lg-0">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-3"
                  >
                    <div>
                      <h6 className="mb-0">{item.food_name}</h6>

                      <small className="text-muted">
                        Qty: {item.quantityCount}
                      </small>
                    </div>

                    <strong>KES {item.price * item.quantityCount}</strong>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between">
                  <h5>Total</h5>

                  <h5 className="text-danger">KES {cartTotal}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </PublicLayout>
  );
};

export default Checkout;
