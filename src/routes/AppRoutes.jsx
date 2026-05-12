import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

//import halaman auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

//import halaman admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import Buku from "../pages/admin/Buku";
import Laporan from "../pages/admin/laporan/Laporan";

//import halaman anggota
import DashboardAnggota from "../pages/anggota/DashboardAnggota";

function AppRoutes() {
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          {/* Halaman Auth lainnya */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />  
        </Route>

        <Route element={<MainLayout />}>
          {/* Halaman Admin */}
          <Route path="/dashboardadmin" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
          <Route path="/profileadmin" element={<ProtectedRoute><ProfileAdmin /></ProtectedRoute>} />
          <Route path="buku" element={<ProtectedRoute><Buku /></ProtectedRoute>} />
          <Route path="/laporan" element={<ProtectedRoute><Laporan /></ProtectedRoute>}/>


          {/* Halaman Anggota */}
          <Route path="/dashboardanggota" element={<ProtectedRoute><DashboardAnggota /></ProtectedRoute>} />
        </Route>
      </Routes>
  );
}

export default AppRoutes