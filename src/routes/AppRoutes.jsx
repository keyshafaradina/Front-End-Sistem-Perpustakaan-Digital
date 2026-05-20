import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

// auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import Buku from "../pages/admin/BukuPopuler";
import Laporan from "../pages/admin/laporan/Laporan";
import Anggota from "../pages/admin/Anggota";
import KelolaBuku from "../pages/admin/KelolaBuku";
import TambahBuku from "../pages/admin/TambahBuku";
import EditBuku from "../pages/admin/EditBuku";
import Peringatan from "../pages/admin/Peringatan";
import Terlambat from "../pages/admin/Terlambat";
import EditProfileAdmin from "../pages/admin/EditProfileAdmin";

// anggota
import DashboardAnggota from "../pages/anggota/DashboardAnggota";


function AppRoutes() {
  return (
    <Routes>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* MAIN */}
      <Route element={<MainLayout />}>

        {/* ADMIN */}
        <Route path="/dashboardadmin" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
        <Route path="/profileadmin" element={<ProtectedRoute><ProfileAdmin /></ProtectedRoute>} />
        <Route path="/buku" element={<ProtectedRoute><Buku /></ProtectedRoute>} />
        <Route path="/laporan" element={<ProtectedRoute><Laporan /></ProtectedRoute>} />  
        <Route path="/anggota" element={<ProtectedRoute><Anggota /></ProtectedRoute>} />
        <Route path="/kelolabuku" element={<ProtectedRoute><KelolaBuku /></ProtectedRoute>} />
        <Route path="/tambah-buku" element={<ProtectedRoute><TambahBuku /></ProtectedRoute>} />
        <Route path="/edit-buku/:id" element={<ProtectedRoute><EditBuku /></ProtectedRoute>} />
        <Route path="/peringatan" element={<ProtectedRoute><Peringatan /></ProtectedRoute>} />
        <Route path="/terlambat" element={<ProtectedRoute><Terlambat /></ProtectedRoute>} />
       <Route path="/editprofileadmin" element={<ProtectedRoute><EditProfileAdmin /></ProtectedRoute>} />


        {/* ANGGOTA */}
        <Route path="/dashboardanggota" element={<ProtectedRoute><DashboardAnggota /></ProtectedRoute>} />

      </Route>

    </Routes>
  );
}

export default AppRoutes;