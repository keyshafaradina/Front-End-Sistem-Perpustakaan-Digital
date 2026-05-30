import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { Link, useLocation } from "react-router-dom";
import api from "../../../services/api";

export default function RiwayatPeminjaman() {
  const location = useLocation();
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    getRiwayatPeminjaman();
  }, []);

  useEffect(() => {
    if (location.state) {
      setRiwayat((prev) =>
        prev.map((item) =>
          item.id === location.state.id
            ? {
                ...item,
                status: location.state.status,
                status_perpanjangan: location.state.status_perpanjangan,
                tanggal_perpanjangan: location.state.tanggal_perpanjangan,
                tanggal_pengembalian_baru:
                  location.state.tanggal_pengembalian_baru,
              }
            : item
        )
      );
    }
  }, [location.state]);

  const getRiwayatPeminjaman = async () => {
    try {
      const res = await api.get("/peminjaman");
      const semuaData = res.data.data || [];

      const dataAnggota = semuaData.filter((item) => {
        const status = item.status || "";
        return status === "dipinjam" || status === "dikembalikan";
      });

      setRiwayat(dataAnggota);
    } catch (error) {
      console.error("Gagal mengambil riwayat peminjaman:", error);
      setRiwayat([]);
    }
  };

  const getBuku = (item) => {
    return (
      item.detail_peminjaman?.[0]?.buku ||
      item.detailPeminjaman?.[0]?.buku ||
      item.detail_peminjamans?.[0]?.buku ||
      item.details?.[0]?.buku ||
      item.buku ||
      null
    );
  };

  const getTitle = (item) => {
    const buku = getBuku(item);

    return (
      buku?.judul ||
      buku?.title ||
      buku?.nama_buku ||
      item.judul ||
      item.title ||
      item.nama_buku ||
      "-"
    );
  };

  const getImage = (item) => {
    const buku = getBuku(item);

    const gambar =
      buku?.gambar ||
      buku?.foto ||
      buku?.cover ||
      buku?.image ||
      buku?.sampul ||
      item.gambar ||
      item.foto ||
      item.cover ||
      item.image ||
      item.sampul;

    if (!gambar) return "/images/nailong.jpg";
    if (gambar.startsWith("http")) return gambar;

    return `http://127.0.0.1:8000/uploads/buku/${gambar}`;
  };

  const getTanggalPeminjaman = (item) => {
    return (
      item.tanggal_peminjaman ||
      item.peminjaman ||
      item.tgl_peminjaman ||
      "-"
    );
  };

  const getTanggalPengembalian = (item) => {
    return (
      item.tanggal_pengembalian_baru ||
      item.tanggal_pengembalian ||
      item.pengembalian ||
      item.tgl_pengembalian ||
      "-"
    );
  };

  const getStatus = (item) => {
    const statusPeminjaman = item.status || "dipinjam";
    const statusPerpanjangan = item.status_perpanjangan || "belum";

    if (statusPeminjaman === "dikembalikan") {
      return "dikembalikan";
    }

    if (statusPerpanjangan === "diajukan") {
      return "diajukan";
    }

    if (
      statusPerpanjangan === "diperpanjang" ||
      statusPerpanjangan === "disetujui"
    ) {
      return "diperpanjang";
    }

    if (
      statusPerpanjangan === "tidak disetujui" ||
      statusPerpanjangan === "ditolak"
    ) {
      return "tidak disetujui";
    }

    return "dipinjam";
  };

  const getStatusStyle = (status) => {
    if (status === "dikembalikan") {
      return "bg-gray-100 text-gray-600 border-gray-200";
    }

    if (status === "diajukan") {
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }

    if (status === "diperpanjang") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    if (status === "tidak disetujui") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    return "bg-pink-100 text-pink-700 border-pink-200";
  };

  const getStatusText = (status) => {
    if (status === "dikembalikan") return "Sudah Dikembalikan";
    if (status === "diajukan") return "Menunggu Konfirmasi";
    if (status === "diperpanjang") return "Diperpanjang";
    if (status === "tidak disetujui") return "Tidak Disetujui";
    return "Sedang Dipinjam";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-pink-500">
            Borrowing History
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-gray-800">
            Riwayat Peminjaman
          </h1>

          <p className="mt-2 text-gray-500">
            Lihat daftar buku yang sedang atau pernah kamu pinjam.
          </p>
        </div>

        {riwayat.length > 0 ? (
          <div className="flex flex-col gap-5">
            {riwayat.map((item, index) => {
              const status = getStatus(item);

              return (
                <div
                  key={item.id || index}
                  className="group overflow-hidden rounded-[32px] border border-white bg-white/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className="mx-auto h-40 w-28 shrink-0 overflow-hidden rounded-2xl bg-pink-100 shadow-md sm:mx-0">
                        <img
                          src={getImage(item)}
                          alt={getTitle(item)}
                          onError={(e) => {
                            e.currentTarget.src = "/images/nailong.jpg";
                          }}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="text-center sm:text-left">
                        <div
                          className={`mb-3 inline-flex rounded-full border px-4 py-1 text-sm font-bold ${getStatusStyle(
                            status
                          )}`}
                        >
                          {getStatusText(status)}
                        </div>

                        <h2 className="text-2xl font-extrabold text-gray-800">
                          {getTitle(item)}
                        </h2>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <DateInfo
                            label="Tanggal Peminjaman"
                            value={getTanggalPeminjaman(item)}
                          />

                          <DateInfo
                            label="Tanggal Pengembalian"
                            value={getTanggalPengembalian(item)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                      {status === "dipinjam" && (
                        <Link to="/ajukanperpanjangan" state={item}>
                          <Button className="rounded-2xl bg-pink-400 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-pink-500">
                            AJUKAN PERPANJANGAN
                          </Button>
                        </Link>
                      )}

                      {status === "diajukan" && (
                        <div className="rounded-2xl bg-yellow-100 px-6 py-3 text-sm font-bold text-yellow-700">
                          MENUNGGU KONFIRMASI
                        </div>
                      )}

                      {status === "diperpanjang" && (
                        <div className="rounded-2xl bg-green-100 px-6 py-3 text-sm font-bold text-green-700">
                          DIPERPANJANG
                        </div>
                      )}

                      {status === "tidak disetujui" && (
                        <div className="rounded-2xl bg-red-100 px-6 py-3 text-sm font-bold text-red-700">
                          TIDAK DISETUJUI
                        </div>
                      )}

                      {status === "dikembalikan" && (
                        <div className="rounded-2xl bg-gray-100 px-6 py-3 text-sm font-bold text-gray-600">
                          SELESAI
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mt-16 max-w-md rounded-[32px] border border-pink-100 bg-white/80 p-10 text-center shadow-lg">
            <div className="mb-4 text-6xl">📚</div>

            <h2 className="text-2xl font-bold text-gray-800">
              Belum Ada Riwayat
            </h2>

            <p className="mt-2 text-gray-500">
              Riwayat peminjaman buku akan muncul di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DateInfo({ label, value }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-pink-50/70 px-4 py-3">
      <p className="text-xs font-semibold text-pink-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
}