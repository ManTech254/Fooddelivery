import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddCategory from "./pages/AddCategory";
import ManageCategory from "./pages/ManageCategory";
import AddFood from "./pages/AddFood";
import ManageFood from "./pages/ManageFood";

import Menu from "./Public Side/Menu";
import TrackOrder from "./Public Side/TrackOrder";
import Login from "./Public Side/Login";
import Register from "./Public Side/Register";
import Cart from "./Public Side/Cart";
import Checkout from "./Public Side/Checkout";

import PendingOrders from "./pages/PendingOrders";
import ConfirmedOrders from "./pages/ConfirmedOrders";
import DailyReports from "./pages/DailyReports";
import WeeklyReports from "./pages/WeeklyReports";
import MonthlyReports from "./pages/MonthlyReports";
import SalesReports from "./pages/SalesReports";
import AdminUsers from "./pages/AdminUsers";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-add-category" element={<AddCategory />} />
          <Route path="/admin-manage-category" element={<ManageCategory />} />
          <Route path="/admin-add-food" element={<AddFood />} />
          <Route path="/admin-manage-food" element={<ManageFood />} />
          <Route path="/Admin_Pending_Orders" element={<PendingOrders />} />
          <Route path="/Admin_Confirmed_Orders" element={<ConfirmedOrders />} />

          <Route path="/Admin-DailyReports" element={<DailyReports />} />
          <Route path="/Admin-WeeklyReports" element={<WeeklyReports />} />
          <Route path="/Admin-MonthlyReports" element={<MonthlyReports />} />
          <Route path="/Admin-SalesReports" element={<SalesReports />} />

          <Route path="/admin-users" element={<AdminUsers />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;