import api from "./api";

export const register = (data) => api.post("/register", data);

export const login = (data) => api.post("/login", data);

export const logout = () => api.post("/logout");

export const updateProfilAdmin = (id, data) =>
  api.post(`/profile/admin/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProfilAnggota = (id, data) =>
  api.post(`/profile/anggota/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const forgotPassword = (data) =>
  api.post("/forgot-password", data);