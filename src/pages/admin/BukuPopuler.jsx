import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";
import api from "../../services/api";

export default function BukuPopuler() {
  const navigate = useNavigate();

  const [bukuPopuler, setBukuPopuler] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBukuPopuler = async () => {
    try {
      setLoading(true);

      const res = await api.get("/dashboard/buku-populer");
      setBukuPopuler(res.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data buku populer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBukuPopuler();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        <button
          onClick={() => navigate("/dashboardadmin")}
          className="flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 mb-6"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-pink-500" size={34} />
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Buku Populer
          </h1>

          <p className="text-gray-500 mt-2">
            Ranking buku yang paling sering dipinjam
          </p>
        </div>

        {loading && (
          <p className="text-center font-semibold text-gray-500">
            Memuat data buku populer...
          </p>
        )}

        {!loading && bukuPopuler.length === 0 && (
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-8 text-center">
            <p className="font-semibold text-gray-600">
              Belum ada data buku populer
            </p>
          </div>
        )}

        <div className="space-y-5">
          {bukuPopuler.map((buku, index) => (
            <div
              key={buku.id || index}
              className="bg-pink-50 border border-pink-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {buku.judul}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {buku.penulis || "Penulis tidak tersedia"}
                  </p>
                </div>
              </div>

              <div className="bg-white px-5 py-2 rounded-xl border border-pink-100 text-pink-600 font-bold">
                {buku.total_dipinjam || buku.total || 0}x dipinjam
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}