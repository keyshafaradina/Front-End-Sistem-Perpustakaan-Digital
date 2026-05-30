import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Eye, Trash2, Users } from "lucide-react";
import Button from "../../components/ui/Button";
import PopUp from "../../components/ui/PopUp";
import api from "../../services/api";

export default function Anggota() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });

  const getAnggota = async () => {
    try {
      setLoading(true);

      const res = await api.get("/anggota");
      setData(res.data.data || []);
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message: "Gagal mengambil data anggota",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnggota();
  }, []);

  const filtered = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.nama_lengkap?.toLowerCase().includes(keyword) ||
      item.nama?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.nomor_anggota?.toLowerCase().includes(keyword)
    );
  });

  const getNama = (item) => {
    return item.nama_lengkap || item.nama || "-";
  };

  const getFoto = (foto) => {
    if (!foto) {
      return "/images/nailong.jpg";
    }

    if (foto.startsWith("http")) {
      return foto;
    }

    if (foto.startsWith("/uploads")) {
      return `http://127.0.0.1:8000${foto}`;
    }

    return `http://127.0.0.1:8000/uploads/profile/${foto}`;
  };

  const openDetail = (item) => {
    setSelected(item);
    setPopup({
      open: true,
      type: "detail",
      title: "Detail Anggota",
      message: "",
    });
  };

  const openDelete = (item) => {
    setSelected(item);
    setPopup({
      open: true,
      type: "delete",
      title: "Konfirmasi",
      message: `Yakin ingin menghapus anggota "${getNama(item)}"?`,
    });
  };

  const handleDelete = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      await api.delete(`/anggota/${selected.id}`);

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message: "Data anggota berhasil dihapus",
      });

      setSelected(null);
      getAnggota();
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message:
          error.response?.data?.message ||
          "Gagal menghapus data anggota",
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
                Data Anggota
              </h1>

              <p className="text-gray-500 mt-2">
                Kelola data anggota perpustakaan
              </p>
            </div>

            <div className="bg-pink-100 text-pink-600 rounded-2xl px-5 py-3 flex items-center gap-2 font-bold">
              <Users size={20} />
              {data.length} Anggota
            </div>
          </div>

          <div className="mb-8">
            <div className="relative max-w-xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Cari nama, email, atau nomor anggota..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          {loading && (
            <div className="text-center py-10 font-semibold text-gray-500">
              Memuat data anggota...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="bg-pink-50 border border-pink-100 rounded-3xl p-10 text-center">
              <Users size={52} className="mx-auto text-pink-400 mb-4" />

              <h2 className="text-2xl font-bold text-gray-700">
                Data anggota tidak ditemukan
              </h2>

              <p className="text-gray-500 mt-2">
                Belum ada data anggota atau kata kunci tidak sesuai.
              </p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="overflow-x-auto rounded-3xl border border-pink-100">
              <table className="w-full text-sm border-collapse bg-white">
                <thead className="bg-pink-100 text-gray-700">
                  <tr>
                    <th className="p-4 text-center">No</th>
                    <th className="p-4 text-left">Anggota</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Nomor Anggota</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-pink-50 hover:bg-pink-50 transition"
                    >
                      <td className="p-4 text-center font-semibold">
                        {index + 1}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={getFoto(
                              item.foto || item.gambar || item.profile
                            )}
                            alt={getNama(item)}
                            onError={(e) => {
                              e.currentTarget.src = "/images/nailong.jpg";
                            }}
                            className="w-11 h-11 rounded-full object-cover border border-pink-100"
                          />

                          <div>
                            <p className="font-bold text-gray-800">
                              {getNama(item)}
                            </p>

                            <p className="text-xs text-gray-500">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-gray-700">
                        {item.email || "-"}
                      </td>

                      <td className="p-4 text-gray-700">
                        {item.nomor_anggota || "-"}
                      </td>

                      <td className="p-4 text-center">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          Aktif
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openDetail(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl font-semibold flex items-center gap-1 transition"
                          >
                            <Eye size={16} />
                            Lihat
                          </button>

                          <button
                            onClick={() => openDelete(item)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl font-semibold flex items-center gap-1 transition"
                          >
                            <Trash2 size={16} />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

          {popup.type === "detail" && selected ? (
            <div>
              <img
                src={getFoto(
                  selected.foto || selected.gambar || selected.profile
                )}
                alt={getNama(selected)}
                onError={(e) => {
                  e.currentTarget.src = "/images/nailong.jpg";
                }}
                className="w-24 h-24 rounded-full object-cover mx-auto border border-pink-100 mb-4"
              />

              <div className="text-left bg-pink-50 rounded-2xl p-4 space-y-2">
                <p>
                  <span className="font-bold">Nama:</span>{" "}
                  {getNama(selected)}
                </p>

                <p>
                  <span className="font-bold">Email:</span>{" "}
                  {selected.email || "-"}
                </p>

                <p>
                  <span className="font-bold">Nomor Anggota:</span>{" "}
                  {selected.nomor_anggota || "-"}
                </p>

                <p>
                  <span className="font-bold">Status:</span> Aktif
                </p>
              </div>

              <Button onClick={closePopup} className="mt-5">
                Tutup
              </Button>
            </div>
          ) : popup.type === "delete" ? (
            <div>
              <p className="mb-6">
                {popup.message}
              </p>

              <div className="flex justify-center gap-4">
                <Button onClick={closePopup}>
                  Batal
                </Button>

                <Button onClick={handleDelete}>
                  Hapus
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-6">
                {popup.message}
              </p>

              <Button onClick={closePopup}>
                OK
              </Button>
            </div>
          )}
        </div>
      </PopUp>
    </div>
  );
}