import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaListAlt, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminApi from "../utils/AdminApi";
const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check empty
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await adminApi(
        "http://127.0.0.1:8000/api/add-category/",
        {
          method: "POST",
          body: JSON.stringify({
            category_name: categoryName,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message);

        // Clear input
        setCategoryName("");
      } else {
        toast.error(data.detail || data.message || "Failed to add category");
        console.log("Add category response:", data);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <AdminLayout>
      <div className="container">
        <div className="card shadow-sm p-4">
          {/* Title */}
          <h3 className="mb-4 text-danger d-flex align-items-center gap-2">
            <FaPlus className="fs-6" />
            Add Food Category
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="mb-3">
              <label className="form-label">Category Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-danger">
              <FaPlus className="me-2" />
              Add Category
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </AdminLayout>
  );
};

export default AddCategory;
