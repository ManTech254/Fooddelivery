import React, { useEffect, useState, useContext } from "react";
import PublicLayout from "../Public Side/PublicLayout";
import "./styles/layout.css";
import { CartContext } from "../context/CartContext";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
const Home = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(CartContext);

  // Fetch foods
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/customer-foods/")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter foods
  const filteredFoods = foods.filter((food) =>
    (food.food_name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left */}
            <div className="col-md-6">
              <h1 className="display-5 fw-bold text-danger">
                Delicious Food Delivered Fast
              </h1>

              <p className="lead text-muted">
                Fresh meals prepared with love and delivered to your doorstep.
              </p>

              <button className="btn btn-danger btn-lg">
                <FaShoppingBasket className="m-1"></FaShoppingBasket> Order Now
              </button>
            </div>

            {/* Right */}
            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Food"
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-4 bg-white">
        <div className="container">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-danger text-white border-0">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control border-0"
              placeholder="Search delicious meals..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-5">
        <div className="container">
          {/* Title */}
          <div className="text-center mb-5">
            <h2 className="fw-bold text-danger">Popular Meals</h2>

            <p className="text-muted">Explore our delicious menu</p>
          </div>

          {/* Products Grid */}
          <div className="row g-4">
            {filteredFoods.map((food) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={food.id}>
                <div className="card border-0 shadow-sm h-100">
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.food_name}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        transition: "0.3s",
                      }}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    {/* Food Name */}
                    <h5 className="fw-bold">{food.food_name}</h5>

                    {/* Description */}
                    <p className="text-muted small flex-grow-1">
                      {food.description}
                    </p>

                    {/* Category + Quantity */}
                    <div className="mb-3">
                      <span className="badge bg-dark me-2">
                        {food.category_name}
                      </span>

                      <span className="badge bg-secondary">
                        {food.quantity}
                      </span>
                    </div>

                    {/* Price + Button */}
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-danger fw-bold mb-0">
                        KES {food.price}
                      </h5>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => addToCart(food)}
                      >
                        <FaShoppingBasket className="m-1" />
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
