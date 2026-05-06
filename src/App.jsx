import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import halaman Admin
import DashboardAdmin from "./pages/admin/Dashboard";

// Import halaman Auth 
import LandingLogin from './pages/auth/LandingLogin';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

//Import halaman anggota
import Dashboard from './pages/anggota/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman utama: Menampilkan LandingLogin yang ada logonya */}
        <Route path="/" element={<LandingLogin />} />
        
        {/* Halaman Auth lainnya */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Halaman Admin */}
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Halaman Anggota */}
        <Route path="/anggota/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;