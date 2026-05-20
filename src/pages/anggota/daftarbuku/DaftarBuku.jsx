import { useState } from "react";
import { Link } from "react-router-dom";

export default function DaftarBuku() {

  // state search
  const [search, setSearch] = useState("");

  // data buku sementara
  // nanti tinggal ganti dari backend
  const buku = [
    {
      id: 1,
      title: "PULANG",
      image: "/images/nailong.jpg",
    },

    {
      id: 2,
      title: "IPS TERPADU",
      image: "/images/nailong.jpg",
    },

    {
      id: 3,
      title: "KAMUS INGGRIS INDONESIA",
      image: "/images/nailong.jpg",
    },

    {
      id: 4,
      title: "IBU, CARIKAN",
      image: "/images/nailong.jpg",
    },

    {
      id: 5,
      title: "MANAJEMEN STRATEGI",
      image: "/images/nailong.jpg",
    },

    {
      id: 6,
      title: "SEJARAH DUNIA YANG DISEMBUNYIKAN",
      image: "/images/nailong.jpg",
    },

    {
      id: 7,
      title: "BUKU PINTAR RESEP MASAKAN",
      image: "/images/nailong.jpg",
    },

    {
      id: 8,
      title: "PANDUAN MENYUSUN SKRIPSI",
      image: "/images/nailong.jpg",
    },

    {
      id: 9,
      title: "DIET SEHAT TANPA LAPAR",
      image: "/images/nailong.jpg",
    },

    {
      id: 10,
      title: "PENDIDIKAN KARAKTER TANPA KEKERASAN",
      image: "/images/nailong.jpg",
    },

    {
      id: 11,
      title: "LEIDEN",
      image: "/images/nailong.jpg",
    },
  ];

  // filter pencarian
  const filteredBooks = buku.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="p-4">

      <div className="mb-8 flex justify-center">

        <input
          type="text"
          placeholder="Cari"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full max-w-5xl border border-black rounded-lg px-4 py-2 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">

        {filteredBooks.map((item) => (

          <Link
          to="/informasibukuanggota"
          state={item}
          key={item.id}
          className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-40 object-cover shadow-md rounded-md"
            />

            <h1 className="text-xs font-semibold text-center mt-3">
              {item.title}
            </h1>

          </Link>

        ))}

      </div>

    </div>
  );
}