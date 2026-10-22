import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const adminAccess = localStorage.getItem("adminAccess");

  if (!adminAccess) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;