import { useState } from "react";
import {
  login,
  register,
  logout,
  forgotPassword,
  updateProfilAdmin,
  updateProfilAnggota,
} from "../services/authService";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const res = await login(data);
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data) => {
    const res = await register(data);
    return res.data;
  };

  const handleLogout = async () => {
    const res = await logout();
    localStorage.removeItem("user");
    setUser(null);
    return res.data;
  };

  const handleForgotPassword = async (data) => {
    const res = await forgotPassword(data);
    return res.data;
  };

  const handleUpdateProfilAdmin = async (id, data) => {
    const res = await updateProfilAdmin(id, data);
    return res.data;
  };

  const handleUpdateProfilAnggota = async (id, data) => {
    const res = await updateProfilAnggota(id, data);
    return res.data;
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword,
    handleUpdateProfilAdmin,
    handleUpdateProfilAnggota,
  };
}