import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, RefreshCcw } from "lucide-react";
import Button from "../../components/ui/Button";
import PopUp from "../../components/ui/PopUp";
import api from "../../services/api";

export default function Perpanjangan() {
  const navigate = useNavigate();

  const [daftarPengajuan, setDaftarPengajuan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    action: "",
  });

  const getPerpanjangan = async () => {
    try {
      setLoading(true);
      const res = await api.get("/perpanjangan");
      setDaftarPengajuan(res.data.data || []);
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message: "Gagal mengambil data perpanjangan",
        action: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerpanjangan();
  }, []);

  const jumlahMenunggu = daftarPengajuan.filter(
    (item) => item.status_perpanjangan === "diajukan"
  ).length;

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

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const tanggalBaru = (item) => {
    if (item.status_perpanjangan === "diperpanjang") {
      return item.tanggal_pengembalian;
    }

    if (item.status_perpanjangan === "tidak disetujui") {
      return item.tanggal_perpanjangan || item.tanggal_pengembalian;
    }

    return item.tanggal_pengembalian_baru || item.tanggal_perpanjangan || null;
  };

  const getStatus = (item) => {
    return item.status_perpanjangan || "diajukan";
  };

  const getStatusText = (status) => {
    if (status === "diperpanjang") return "Diperpanjang";
    if (status === "tidak disetujui") return "Tidak Disetujui";
    if (status === "ditolak") return "Tidak Disetujui";
    if (status === "disetujui") return "Diperpanjang";
    return "Menunggu";
  };

  const getStatusClass = (status) => {
    if (status === "diperpanjang" || status === "disetujui") {
      return "bg-green-100 text-green-700";
    }

    if (status === "tidak disetujui" || status === "ditolak") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const openConfirm = (item, action) => {
    setSelected(item);

    setPopup({
      open: true,
      type: "confirm",
      title: "Konfirmasi",
      message:
        action === "setuju"
          ? `Setujui perpanjangan buku "${getBuku(item)}"?`
          : `Tolak permohonan perpanjangan buku "${getBuku(item)}"?`,
      action,
    });
  };

  const handleAction = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      if (popup.action === "setuju") {
        await api.put(`/perpanjangan/${selected.id}/setujui`);
      }

      if (popup.action === "tolak") {
        await api.put(`/perpanjangan/${selected.id}/tolak`);
      }

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message:
          popup.action === "setuju"
            ? "Perpanjangan berhasil disetujui"
            : "Permohonan perpanjangan berhasil ditolak",
        action: "",
      });

      setSelected(null);
      await getPerpanjangan();
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message:
          error.response?.data?.message || "Gagal memproses perpanjangan",
        action: "",
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
      action: "",
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
                Perpanjangan Buku
              </h1>

              <p className="text-gray-500 mt-2">
                Kelola permohonan perpanjangan peminjaman buku
              </p>
            </div>

            <div className="bg-pink-100 text-pink-600 rounded-2xl px-5 py-3 flex items-center gap-2 font-bold">
              <RefreshCcw size={20} />
              {jumlahMenunggu} Pengajuan
            </div>
          </div>

          {loading && (
            <div className="text-center py-12 font-semibold text-gray-500">
              Memuat data perpanjangan...
            </div>
          )}

          {!loading && daftarPengajuan.length === 0 && (
            <div className="bg-pink-50 border border-pink-100 rounded-3xl p-12 text-center">
              <RefreshCcw size={56} className="mx-auto text-pink-400 mb-4" />

              <h2 className="text-2xl font-bold text-gray-700">
                Tidak ada permohonan perpanjangan
              </h2>

              <p className="text-gray-500 mt-2">
                Semua permohonan sudah diproses.
              </p>
            </div>
          )}

          {!loading && daftarPengajuan.length > 0 && (
            <div className="overflow-x-auto rounded-3xl border border-pink-100">
              <table className="w-full text-sm border-collapse bg-white">
                <thead className="bg-pink-100 text-gray-700">
                  <tr>
                    <th className="p-4 text-left">Nama Peminjam</th>
                    <th className="p-4 text-left">Judul Buku</th>
                    <th className="p-4 text-center">Tgl Kembali Awal</th>
                    <th className="p-4 text-center">Tgl Perpanjangan</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {daftarPengajuan.map((item) => {
                    const status = getStatus(item);

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-pink-50 hover:bg-pink-50 transition"
                      >
                        <td className="p-4 font-bold text-gray-800">
                          {getNama(item)}
                        </td>

                        <td className="p-4 text-gray-700">{getBuku(item)}</td>

                        <td className="p-4 text-center text-red-500 font-semibold">
                          {formatTanggal(item.tanggal_pengembalian)}
                        </td>

                        <td className="p-4 text-center text-green-600 font-bold">
                          {formatTanggal(tanggalBaru(item))}
                        </td>

                        <td className="p-4 text-center">
                          <span
                            className={`${getStatusClass(
                              status
                            )} px-3 py-1 rounded-full text-xs font-bold`}
                          >
                            {getStatusText(status)}
                          </span>
                        </td>

                        <td className="p-4">
                          {status === "diajukan" ? (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => openConfirm(item, "setuju")}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-1 transition"
                              >
                                <Check size={16} />
                                Setuju
                              </button>

                              <button
                                onClick={() => openConfirm(item, "tolak")}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-1 transition"
                              >
                                <X size={16} />
                                Tolak
                              </button>
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 font-semibold">
                              Selesai
                            </div>
                          )}
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
          <h2 className="text-xl font-bold mb-4">{popup.title}</h2>

          <p className="mb-6">{popup.message}</p>

          {popup.type === "confirm" ? (
            <div className="flex justify-center gap-4">
              <Button onClick={closePopup}>Tidak</Button>
              <Button onClick={handleAction}>Ya</Button>
            </div>
          ) : (
            <Button onClick={closePopup}>OK</Button>
          )}
        </div>
      </PopUp>
    </div>
  );
}