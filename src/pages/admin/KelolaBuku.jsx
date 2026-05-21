import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

export default function KelolaBuku() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");

  const [buku, setBuku] = useState([
    {
      id: 1,
      judul: "PULANG",
      penulis: "Tere Liye",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 2,
      judul: "IPS TERPADU",
      penulis: "Tim Guru",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 3,
      judul: "KAMUS INGGRIS",
      penulis: "John",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 4,
      judul: "IBU CARIKAN",
      penulis: "Penulis A",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 5,
      judul: "PULANG",
      penulis: "Tere Liye",
      cover: "/images/nailong.jpg",
      deskripsi: "Novel",
      status: "aktif",
    },
    {
      id: 6,
      judul: "MANAJEMEN STRATEGI",
      penulis: "Juhaeri",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 7,
      judul: "BUKU PINTAR RESEP MAKANAN",
      penulis: "-",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 8,
      judul: "PANDUAN MENYUSUN SKRIPSI",
      penulis: "Juhaeri",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 9,
      judul: "DIET SEHAT TANPA LAPAR",
      penulis: "Juhaeri",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 10,
      judul: "LEIDEN",
      penulis: "Dwi Nur Rahmawati",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
    {
      id: 11,
      judul: "PENDIDIKAN KARAKTER TANPA KEKERASAN",
      penulis: "Muhammad Saroni",
      cover: "/images/nailong.jpg",
      status: "aktif",
    },
  ]);

  useEffect(() => {
    if (!location.state) return;

    // TAMBAH
    if (location.state.newBook) {
      setBuku((prev) => [...prev, location.state.newBook]);
    }

    // HAPUS
    if (location.state.deletedId) {
      setBuku((prev) =>
        prev.filter(
          (item) =>
            String(item.id) !== String(location.state.deletedId)
        )
      );
    }

    // UPDATE + ARSIP
    if (location.state.updatedBook) {
      setBuku((prev) =>
        prev.map((item) =>
          String(item.id) === String(location.state.updatedBook.id)
            ? location.state.updatedBook
            : item
        )
      );
    }

    navigate(".", {
      replace: true,
      state: null,
    });
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="px-10 py-8">

        {/* SEARCH + TAMBAH */}
        <div className="mb-10 px-6 flex items-center gap-4">

          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Cari buku..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 bg-pink-200"
            />
          </div>

          {/* TAMBAH */}
          <button
            onClick={() => navigate("/tambah-buku")}
            className="bg-[#F4B6D2] px-5 py-2 rounded font-bold shadow whitespace-nowrap"
          >
            + BUKU
          </button>

        </div>

        {/* LIST */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-5">
          {buku
            .filter(
              (b) =>
                b.judul.toLowerCase().includes(search.toLowerCase()) &&
                b.status !== "diarsipkan"
            )
            .map((b) => (
              <div
                key={b.id}
                onClick={() =>
                  navigate(`/edit-buku/${b.id}`, {
                    state: b,
                  })
                }
                className="cursor-pointer flex flex-col items-center hover:scale-105 transition"
              >
                <div className="w-[120px] h-[170px] overflow-hidden rounded shadow-md bg-gray-200">
                  <img
                    src={b.cover}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-[11px] font-bold text-center mt-2 uppercase">
                  {b.judul}
                </p>

                <p className="text-[10px] text-gray-500 text-center">
                  {b.penulis}
                </p>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}