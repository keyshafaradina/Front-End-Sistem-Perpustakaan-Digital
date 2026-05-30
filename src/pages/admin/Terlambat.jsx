import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import PopUp from "../../components/ui/PopUp";
import Button from "../../components/ui/Button";
import api from "../../services/api";

export default function Terlambat() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });

  const getTerlambat = async () => {
    try {
      setLoading(true);

      const res = await api.get("/dashboard/terlambat");
      setData(res.data.data || []);
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message: "Gagal mengambil data buku terlambat",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTerlambat();
  }, []);

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const hitungTelat = (tanggalPengembalian) => {
    if (!tanggalPengembalian) return 0;

    const hariIni = new Date();
    const jatuhTempo = new Date(tanggalPengembalian);

    hariIni.setHours(0, 0, 0, 0);
    jatuhTempo.setHours(0, 0, 0, 0);

    const selisih = hariIni - jatuhTempo;
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));

    return hari > 0 ? hari : 0;
  };

  const getNama = (item) => {
    return item.anggota?.nama_lengkap || item.anggota?.nama || item.nama || "-";
  };

  const getBuku = (item) => {
    return (
      item.detail_peminjaman?.[0]?.buku?.judul ||
      item.detailPeminjaman?.[0]?.buku?.judul ||
      item.buku ||
      "-"
    );
  };

  const openConfirm = (item) => {
    setSelected(item);
    setPopup({
      open: true,
      type: "confirm",
      title: "Konfirmasi",
      message: `Tandai buku "${getBuku(item)}" milik ${getNama(
        item
      )} sudah dikembalikan?`,
    });
  };

  const handleKembalikan = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      const today = new Date().toISOString().split("T")[0];

      await api.put(`/peminjaman/${selected.id}/kembalikan`, {
        tanggal_dikembalikan: today,
      });

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message: "Buku berhasil ditandai sudah dikembalikan",
      });

      setSelected(null);
      getTerlambat();
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message:
          error.response?.data?.message ||
          "Gagal mengembalikan buku",
      });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup({
      open: false,
      type: "",
      title: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/dashboardadmin")}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-4 transition"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Daftar Buku Terlambat
              </h1>

              <p className="text-gray-500 mt-2">
                Data peminjaman yang sudah melewati jatuh tempo
              </p>
            </div>

            <div className="bg-red-50 text-red-500 border border-red-100 rounded-2xl px-5 py-3 flex items-center gap-2 font-bold">
              <AlertTriangle size={20} />
              {data.length} Terlambat
            </div>
          </div>

          {loading && (
            <div className="text-center py-12 font-semibold text-gray-500">
              Memuat data terlambat...
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="bg-pink-50 border border-pink-100 rounded-3xl p-12 text-center">
              <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />

              <h2 className="text-2xl font-bold text-gray-700">
                Tidak ada buku terlambat
              </h2>

              <p className="text-gray-500 mt-2">
                Semua buku masih dalam batas waktu pengembalian.
              </p>
            </div>
          )}

          {!loading && data.length > 0 && (
            <div className="overflow-x-auto rounded-3xl border border-pink-100">
              <table className="w-full text-sm border-collapse bg-white">
                <thead className="bg-pink-100 text-gray-700">
                  <tr>
                    <th className="p-4 text-left">Nama</th>
                    <th className="p-4 text-left">Buku</th>
                    <th className="p-4 text-left">Tanggal Pinjam</th>
                    <th className="p-4 text-left">Jatuh Tempo</th>
                    <th className="p-4 text-center">Telat</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => {
                    const telat = hitungTelat(item.tanggal_pengembalian);

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-pink-50 hover:bg-pink-50 transition"
                      >
                        <td className="p-4 font-semibold text-gray-800">
                          {getNama(item)}
                        </td>

                        <td className="p-4 text-gray-700">
                          {getBuku(item)}
                        </td>

                        <td className="p-4 text-gray-700">
                          {formatTanggal(item.tanggal_peminjaman)}
                        </td>

                        <td className="p-4 text-gray-700">
                          {formatTanggal(item.tanggal_pengembalian)}
                        </td>

                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1 rounded-full font-bold">
                            <Clock size={14} />
                            {telat} hari
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                            Terlambat
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openConfirm(item)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                            >
                              Sudah Kembali
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <PopUp isOpen={popup.open} onClose={closePopup}>
        <div className="text-center min-w-[320px] max-w-md">
          <h2 className="text-xl font-bold mb-4">
            {popup.title}
          </h2>

          <p className="mb-6">
            {popup.message}
          </p>

          {popup.type === "confirm" ? (
            <div className="flex justify-center gap-4">
              <Button onClick={handleKembalikan}>
                Ya
              </Button>

              <Button onClick={closePopup}>
                Batal
              </Button>
            </div>
          ) : (
            <Button onClick={closePopup}>
              OK
            </Button>
          )}
        </div>
      </PopUp>
    </div>
  );
}