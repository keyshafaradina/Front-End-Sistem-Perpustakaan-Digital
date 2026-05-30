import api from "./api";

export const getBuku = () => api.get("/buku");
export const getDetailBuku = (id) => api.get(`/buku/${id}`);
export const tambahBuku = (data) => api.post("/buku", data);
export const updateBuku = (id, data) => api.put(`/buku/${id}`, data);
export const hapusBuku = (id) => api.delete(`/buku/${id}`);

export const arsipkanBuku = (id) => api.put(`/buku/${id}/arsipkan`);
export const getBukuArsip = () => api.get("/buku-arsip");
export const bukaArsipBuku = (id) => api.put(`/buku/${id}/buka-arsip`);

export const hapuskanBuku = (id) => api.put(`/buku/${id}/hapuskan`);
export const getBukuDihapus = () => api.get("/buku-dihapus");
export const pulihkanBuku = (id) => api.put(`/buku/${id}/pulihkan`);