import api from "./api";

export const getAnggota = () => api.get("/anggota");
export const getDetailAnggota = (id) => api.get(`/anggota/${id}`);
export const registerAnggota = (data) => api.post("/anggota/register", data);
export const hapusAnggota = (id) => api.delete(`/anggota/${id}`);