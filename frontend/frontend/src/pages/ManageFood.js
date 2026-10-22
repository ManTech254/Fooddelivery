import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaUtensils, FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import adminApi from "../utils/AdminApi";

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editFoodId, setEditFoodId] = useState(null);
  const [editFoodName, setEditFoodName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editAvailable, setEditAvailable] = useState(true);
  const [categories, setCategories] = useState([]);

  // Fetch foods
  useEffect(() => {
    adminApi("http://127.0.0.1:8000/api/list-foods/")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // Fetch categories
    adminApi("http://127.0.0.1:8000/api/list-categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  // Delete food
  const deleteFood = async (id) => {
    const confirmDelete = window.confirm("Delete this food item?");

    if (!confirmDelete) return;

    try {
      const response = await adminApi(
        `http://127.0.0.1:8000/api/delete-food/${id}/`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.status === 200) {
        setFoods(foods.filter((food) => food.id !== id));

        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Edit foods
  const openEditModal = (food) => {
    setEditFoodId(food.id);
    setEditFoodName(food.food_name);
    setEditCategory(food.category);
    setEditPrice(food.price);
    setEditQuantity(food.quantity);
    setEditDescription(food.description);
    setEditAvailable(food.is_available);
    setShowModal(true);
  };

  const updateFood = async () => {
    const formData = new FormData();
    formData.append("food_name", editFoodName);
    formData.append("category", editCategory);
    formData.append("price", editPrice);
    formData.append("quantity", editQuantity);
    formData.append("description", editDescription);
    formData.append("is_available", editAvailable);
    if (editImage) {
      formData.append("image", editImage);
    }

    try {
      const response = await adminApi(
        `http://127.0.0.1:8000/api/update-food/${editFoodId}/`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);

        // Refresh foods
        adminApi("http://127.0.0.1:8000/api/list-foods/")
          .then((response) => response.json())
          .then((data) => {
            setFoods(data);
          });

        setShowModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter foods
  const filteredFoods = foods.filter((food) =>
    (food.food_name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="container-fluid">
        {/* Title */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
          <h3 className="text-danger">
            <FaUtensils className="me-2" />
            Manage Food Items
          </h3>

          <span className="badge bg-success p-2">
            Total: {filteredFoods.length}
          </span>
        </div>

        {/* Search */}
        <div className="card shadow-sm p-3 mb-4">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search food..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm p-3">
          <div className="table-responsive rounded">
            <table className="table table-hover align-middle text-nowrap">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Food</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredFoods.map((food, index) => (
                  <tr key={food.id}>
                    <td className="d-flex flex-wrap gap-2">{index + 1}</td>

                    <td>
                      <img
                        src={food.image}
                        alt={food.food_name}
                        className="img-fluid rounded"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>

                    <td>{food.food_name}</td>

                    <td>{food.category_name}</td>

                    <td>{food.quantity}</td>

                    <td>KES {food.price}</td>

                    <td>
                      {food.is_available ? (
                        <span className="badge bg-success">Available</span>
                      ) : (
                        <span className="badge bg-danger">Not Available</span>
                      )}
                    </td>

                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => openEditModal(food)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteFood(food.id)}
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
      {/* Edit Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <h5 className="modal-title">Edit Food Item</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body">
                {/* Food Name */}
                <div className="mb-3">
                  <label className="form-label">Food Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={editFoodName}
                    onChange={(e) => setEditFoodName(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label">Category</label>

                  <select
                    className="form-select"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
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
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </div>

                {/* Quantity */}
                <div className="mb-3">
                  <label className="form-label">Quantity</label>

                  <input
                    type="text"
                    className="form-control"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>

                  <textarea
                    className="form-control"
                    rows="4"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">Change Image</label>

                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setEditImage(e.target.files[0])}
                  />
                </div>

                {/* Availability */}
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={editAvailable}
                    onChange={(e) => setEditAvailable(e.target.checked)}
                  />

                  <label className="form-check-label">Available</label>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-success" onClick={updateFood}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageFood;
