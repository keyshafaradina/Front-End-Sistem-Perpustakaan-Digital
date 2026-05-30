import api from "./api";

export const getDashboard = () => api.get("/dashboard");
export const getEditDashboard = () => api.get("/dashboard/edit");
export const updateDashboard = (data) => api.put("/dashboard/edit", data);

export const getBukuPopuler = () => api.get("/dashboard/buku-populer");
export const getTerlambat = () => api.get("/dashboard/terlambat");
export const getPermohonanPerpanjangan = () => api.get("/dashboard/perpanjangan");
export const getJatuhTempo = () => api.get("/dashboard/jatuh-tempo");