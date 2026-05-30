import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  RefreshCcw,
  Eye,
} from "lucide-react";
import api from "../../services/api";

export default function Peringatan() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    terlambat: 0,
    perpanjangan: 0,
    jatuhTempo: 0,
  });

  const getPeringatan = async () => {
    try {
      setLoading(true);

      const [terlambatRes, perpanjanganRes, jatuhTempoRes] =
        await Promise.all([
          api.get("/dashboard/terlambat"),
          api.get("/dashboard/perpanjangan"),
          api.get("/dashboard/jatuh-tempo"),
        ]);

      setData({
        terlambat: terlambatRes.data.data?.length || 0,
        perpanjangan: perpanjanganRes.data.data?.length || 0,
        jatuhTempo: jatuhTempoRes.data.data?.length || 0,
      });
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data peringatan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPeringatan();
  }, []);

  const notifications = [
    {
      id: 1,
      title: `${data.terlambat} Buku terlambat`,
      detail: "Segera lakukan konfirmasi pengembalian",
      icon: AlertTriangle,
      route: "/terlambat",
      bg: "bg-red-50",
      text: "text-red-500",
      border: "border-red-100",
    },
    {
      id: 2,
      title: `${data.perpanjangan} Permohonan perpanjangan`,
      detail: "Butuh persetujuan admin",
      icon: RefreshCcw,
      route: "/perpanjangan",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-100",
    },
    {
      id: 3,
      title: `${data.jatuhTempo} Buku akan jatuh tempo`,
      detail: "Perlu diperhatikan hari ini",
      icon: Clock,
      route: "/peminjaman",
      bg: "bg-blue-50",
      text: "text-blue-500",
      border: "border-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/dashboardadmin")}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-4 transition"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="text-pink-500" size={34} />
            </div>

            <h1 className="text-4xl font-bold text-gray-800">
              Notifikasi Penting
            </h1>

            <p className="text-gray-500 mt-2">
              Pantau peringatan penting perpustakaan
            </p>
          </div>

          {loading && (
            <p className="text-center font-semibold text-gray-500">
              Memuat data peringatan...
            </p>
          )}

          {!loading && (
            <div className="space-y-5">
              {notifications.map((notif) => {
                const Icon = notif.icon;

                return (
                  <div
                    key={notif.id}
                    className={`${notif.bg} ${notif.border} border rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm hover:shadow-md transition`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <Icon className={notif.text} size={30} />
                      </div>

                      <div>
                        <h2 className={`text-2xl font-bold ${notif.text}`}>
                          {notif.title}
                        </h2>

                        <p className="text-gray-600 mt-1">
                          {notif.detail}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(notif.route)}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                    >
                      <Eye size={18} />
                      Lihat
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}