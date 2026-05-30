import { useState } from "react";
import Button from "../../../components/ui/Button";
import LaporanKunjungan from "./LaporanKunjungan";
import LaporanPeminjamanDanPengembalian from "./LaporanPeminjamanDanPengembalian";
import LaporanPengembalian from "./LaporanPengembalian";
import FormKunjunganPerpustakaan from "./FormKunjunganPerpustakaan";

export default function Laporan() {
  const [halaman, setHalaman] = useState("landing");
  const [jenis, setJenis] = useState("kunjungan");

  if (halaman === "formKunjungan") {
    return (
      <FormKunjunganPerpustakaan
        onSelesai={() => setHalaman("landing")}
      />
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-white">
      {halaman === "landing" ? (
        <div className="min-h-[80vh] flex justify-center items-center">
          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-10 w-full max-w-2xl text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              Laporan Perpustakaan
            </h1>

            <p className="text-gray-500 mb-8">
              Pilih menu yang ingin diakses
            </p>

            <img
              src="/images/logoperpus.png"
              alt="Logo Perpustakaan"
              className="w-64 h-64 mx-auto mb-8 object-contain"
            />

            <div className="flex flex-col items-center gap-4">
              <Button onClick={() => setHalaman("formKunjungan")}>
                Kunjungan Perpustakaan
              </Button>

              <Button onClick={() => setHalaman("laporan")}>
                Laporan Perpustakaan
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-8">
          <button
            onClick={() => setHalaman("landing")}
            className="mb-6 text-pink-600 font-semibold hover:text-pink-700 transition"
          >
            ← Kembali
          </button>

          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Laporan Perpustakaan
          </h1>

          <div className="flex gap-4 mb-8 bg-pink-50 p-3 rounded-2xl w-fit">
            <button
              onClick={() => setJenis("kunjungan")}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition ${
                jenis === "kunjungan"
                  ? "bg-pink-400 text-white shadow-md"
                  : "bg-white border text-gray-700"
              }`}
            >
              Kunjungan
            </button>

            <button
              onClick={() => setJenis("peminjaman")}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition ${
                jenis === "peminjaman"
                  ? "bg-pink-400 text-white shadow-md"
                  : "bg-white border text-gray-700"
              }`}
            >
              Peminjaman
            </button>

            <button
              onClick={() => setJenis("pengembalian")}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition ${
                jenis === "pengembalian"
                  ? "bg-pink-400 text-white shadow-md"
                  : "bg-white border text-gray-700"
              }`}
            >
              Pengembalian
            </button>
          </div>

          {jenis === "kunjungan" && <LaporanKunjungan />}
          {jenis === "peminjaman" && (
            <LaporanPeminjamanDanPengembalian />
          )}
          {jenis === "pengembalian" && (
            <LaporanPengembalian />
          )}
        </div>
      )}
    </div>
  );
}