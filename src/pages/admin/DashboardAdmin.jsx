import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  BookMarked,
  AlertTriangle,
  Library,
  User,
  ClipboardList,
  RotateCcw,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import api from "../../services/api";

export default function DashboardAdmin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [statistik, setStatistik] = useState({
    buku: 0,
    anggota: 0,
    dipinjam: 0,
    terlambat: 0,
  });

  const [bukuPopuler, setBukuPopuler] = useState([]);

  const getDashboard = async () => {
    try {
      setLoading(true);

      const [bukuRes, anggotaRes, peminjamanRes, populerRes] =
        await Promise.all([
          api.get("/buku"),
          api.get("/anggota"),
          api.get("/peminjaman"),
          api.get("/dashboard/buku-populer"),
        ]);

      const dataBuku = bukuRes.data.data || [];
      const dataAnggota = anggotaRes.data.data || [];
      const dataPeminjaman = peminjamanRes.data.data || [];
      const dataPopuler = populerRes.data.data || [];

      const dipinjam = dataPeminjaman.filter(
        (item) =>
          item.status === "dipinjam" && item.tanggal_dikembalikan === null
      );

      const hariIni = new Date();

      const terlambat = dipinjam.filter((item) => {
        if (!item.tanggal_pengembalian) return false;

        const batasKembali = new Date(item.tanggal_pengembalian);
        return batasKembali < hariIni;
      });

      setStatistik({
        buku: dataBuku.length,
        anggota: dataAnggota.length,
        dipinjam: dipinjam.length,
        terlambat: terlambat.length,
      });

      setBukuPopuler(dataPopuler.slice(0, 3));
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const cards = [
    {
      title: "Buku",
      value: statistik.buku,
      icon: BookOpen,
      color: "text-pink-500",
    },
    {
      title: "Total Anggota",
      value: statistik.anggota,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Dipinjam",
      value: statistik.dipinjam,
      icon: BookMarked,
      color: "text-purple-500",
    },
    {
      title: "Terlambat",
      value: statistik.terlambat,
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  const menuCepat = [
    {
      label: "Edit Dashboard",
      icon: LayoutDashboard,
      route: "/admin/dashboard-setting",
    },
    {
      label: "Kelola Buku",
      icon: Library,
      route: "/kelolabuku",
    },
    {
      label: "Anggota",
      icon: User,
      route: "/anggota",
    },
    {
      label: "Peminjaman",
      icon: ClipboardList,
      route: "/peminjaman",
    },
    {
      label: "Pengembalian",
      icon: RotateCcw,
      route: "/pengembalian",
    },
    {
      label: "Laporan",
      icon: FileText,
      route: "/laporan",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-pink-200 rounded-3xl p-8 shadow-sm border border-pink-100">
          <h1 className="text-3xl font-bold text-gray-800">
            Selamat datang, Admin 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Kelola perpustakaan dengan mudah hari ini.
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl p-5 shadow text-center font-semibold text-gray-500">
            Memuat data dashboard...
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-6 shadow-md border border-pink-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 font-semibold">
                      {card.title}
                    </p>

                    <h2 className={`text-4xl font-bold mt-2 ${card.color}`}>
                      {card.value}
                    </h2>
                  </div>

                  <div className="bg-pink-50 p-4 rounded-2xl">
                    <Icon className={card.color} size={32} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-7 shadow-md border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Buku Populer
              </h2>

              <button
                onClick={() => navigate("/buku-populer")}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-5 py-2 rounded-xl shadow transition"
              >
                Lihat
              </button>
            </div>

            <div className="space-y-4">
              {bukuPopuler.length === 0 ? (
                <p className="text-gray-500 font-semibold">
                  Belum ada data buku populer.
                </p>
              ) : (
                bukuPopuler.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex items-center justify-between gap-4 bg-pink-50 rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="bg-pink-500 text-white w-9 h-9 flex items-center justify-center rounded-full font-bold">
                        {index + 1}
                      </span>

                      <div>
                        <p className="font-bold text-gray-800">
                          {item.judul}
                        </p>

                        <p className="text-sm text-gray-500">
                          {item.penulis || "-"}
                        </p>
                      </div>
                    </div>

                    <span className="text-pink-600 font-bold text-sm">
                      {item.total_dipinjam || item.total || 0}x
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-md border border-pink-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Notifikasi Penting
            </h2>

            <div className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-xl">
                  {statistik.terlambat} Buku terlambat
                </p>

                <p className="text-sm mt-1">
                  Segera lakukan konfirmasi pengembalian.
                </p>
              </div>

              <button
                onClick={() => navigate("/terlambat")}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-5 py-2 rounded-xl shadow transition"
              >
                Lihat
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-7 shadow-md border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Menu Cepat
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {menuCepat.map((menu) => {
              const Icon = menu.icon;

              return (
                <button
                  key={menu.label}
                  onClick={() => navigate(menu.route)}
                  className="bg-pink-300 hover:bg-pink-400 text-gray-800 font-bold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Icon size={20} />
                  {menu.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}