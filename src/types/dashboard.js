export const DashboardDefault = {
  total_buku: 0,
  total_anggota: 0,
  dipinjam: 0,
  terlambat: 0,
  permohonan_perpanjangan: 0,
  akan_jatuh_tempo: 0,
  buku_populer: [],
};

export const BukuPopulerDefault = {
  ranking: null,
  id: null,
  kode_buku: "",
  judul: "",
  penulis: "",
  gambar: "",
  stok: 0,
  ketersediaan: "",
  total_dipinjam: 0,
};

export const DashboardSettingDefault = {
  id: null,
  judul: "",
  visi: "",
  misi: [],
  alamat: "",
  akun_sosmed: "",
  logo: "",
  created_at: "",
  updated_at: "",
};

export const DashboardSettingForm = {
  judul: "",
  visi: "",
  misi: [],
  alamat: "",
  akun_sosmed: "",
  logo: "",
};

export const TerlambatDefault = {
  id_peminjaman: null,
  anggota: {
    id: null,
    nama_lengkap: "",
  },
  buku: [],
  tanggal_peminjaman: "",
  tanggal_pengembalian: "",
  terlambat_hari: 0,
  status: "terlambat",
};