import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

export default function DaftarBuku() {
  const [search, setSearch] = useState("");
  const [buku, setBuku] = useState([]);

  useEffect(() => {
    getBuku();
  }, []);

  const getBuku = async () => {
    try {
      const res = await api.get("/buku");
      setBuku(res.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
      setBuku([]);
    }
  };

  const getImage = (item) => {
    const gambar =
      item.cover ||
      item.gambar ||
      item.foto ||
      item.image ||
      item.sampul;

    if (!gambar) return "/images/nailong.jpg";

    if (gambar.startsWith("http")) return gambar;

    return `http://127.0.0.1:8000/uploads/buku/${gambar}`;
  };

  const getTitle = (item) => {
    return item.judul || item.title || item.nama_buku || "";
  };

  const filteredBooks = buku.filter((item) =>
    getTitle(item).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <p className="text-pink-500 font-semibold tracking-[4px] uppercase">
            Library Collection
          </p>

          <h1 className="text-4xl font-extrabold text-gray-800 mt-2">
            Daftar Buku
          </h1>

          <p className="text-gray-500 mt-2">
            Temukan buku favoritmu dengan mudah
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-3xl">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Cari judul buku..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-white px-14 py-4 shadow-lg border border-pink-100 focus:outline-none focus:ring-4 focus:ring-pink-200"
            />
          </div>
        </div>

        {/* LIST BUKU */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
            {filteredBooks.map((item) => (
              <Link
                key={item.id}
                to="/informasibukuanggota"
                state={item}
                className="group w-[220px] bg-white rounded-[32px] p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* COVER */}
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={getImage(item)}
                    alt={getTitle(item)}
                    className="w-full h-[280px] object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* INFO */}
                <div className="mt-5 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 line-clamp-2 min-h-[64px] flex items-center justify-center">
                    {getTitle(item)}
                  </h2>

                  <p className="mt-2 text-lg text-gray-400 group-hover:text-pink-500 transition">
                    Lihat detail
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">📚</div>

            <h2 className="text-2xl font-bold text-gray-700">
              Buku Tidak Ditemukan
            </h2>

            <p className="text-gray-500 mt-2">
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}