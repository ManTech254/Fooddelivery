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
const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/list-categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const deleteCategory = async (id) => {
    // Confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete-category/${id}/`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.status === 200) {
        // Remove deleted category from state
        setCategories(categories.filter((category) => category.id !== id));

        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editCategory = async (id, oldName) => {
    const newName = prompt("Edit Category Name", oldName);

    if (!newName || !newName.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/update-category/${id}/`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            category_name: newName,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 200) {
        // Update state instantly
        setCategories(
          categories.map((category) =>
            category.id === id
              ? {
                  ...category,
                  category_name: newName,
                }
              : category,
          ),
        );

        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // debugging area
  const filteredCategories = categories.filter((category) =>
    (category.category_name || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase()),
  );
  const csvData = categories.map((category) => ({
    ID: category.id,
    CategoryName: category.category_name,
    CreationDate: new Date(category.creation_date).toLocaleString(),
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <CSVLink
          data={csvData}
          filename={"categories.csv"}
          className="btn btn-success"
        >
          Export Categories CSV
        </CSVLink>

        {/* Table Card */}
        <div className="card shadow-sm p-3">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              {/* Table Head */}
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Category Name</th>
                  <th>Creation Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>

                    <td>{category.category_name}</td>

                    <td>{new Date(category.creation_date).toLocaleString()}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() =>
                          editCategory(category.id, category.category_name)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCategory;
