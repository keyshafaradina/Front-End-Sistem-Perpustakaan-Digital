import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, BookOpen } from "lucide-react";
import api from "../../services/api";

export default function KelolaBuku() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBuku = async () => {
    try {
      setLoading(true);

      const res = await api.get("/buku");
      setBuku(res.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data buku");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  const filteredBuku = buku.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.judul?.toLowerCase().includes(keyword) ||
      item.penulis?.toLowerCase().includes(keyword) ||
      item.kode_buku?.toLowerCase().includes(keyword)
    );
  });

  const getGambar = (gambar) => {
    if (!gambar) {
      return "/images/nailong.jpg";
    }

    if (gambar.startsWith("http")) {
      return gambar;
    }

    if (gambar.startsWith("/uploads")) {
      return `http://127.0.0.1:8000${gambar}?t=${Date.now()}`;
    }

    return `http://127.0.0.1:8000/uploads/buku/${gambar}?t=${Date.now()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Kelola Buku
              </h1>

              <p className="text-gray-500 mt-2">
                Kelola data koleksi buku perpustakaan
              </p>
            </div>

            <button
              onClick={() => navigate("/tambah-buku")}
              className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
            >
              <Plus size={20} />
              Tambah Buku
            </button>
          </div>

          <div className="mb-10">
            <div className="relative max-w-xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Cari judul, penulis, atau kode buku..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-pink-50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          {loading && (
            <div className="text-center py-20">
              <p className="font-semibold text-gray-500">
                Memuat data buku...
              </p>
            </div>
          )}

          {!loading && filteredBuku.length === 0 && (
            <div className="bg-pink-50 border border-pink-100 rounded-3xl p-12 text-center">
              <BookOpen size={56} className="mx-auto text-pink-400 mb-4" />

              <h2 className="text-2xl font-bold text-gray-700">
                Buku tidak ditemukan
              </h2>

              <p className="text-gray-500 mt-2">
                Belum ada buku atau kata kunci pencarian tidak sesuai.
              </p>
            </div>
          )}

          {!loading && filteredBuku.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredBuku.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/edit-buku/${item.id}`, {
                      state: item,
                    })
                  }
                  className="group cursor-pointer h-full"
                >
                  <div className="h-[360px] bg-pink-50 border border-pink-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition flex flex-col">
                    <div className="h-[220px] w-full overflow-hidden rounded-2xl bg-gray-100 mb-4 flex-shrink-0">
                      <img
                        src={getGambar(item.gambar)}
                        alt={item.judul || "Buku"}
                        onError={(e) => {
                          e.currentTarget.src = "/images/nailong.jpg";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="flex flex-1 flex-col text-center">
                      <h2 className="min-h-[52px] font-bold text-gray-800 uppercase line-clamp-2 leading-snug">
                        {item.judul || "-"}
                      </h2>

                      <p className="mt-1 min-h-[24px] text-sm text-gray-500 line-clamp-1">
                        {item.penulis || "-"}
                      </p>

                      <div className="mt-auto flex justify-center pt-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            item.ketersediaan === "tersedia"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.ketersediaan || "tidak tersedia"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}