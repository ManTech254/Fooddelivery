import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import adminApi from "../utils/AdminApi";
import { FaSyncAlt } from "react-icons/fa";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await adminApi(
        "http://127.0.0.1:8000/api/users/"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.results)) {
        setUsers(data.results);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminApi(
          "http://127.0.0.1:8000/api/users/"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data = await response.json();

        console.log("Users from API:", data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.results)) {
          setUsers(data.results);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-4 flex">Registered Users </h2>
          <button
          className="btn btn-outline-primary"
          onClick={fetchUsers}
          disabled={loading}
          title="Refresh users"
        >
          <FaSyncAlt className={loading ? "fa-spin" : ""} />
        </button>
        </div>
        
        
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.mobile || "N/A"}</td>
                        <td>{user.reg_date || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No registered users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
