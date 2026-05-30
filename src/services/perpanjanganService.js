import api from "./api";

export const getPerpanjangan = () => api.get("/perpanjangan");

export const getDetailPerpanjangan = (id) =>
  api.get(`/perpanjangan/${id}`);

export const ajukanPerpanjangan = (id) =>
  api.post(`/perpanjangan/${id}/ajukan`);

export const setujuiPerpanjangan = (id) =>
  api.put(`/perpanjangan/${id}/setujui`);

export const tolakPerpanjangan = (id) =>
  api.put(`/perpanjangan/${id}/tolak`);