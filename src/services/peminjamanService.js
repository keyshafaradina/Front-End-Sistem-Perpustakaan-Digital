import api from "./api";

export const getPeminjaman = () => api.get("/peminjaman");

export const scanAnggota = (data) =>
  api.post("/peminjaman/scan-anggota", data);

export const cariBuku = (data) =>
  api.post("/peminjaman/cari-buku", data);

export const simpanPeminjaman = (data) =>
  api.post("/peminjaman/simpan", data);

export const kembalikanBuku = (id, data) =>
  api.put(`/peminjaman/${id}/kembalikan`, data);

export const batalPeminjaman = () =>
  api.post("/peminjaman/batal");