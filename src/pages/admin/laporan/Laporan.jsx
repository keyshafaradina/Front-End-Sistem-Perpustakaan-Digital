import { useState } from "react";
import LaporanKunjungan from "./LaporanKunjungan";
import LaporanPeminjamanDanPengembalian from "./LaporanPeminjamanDanPengembalian";

export default function Laporan() {
  const [jenis, setJenis] = useState("kunjungan");

  return (
    <div className="bg-gray-100 min-h-screen p-7">

      <h1 className="text-3xl font-semibold mb-7">
        Laporan
      </h1>

      <div className="flex gap-4 mb-7">

        <button
          onClick={() => setJenis("kunjungan")}
          className={`px-4 py-2 rounded-lg text-lg ${
            jenis === "kunjungan" ? "bg-pink-300" : "bg-white border"
          }`}
        >
          Kunjungan
        </button>

        <button
          onClick={() => setJenis("peminjaman")}
          className={`px-4 py-2 rounded-lg text-lg ${
            jenis === "peminjaman" ? "bg-pink-300" : "bg-white border"
          }`}
        >
          Peminjaman & Pengembalian
        </button>

      </div>

      {jenis === "kunjungan" && <LaporanKunjungan />}
      {jenis === "peminjaman" && <LaporanPeminjamanDanPengembalian />}

    </div>
  );
}