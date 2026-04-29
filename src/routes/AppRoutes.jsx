import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import Buku from "../pages/admin/Buku";
import Peminjaman from "../pages/admin/Peminjaman";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/buku"
          element={
            <ProtectedRoute>
              <Layout>
                <Buku />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/peminjaman"
          element={
            <ProtectedRoute>
              <Layout>
                <Peminjaman />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;