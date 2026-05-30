import api from "./api";

export const getLaporanKunjungan = (params) =>
  api.get("/laporan/kunjungan", { params });

export const getLaporanPeminjaman = (params) =>
  api.get("/laporan/peminjaman", { params });

export const getLaporanPengembalian = (params) =>
  api.get("/laporan/pengembalian", { params });