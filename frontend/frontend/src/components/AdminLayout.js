import React, { useState, useEffect } from "react";
import Sidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "../pages/styles/admin.css";
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Main Content */}
      <div
        id="page-content-wrapper"
        className={`flex-grow-1 ${
          sidebarOpen ? "width-sidebar" : "full-width"
        }`}
      >
        <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="container-fluid mt-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
