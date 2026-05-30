import { useState } from "react";
import PopUp from "../../../components/ui/PopUp";
import { useLocation, useNavigate, Link } from "react-router-dom";
import KotakInput from "../../../components/ui/KotakInput";
import Button from "../../../components/ui/Button";
import api from "../../../services/api";

export default function AjukanPerpanjangan() {
  const location = useLocation();
  const navigate = useNavigate();

  const peminjaman = location.state || {};

  const [tanggalPerpanjangan, setTanggalPerpanjangan] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "",
  });

  const getBuku = () => {
    return (
      peminjaman.detail_peminjaman?.[0]?.buku ||
      peminjaman.detailPeminjaman?.[0]?.buku ||
      peminjaman.detail_peminjamans?.[0]?.buku ||
      peminjaman.buku ||
      null
    );
  };

  const dataBuku = getBuku();

  const getTitle = () => {
    return dataBuku?.judul || peminjaman.judul || "-";
  };

  const getImage = () => {
    const gambar = dataBuku?.gambar || peminjaman.gambar;

    if (!gambar) return "/images/nailong.jpg";
    if (gambar.startsWith("http")) return gambar;

    return `http://127.0.0.1:8000/uploads/buku/${gambar}`;
  };

  const getTanggalPeminjaman = () => {
    return peminjaman.tanggal_peminjaman || "-";
  };

  const getTanggalPengembalian = () => {
    return (
      peminjaman.tanggal_pengembalian_baru ||
      peminjaman.tanggal_pengembalian ||
      "-"
    );
  };

  const formatDate = (date) => {
    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, "0");
    const tanggal = String(date.getDate()).padStart(2, "0");

    return `${tahun}-${bulan}-${tanggal}`;
  };

  const parseDate = (dateString) => {
    if (!dateString || dateString === "-") return new Date();

    const parts = dateString.split("-");

    if (parts[0].length === 4) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const tanggalOptions = [];
  const tanggalAcuan = parseDate(getTanggalPengembalian());

  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(tanggalAcuan);
    nextDate.setDate(tanggalAcuan.getDate() + i);
    tanggalOptions.push(formatDate(nextDate));
  }

  const closePopup = () => {
    setPopup({
      show: false,
      title: "",
      message: "",
      type: "",
    });
  };

  const handleAjukan = () => {
    if (!tanggalPerpanjangan) {
      setPopup({
        show: true,
        title: "Peringatan",
        message: "Harap isi tanggal perpanjangan terlebih dahulu.",
        type: "warning",
      });
      return;
    }

    setPopup({
      show: true,
      title: "Konfirmasi",
      message: "Apakah kamu yakin ingin mengajukan perpanjangan?",
      type: "confirm",
    });
  };

  const handleSetuju = async () => {
    try {
      await api.post(`/perpanjangan/${peminjaman.id}/ajukan`, {
        tanggal_perpanjangan: tanggalPerpanjangan,
      });

      setPopup({
        show: true,
        title: "Berhasil",
        message: "Pengajuan perpanjangan berhasil dikirim.",
        type: "success",
      });
    } catch (error) {
      setPopup({
        show: true,
        title: "Gagal",
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Gagal mengajukan perpanjangan.",
        type: "error",
      });
    }
  };

  const handlePopupOk = () => {
    if (popup.type === "success") {
      navigate("/riwayatpeminjaman");
    } else {
      closePopup();
    }
  };

  if (!peminjaman || Object.keys(peminjaman).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Data buku tidak ditemukan
          </h1>

          <Link
            to="/riwayatpeminjaman"
            className="inline-block mt-5 text-pink-500 font-semibold hover:text-pink-600"
          >
            Kembali ke riwayat peminjaman
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            to="/riwayatpeminjaman"
            className="text-pink-500 font-semibold hover:text-pink-600"
          >
            ← Kembali
          </Link>

          <h1 className="mt-6 text-4xl font-extrabold text-gray-800">
            Ajukan Perpanjangan
          </h1>

          <p className="mt-2 text-gray-500">
            Pilih tanggal perpanjangan untuk buku yang sedang kamu pinjam.
          </p>
        </div>

        <div className="rounded-[40px] border border-white bg-white/80 p-8 shadow-2xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] items-start">
            <div className="flex justify-center">
              <div className="w-[300px] rounded-[32px] bg-white p-4 shadow-xl">
                <img
                  src={getImage()}
                  alt={getTitle()}
                  onError={(e) => {
                    e.currentTarget.src = "/images/nailong.jpg";
                  }}
                  className="h-[420px] w-full rounded-[24px] object-cover shadow-md"
                />

                <div className="mt-5 rounded-2xl bg-pink-100 px-4 py-4 text-center">
                  <p className="text-sm font-semibold text-pink-500">
                    Judul Buku
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                    {getTitle()}
                  </h2>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-3xl font-extrabold text-gray-800">
                Detail Perpanjangan
              </h2>

              <div className="grid grid-cols-1 gap-5">
                <KotakInput
                  label="Tanggal Peminjaman"
                  type="text"
                  value={getTanggalPeminjaman()}
                  disabled
                />

                <KotakInput
                  label="Tanggal Pengembalian"
                  type="text"
                  value={getTanggalPengembalian()}
                  disabled
                />

                <KotakInput
                  label="Tanggal Perpanjangan"
                  type="select"
                  value={tanggalPerpanjangan}
                  onChange={(e) => setTanggalPerpanjangan(e.target.value)}
                  options={tanggalOptions}
                />
              </div>

              <div className="mt-8 rounded-3xl bg-pink-50 p-5 border border-pink-100">
                <h3 className="text-lg font-bold text-gray-800">Catatan</h3>

                <p className="mt-2 text-gray-500">
                  Perpanjangan hanya dapat dipilih maksimal 7 hari setelah
                  tanggal pengembalian.
                </p>
              </div>

              <Button
                onClick={handleAjukan}
                className="mt-8 w-full rounded-2xl bg-pink-500 py-4 text-lg font-bold text-white shadow-lg hover:bg-pink-600"
              >
                AJUKAN PERPANJANGAN
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PopUp isOpen={popup.show} onClose={closePopup}>
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-extrabold text-gray-800">
            {popup.title}
          </h2>

          <p className="mb-6 text-gray-600">{popup.message}</p>

          {popup.type === "confirm" ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={closePopup}
                className="min-w-[180px] rounded-[24px] bg-pink-500 py-4 text-xl font-bold text-white shadow-lg transition hover:bg-pink-600"
              >
                Batal
              </button>

              <button
                onClick={handleSetuju}
                className="min-w-[180px] rounded-[24px] bg-pink-500 py-4 text-xl font-bold text-white shadow-lg transition hover:bg-pink-600"
              >
                Ya, Ajukan
              </button>
            </div>
          ) : (
            <Button
              onClick={handlePopupOk}
              className="min-w-[180px] rounded-[24px] bg-pink-500 py-4 text-xl font-bold text-white shadow-lg transition hover:bg-pink-600"
            >
              OK
            </Button>
          )}
        </div>
      </PopUp>
    </div>
  );
}