import { useState } from "react";

export default function Terlambat() {
  const [data, setData] = useState([
    {
      id: 1,
      nama: "Nabila",
      buku: "Matematika",
      tglPinjam: "01-03-2026",
      jatuhTempo: "07-03-2026",
      telat: 3,
      status: "terlambat"
    },
    {
      id: 2,
      nama: "Dika",
      buku: "Fisika",
      tglPinjam: "02-03-2026",
      jatuhTempo: "08-03-2026",
      telat: 2,
      status: "terlambat"
    }
  ]);

  // BELUM DIKEMBALIKAN
  const handleBelum = (id) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, status: "terlambat" } : item
    );
    setData(updated);
  };

  // SUDAH DIKEMBALIKAN + BLOKIR
  const handleKembali = (id, telat) => {
    const today = new Date();
    const blokirSampai = new Date();
    blokirSampai.setDate(today.getDate() + telat);

    const updated = data.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "selesai",
            blokirSampai: blokirSampai.toLocaleDateString()
          }
        : item
    );

    setData(updated);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Daftar Buku Terlambat
      </h2>

      <div className="overflow-x-auto border rounded-lg">
       
        <table className="w-full text-sm table-fixed border-collapse">
          <thead>
            <tr className="bg-pink-200 text-left">
              <th className="p-4 font-bold border-b">Nama</th>
              <th className="p-4 font-bold border-b">Buku</th>
              <th className="p-4 font-bold border-b">Tgl Pinjam</th>
              <th className="p-4 font-bold border-b">Jatuh Tempo</th>
              <th className="p-4 font-bold border-b">Telat</th>
              <th className="p-4 font-bold border-b">Status</th>
              <th className="p-4 font-bold border-b text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-gray-50 transition-colors ${
                  item.status === "selesai" ? "bg-gray-50 text-gray-400" : ""
                }`}
              >
                <td className="p-4">{item.nama}</td>
                <td className="p-4">{item.buku}</td>
                <td className="p-4">{item.tglPinjam}</td>
                <td className="p-4">{item.jatuhTempo}</td>
                <td className="p-4 text-red-500 font-semibold">
                  {item.telat} hari
                </td>

                {/* STATUS */}
                <td className="p-4">
                  {item.status === "terlambat" && (
                    <span className="text-red-600 font-medium">
                      Terlambat
                    </span>
                  )}

                  {item.status === "selesai" && (
                    <div>
                      <p className="text-green-600 font-medium">
                        Sudah Kembali
                      </p>
                      <p className="text-[10px] leading-tight">
                        Blokir s/d {item.blokirSampai}
                      </p>
                    </div>
                  )}
                </td>

                {/* AKSI */}
                <td className="p-4">
                  <div className="flex flex-wrap justify-center gap-2">
                    {item.status === "terlambat" ? (
                      <>
                        <button
                          onClick={() => handleBelum(item.id)}
                          className="bg-red-400 hover:bg-red-500 px-3 py-1.5 rounded-lg text-white text-[11px] font-medium transition-colors"
                        >
                          Belum Kembali
                        </button>

                        <button
                          onClick={() => handleKembali(item.id, item.telat)}
                          className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg text-white text-[11px] font-medium transition-colors"
                        >
                          Sudah Kembali
                        </button>
                      </>
                    ) : (
                      <span className="italic text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Selesai
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}