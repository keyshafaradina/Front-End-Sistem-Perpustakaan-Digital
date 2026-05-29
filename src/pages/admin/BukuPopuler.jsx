import { useState } from "react";

export default function BukuPopuler() {

  const [bukuPopuler] = useState([
    { id: 1, judul: "Pemrograman Web", total: 20 },
    { id: 2, judul: "Struktur Data", total: 15 },
    { id: 3, judul: "Basis Data", total: 10 },
    { id: 4, judul: "Biologi", total: 8 },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl">

      <h2 className="text-xl font-semibold mb-4">
        Buku Populer
      </h2>

      <div className="space-y-3">
        {bukuPopuler.map((buku, index) => (
          <div
            key={buku.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-pink-500">
                #{index + 1}
              </span>
              <span>{buku.judul}</span>
            </div>

            <span className="text-sm text-gray-500">
              {buku.total}x dipinjam
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}