import React, { useState } from "react";
import Button from "../../components/ui/Button";
import PopUp from "../../components/ui/PopUp";
import api from "../../services/api";

export default function Pengembalian() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    nomor: "",
    nama: "",
  });

  const [dataPeminjaman, setDataPeminjaman] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
    action: "",
    peminjamanId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatTanggalHariIni = () => {
    const sekarang = new Date();
    const tahun = sekarang.getFullYear();
    const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
    const tanggal = String(sekarang.getDate()).padStart(2, "0");

    return `${tahun}-${bulan}-${tanggal}`;
  };

  const getDetailPeminjaman = (item) => {
    return (
      item.detail_peminjaman ||
      item.detailPeminjaman ||
      item.detail_peminjamans ||
      []
    );
  };

  const getGambarBuku = (detail) => {
    const gambar =
      detail?.buku?.gambar ||
      detail?.buku?.foto ||
      detail?.buku?.cover ||
      detail?.buku?.image ||
      detail?.buku?.sampul;

    if (!gambar) return "/images/nailong.jpg";
    if (gambar.startsWith("http")) return gambar;

    return `http://127.0.0.1:8000/uploads/buku/${gambar}`;
  };

  const handleCari = async () => {
    if (!userData.nomor.trim() || !userData.nama.trim()) {
      setPopupData({
        title: "Peringatan",
        message: "Nomor dan nama anggota wajib diisi!",
        action: "",
        peminjamanId: null,
      });
      setShowPopup(true);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get("/peminjaman");
      const semuaData = res.data.data || [];

      const hasil = semuaData.filter((item) => {
        const nomorAnggota = item.anggota?.nomor_anggota || "";
        const namaAnggota = item.anggota?.nama_lengkap || "";

        return (
          nomorAnggota.toLowerCase().trim() ===
            userData.nomor.toLowerCase().trim() &&
          namaAnggota.toLowerCase().trim() ===
            userData.nama.toLowerCase().trim() &&
          item.status === "dipinjam" &&
          item.tanggal_dikembalikan === null
        );
      });

      if (hasil.length === 0) {
        setPopupData({
          title: "Data Tidak Ditemukan",
          message: "Data anggota atau data peminjaman aktif tidak ditemukan.",
          action: "",
          peminjamanId: null,
        });
        setShowPopup(true);
        return;
      }

      setDataPeminjaman(hasil);
      setStep(2);
    } catch (error) {
      console.error(error);

      setPopupData({
        title: "Gagal",
        message:
          error.response?.data?.message || "Gagal mengambil data peminjaman",
        action: "",
        peminjamanId: null,
      });
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKonfirmasiPengembalian = (peminjamanId) => {
    setPopupData({
      title: "Konfirmasi",
      message: "Apakah buku ini sudah dikembalikan?",
      action: "kembalikan",
      peminjamanId,
    });
    setShowPopup(true);
  };

  const handleKembalikan = async () => {
    try {
      setLoading(true);

      await api.put(`/peminjaman/${popupData.peminjamanId}/kembalikan`, {
        tanggal_dikembalikan: formatTanggalHariIni(),
      });

      setDataPeminjaman((prev) =>
        prev.filter((item) => item.id !== popupData.peminjamanId)
      );

      setPopupData({
        title: "Berhasil",
        message: "Buku berhasil dikembalikan dan masuk ke laporan pengembalian.",
        action: "",
        peminjamanId: null,
      });

      setShowPopup(true);
    } catch (error) {
      console.error(error);

      setPopupData({
        title: "Gagal",
        message:
          error.response?.data?.message || "Gagal mengembalikan buku",
        action: "",
        peminjamanId: null,
      });
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setUserData({
      nomor: "",
      nama: "",
    });
    setDataPeminjaman([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Pengembalian Buku
          </h1>

          <p className="text-gray-500 mt-2">
            Cari anggota dan proses pengembalian buku perpustakaan.
          </p>
        </div>

        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-pink-50 rounded-3xl p-8 border border-pink-100">
            <h2 className="text-2xl font-bold text-center mb-8">
              Data Anggota
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-semibold mb-2">
                  Nomor Anggota
                </label>

                <input
                  type="text"
                  name="nomor"
                  value={userData.nomor}
                  onChange={handleChange}
                  placeholder="Masukkan nomor anggota"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Nama Anggota
                </label>

                <input
                  type="text"
                  name="nama"
                  value={userData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama anggota"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="font-semibold mb-5">
                Silahkan lakukan scan QR kartu anggota
              </p>

              <Button onClick={handleCari} disabled={loading}>
                {loading ? "MENCARI..." : "CARI"}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <button
              onClick={handleReset}
              className="mb-8 text-pink-600 font-semibold hover:text-pink-700 transition"
            >
              ← Kembali
            </button>

            <div className="bg-pink-50 rounded-2xl p-6 mb-8 border border-pink-100">
              <h2 className="text-2xl font-bold mb-5">Data Anggota</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold mb-2">
                    Nomor Anggota
                  </label>

                  <input
                    value={userData.nomor}
                    readOnly
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Nama Anggota
                  </label>

                  <input
                    value={userData.nama}
                    readOnly
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Data Buku Dipinjam</h2>

            {dataPeminjaman.length === 0 ? (
              <div className="bg-green-100 text-green-700 rounded-2xl p-5 font-semibold text-center">
                Semua buku sudah dikembalikan.
              </div>
            ) : (
              <div className="space-y-5">
                {dataPeminjaman.map((item) => {
                  const details = getDetailPeminjaman(item);

                  return details.map((detail) => (
                    <div
                      key={`${item.id}-${detail.id}`}
                      className="bg-white border border-pink-100 rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={getGambarBuku(detail)}
                          alt={detail.buku?.judul || "Buku"}
                          onError={(e) => {
                            e.currentTarget.src = "/images/nailong.jpg";
                          }}
                          className="w-24 h-32 object-cover rounded-xl border bg-white"
                        />

                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {detail.buku?.judul || "-"}
                          </h3>

                          <p className="text-sm text-gray-600">
                            Kode Buku: {detail.buku?.kode_buku || "-"}
                          </p>

                          <p className="text-sm text-gray-600">
                            Tanggal Peminjaman: {item.tanggal_peminjaman}
                          </p>

                          <p className="mt-2 bg-pink-100 text-pink-700 font-semibold inline-block px-4 py-1 rounded-full">
                            Batas Pengembalian: {item.tanggal_pengembalian}
                          </p>
                        </div>
                      </div>

                      <Button
                        disabled={loading}
                        onClick={() => handleKonfirmasiPengembalian(item.id)}
                      >
                        Pengembalian
                      </Button>
                    </div>
                  ));
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <PopUp isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <h1 className="text-xl font-bold mb-4 text-center">
          {popupData.title}
        </h1>

        <p className="text-center mb-6">{popupData.message}</p>

        <div className="flex justify-center gap-4">
          {popupData.action === "kembalikan" ? (
            <>
              <Button
                onClick={() => {
                  setShowPopup(false);
                  handleKembalikan();
                }}
              >
                Ya
              </Button>

              <Button onClick={() => setShowPopup(false)}>Tidak</Button>
            </>
          ) : (
            <Button onClick={() => setShowPopup(false)}>OK</Button>
          )}
        </div>
      </PopUp>
    </div>
  );
}