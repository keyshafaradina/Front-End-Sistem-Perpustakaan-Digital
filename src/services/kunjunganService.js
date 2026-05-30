import api from "./api";

export const simpanKunjungan = (data) =>
  api.post("/kunjungan/simpan", data);