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
    (food.food_name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <PublicLayout>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">

            {/* Hero Text */}
            <div className="col-lg-6">
              <span className="hero-badge">
                Fresh • Delicious • Fast
              </span>

              <h1 className="hero-title">
                Delicious Food
                <span> Delivered Fast</span>
              </h1>

              <p className="hero-description">
                Enjoy freshly prepared meals made with quality ingredients
                and delivered straight to your doorstep.
              </p>

              <button
                className="btn hero-btn"
                onClick={() =>
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FaShoppingBasket className="me-2" />
                Order Now
              </button>
            </div>

            {/* Hero Image */}
            <div className="col-lg-6">
              <div className="hero-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                  alt="Delicious food"
                  className="hero-image"
                />

                <div className="hero-floating-card">
                  <FaShoppingBasket />
                  <div>
                    <strong>Fresh Meals</strong>
                    <small>Ready to order</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SEARCH SECTION ================= */}
      <section id="menu" className="products-section">
        <div className="container">
          <div className="search-wrapper">

            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search for your favourite meal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="products-section">
        <div className="container">

          {/* Section Header */}
          <div className="section-header">
            <div>
              <span className="section-label">
                OUR MENU
              </span>

              <h2>
                Popular Meals
              </h2>

              <p>
                Explore our delicious selection of freshly prepared meals.
              </p>
            </div>

            <div className="food-count">
              {filteredFoods.length} Meals
            </div>
          </div>

          {/* Products */}
          {filteredFoods.length > 0 ? (
            <div className="row g-4">

              {filteredFoods.map((food) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  key={food.id}
                >
                  <div className="food-card">

                    {/* Image */}
                    <div className="food-image-wrapper">

                      <img
                        src={food.image}
                        alt={food.food_name}
                        className="food-image"
                      />

                      <span className="food-category">
                        {food.category_name}
                      </span>

                    </div>

                    {/* Body */}
                    <div className="food-card-body">

                      <h3>
                        {food.food_name}
                      </h3>

                      <p className="food-description">
                        {food.description}
                      </p>

                      <div className="food-meta">
                        <span>
                          {food.quantity}
                        </span>
                      </div>

                      {/* Bottom */}
                      <div className="food-bottom">

                        <div className="food-price">
                          <small>KES</small>
                          {food.price}
                        </div>

                        <button
                          className="add-cart-btn"
                          onClick={() => addToCart(food)}
                        >
                          <FaShoppingBasket />
                          Add
                        </button>

                      </div>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            <div className="no-foods">
              <FaSearch />

              <h3>No meals found</h3>

              <p>
                Try searching for another food item.
              </p>
            </div>
          )}

        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;