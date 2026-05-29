import { useState } from "react";
import LaporanKunjungan from "./LaporanKunjungan";
import LaporanPeminjaman from "./LaporanPeminjaman";
import LaporanPengembalian from "./LaporanPengembalian";
import DataKunjungan from "./DataKunjungan";
import Button from "../../../components/ui/Button";

export default function Laporan() {
  const [showLanding, setShowLanding] = useState(true);
  const [jenis, setJenis] = useState("kunjungan");
  const [sudahScan, setSudahScan] = useState(false); // 🔥 tambahan

  return (
    <div className="min-h-screen p-6">

      {/* LANDING */}
      {showLanding ? (
        <div className="h-[80vh] flex flex-col justify-center items-center text-center">

          <h1 className="text-2xl font-semibold mb-6">
            Laporan Perpustakaan
          </h1>

          <img
            src="/images/logoperpus.png"
            alt="logo perpus"
            className="mx-auto w-60 h-60 mb-7"
          />

          <Button onClick={() => setShowLanding(false)}>
            Lihat Laporan
          </Button>

        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="mb-7">
            <h1 className="text-3xl font-semibold">Laporan</h1>
          </div>

          {/* TAB */}
          <div className="flex gap-4 mb-7">

            <button
              onClick={() => {
                setJenis("kunjungan");
                setSudahScan(false); // reset
              }}
              className={`px-4 py-2 rounded-lg text-lg ${
                jenis === "kunjungan"
                  ? "bg-pink-300"
                  : "bg-white border"
              }`}
            >
              Kunjungan
            </button>

            <button
              onClick={() => setJenis("peminjaman")}
              className={`px-4 py-2 rounded-lg text-lg ${
                jenis === "peminjaman"
                  ? "bg-pink-300"
                  : "bg-white border"
              }`}
            >
              Peminjaman
            </button>

            <button
              onClick={() => setJenis("pengembalian")}
              className={`px-4 py-2 rounded-lg text-lg ${
                jenis === "pengembalian"
                  ? "bg-pink-300"
                  : "bg-white border"
              }`}
            >
              Pengembalian
            </button>

          </div>

          {/* CONTENT */}

          {/* KUNJUNGAN (FLOW) */}
          {jenis === "kunjungan" && !sudahScan && (
            <DataKunjungan onScan={() => setSudahScan(true)} />
          )}

          {jenis === "kunjungan" && sudahScan && (
            <LaporanKunjungan />
          )}

          {/* lainnya */}
          {jenis === "peminjaman" && <LaporanPeminjaman />}
          {jenis === "pengembalian" && <LaporanPengembalian />}

        </>
      )}

    </div>
  );
}