export const DetailPeminjamanDefault = {
  id: null,
  peminjaman_id: null,
  buku_id: null,
  buku: null,
  created_at: "",
  updated_at: "",
};

export const PeminjamanDefault = {
  id: null,
  anggota_id: null,
  petugas_id: null,
  tanggal_peminjaman: "",
  tanggal_pengembalian: "",
  tanggal_dikembalikan: null,
  tanggal_perpanjangan: null,
  tanggal_pengembalian_baru: null,
  status: "dipinjam",
  status_perpanjangan: "belum",
  anggota: null,
  petugas: null,
  detail_peminjaman: [],
  created_at: "",
  updated_at: "",
};

export const ScanAnggotaForm = {
  nomor_anggota: "",
};

export const CariBukuForm = {
  kode_buku: "",
};

export const SimpanPeminjamanForm = {
  anggota_id: "",
  petugas_id: "",
  tanggal_peminjaman: "",
  buku_ids: [],
};

export const KembalikanBukuForm = {
  tanggal_dikembalikan: "",
};