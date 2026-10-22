import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaUtensils } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import adminApi from "../utils/AdminApi";
const AddFood = () => {
  const [categories, setCategories] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [quantity, setQuantity] = useState("");

  // Load categories
  useEffect(() => {
    adminApi("http://127.0.0.1:8000/api/list-categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("quantity", quantity);
    formData.append("food_name", foodName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("is_available", isAvailable);

    try {
      const response = await adminApi(
        "http://127.0.0.1:8000/api/add-food/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message);

        setFoodName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage(null);
        setIsAvailable(true);
        setQuantity("");

        // Reset file input
        e.target.reset();
      } else {
        toast.error(
          data.detail || data.message || "Failed to add food item"
        );

        console.log("Add food error:", data);
      }
    } catch (error) {
      console.log("Add food error:", error);
      toast.error("Server error");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="card shadow-sm p-4">
          {/* Title */}
          <h3 className="text-danger mb-4">
            <FaUtensils className="me-2" />
            Add Food Item
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Food Name */}
            <div className="mb-3">
              <label className="form-label">Food Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>

              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Price</label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label className="form-label">Quantity</label>

              <input
                type="text"
                className="form-control"
                placeholder="i.e Large,2pcs,1/2.."
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Image */}
            <div className="mb-3">
              <label className="form-label">Food Image</label>

              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Availability */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />

              <label className="form-check-label">Available</label>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-danger">
              Add Food Item
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </AdminLayout>
  );
};

export default AddFood;
