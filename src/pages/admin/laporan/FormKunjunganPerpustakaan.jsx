import { useState } from "react";
import api from "../../../services/api";

export default function FormKunjunganPerpustakaan({ onSelesai }) {
  const [nomorAnggota, setNomorAnggota] = useState("");
  const [nama, setNama] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!nomorAnggota) {
      setMessage("Nomor anggota wajib diisi");
      return;
    }

    if (!nama) {
      setMessage("Nama wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/laporan/kunjungan/simpan", {
        nomor_anggota: nomorAnggota,
        nama: nama,
      });

      setMessage(res.data.message || "Kunjungan berhasil disimpan");

      setNomorAnggota("");
      setNama("");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Gagal menyimpan kunjungan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-10 relative">

          {/* Tombol Kembali */}
          <button
            onClick={onSelesai}
            className="absolute top-6 left-6 text-pink-600 font-semibold hover:text-pink-700 transition"
          >
            ← Kembali
          </button>

          {/* Judul */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">
              Kunjungan Perpustakaan
            </h1>

            <p className="text-gray-500 mt-2">
              Registrasi kunjungan anggota perpustakaan
            </p>
          </div>

          {/* Form */}
          <div className="bg-pink-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Data Anggota
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Nomor Anggota
                </label>

                <input
                  type="text"
                  value={nomorAnggota}
                  onChange={(e) =>
                    setNomorAnggota(e.target.value)
                  }
                  placeholder="Masukkan nomor anggota"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Nama Anggota
                </label>

                <input
                  type="text"
                  value={nama}
                  onChange={(e) =>
                    setNama(e.target.value)
                  }
                  placeholder="Masukkan nama anggota"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
          </div>

          {/* Scan */}
          <div className="text-center mt-10">
            <h3 className="text-2xl font-bold mb-6">
              Scan QR Kartu Anggota
            </h3>

            <button
              onClick={handleScan}
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-10 py-3 rounded-xl shadow-md transition"
            >
              {loading ? "MENYIMPAN..." : "SCAN"}
            </button>
          </div>

          {/* Pesan */}
          {message && (
            <div
              className={`mt-8 text-center p-4 rounded-xl font-semibold ${
                message.includes("berhasil")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}