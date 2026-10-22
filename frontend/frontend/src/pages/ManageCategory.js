import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  FaListAlt,
  FaDatabase,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { CSVLink } from "react-csv";
import adminApi from "../utils/AdminApi";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // Fetch Categories
  // =========================
  const fetchCategories = async () => {
    try {
      const response = await adminApi(
        "http://127.0.0.1:8000/api/list-categories/",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCategories(Array.isArray(data) ? data : []);
      } else {
        console.log("Error fetching categories:", data);
        alert(data.detail || data.message || "Failed to load categories");
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // Delete Category
  // =========================
  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await adminApi(
        `http://127.0.0.1:8000/api/delete-category/${id}/`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCategories((previousCategories) =>
          previousCategories.filter((category) => category.id !== id)
        );

        alert(data.message || "Category deleted successfully");
      } else {
        alert(
          data.detail ||
            data.message ||
            "Failed to delete category"
        );
      }
    } catch (error) {
      console.log("Delete category error:", error);
      alert("Server error while deleting category");
    }
  };

  // =========================
  // Edit Category
  // =========================
  const editCategory = async (id, oldName) => {
    const newName = prompt("Edit Category Name", oldName);

    if (!newName || !newName.trim()) {
      return;
    }

    try {
      const response = await adminApi(
        `http://127.0.0.1:8000/api/update-category/${id}/`,
        {
          method: "PUT",
          body: JSON.stringify({
            category_name: newName.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCategories((previousCategories) =>
          previousCategories.map((category) =>
            category.id === id
              ? {
                  ...category,
                  category_name: newName.trim(),
                }
              : category
          )
        );

        alert(data.message || "Category updated successfully");
      } else {
        alert(
          data.detail ||
            data.message ||
            "Failed to update category"
        );
      }
    } catch (error) {
      console.log("Update category error:", error);
      alert("Server error while updating category");
    }
  };

  // =========================
  // Search
  // =========================
  const filteredCategories = categories.filter((category) =>
    (category.category_name || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase())
  );

  // =========================
  // CSV Data
  // =========================
  const csvData = categories.map((category) => ({
    ID: category.id,
    CategoryName: category.category_name,
    CreationDate: category.creation_date
      ? new Date(category.creation_date).toLocaleString()
      : "",
  }));

  return (
    <AdminLayout>
      <div className="container-fluid">
        {/* Page Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-danger">
            <FaListAlt className="me-2" />
            Manage Food Categories
          </h3>

          <h5 className="text-muted">
            <FaDatabase className="me-2" />
            Total Categories
            <span className="ms-2 badge bg-success">
              {filteredCategories.length}
            </span>
          </h5>
        </div>

        {/* Search Section */}
        <div className="card shadow-sm p-3 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0">Search Categories</h5>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Export */}
        <CSVLink
          data={csvData}
          filename={"categories.csv"}
          className="btn btn-success mb-3"
        >
          Export Categories CSV
        </CSVLink>

        {/* Table Card */}
        <div className="card shadow-sm p-3">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Category Name</th>
                  <th>Creation Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>

                      <td>{category.category_name}</td>

                      <td>
                        {category.creation_date
                          ? new Date(
                              category.creation_date
                            ).toLocaleString()
                          : "N/A"}
                      </td>

                      <td>
                        {/* Edit */}
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() =>
                            editCategory(
                              category.id,
                              category.category_name
                            )
                          }
                          title="Edit Category"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            deleteCategory(category.id)
                          }
                          title="Delete Category"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCategory;