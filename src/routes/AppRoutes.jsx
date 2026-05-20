import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

//import halaman auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifikasiEmail from "../pages/auth/VerifikasiEmail";
import ResetPassword from "../pages/auth/ResetPassword";

//import halaman admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import Buku from "../pages/admin/Buku";
import Laporan from "../pages/admin/laporan/Laporan";

//import halaman anggota
import DashboardAnggota from "../pages/anggota/DashboardAnggota";
import ProfileAnggota from "../pages/anggota/profile/ProfileAnggota";
import EditProfileAnggota from "../pages/anggota/profile/EditProfileAnggota";
import RiwayatPeminjaman from "../pages/anggota/riwayatpeminjaman/RiwayatPeminjaman";
import AjukanPerpanjangan from "../pages/anggota/riwayatpeminjaman/AjukanPerpanjangan";
import KartuAnggota from "../pages/anggota/KartuAnggota";
import DaftarBuku from "../pages/anggota/daftarbuku/DaftarBuku";
import InformasiBuku from "../pages/anggota/daftarbuku/InformasiBuku";

function AppRoutes() {
  return (
      <Routes>
        <Route element={<AuthLayout />}>
          {/* Halaman Auth lainnya */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/verifikasi-email" element={<VerifikasiEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          {/* Halaman Admin */}
          <Route path="/dashboardadmin" element={<DashboardAdmin />}/>
          <Route path="/profileadmin" element={<ProfileAdmin />} />
          <Route path="/buku" element={<Buku />} />
          <Route path="/laporan" element={<Laporan />}/>


          {/* Halaman Anggota */}
          <Route path="/dashboardanggota" element={<DashboardAnggota />} />
          <Route path="/profileanggota" element={<ProfileAnggota />} />
          <Route path="/editprofileanggota" element={<EditProfileAnggota />} />
          <Route path="/riwayatpeminjaman" element={<RiwayatPeminjaman />} />
          <Route path="/ajukanperpanjangan" element={<AjukanPerpanjangan />} />
          <Route path="/kartuanggota" element={<KartuAnggota />} />
          <Route path="/daftarbukuanggota" element={<DaftarBuku />} />
          <Route path="/informasibukuanggota" element={<InformasiBuku />} />

        </Route>
        </Route>
      </Routes>
  );
}

export default AppRoutes;