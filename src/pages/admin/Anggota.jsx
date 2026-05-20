import { useState } from "react";
import Button from "../../components/ui/Button";

export default function Anggota() {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      nama: "Calista Angel",
      email: "siti@gmail.com",
      status: "Aktif",
      foto: "angel.webp",
    },
    {
      id: 2,
      nama: "Dika Pratama",
      email: "dika@gmail.com",
      status: "Aktif",
      foto: "dika.jpg",
    },
    {
      id: 3,
      nama: "Nuel Surya",
      email: "nuel_s@gmail.com",
      status: "Aktif",
      foto: "nuel.jpg",
    },
    {
      id: 4,
      nama: "Chelsea",
      email: "chelsea@gmail.com",
      status: "Aktif",
      foto: "karina.jpg",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const filtered = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    const updated = data.map((item) =>
      item.id === selected.id ? selected : item
    );
    setData(updated);
    setShowModal(false);
  };

  const handleDelete = () => {
    const updated = data.filter((item) => item.id !== selected.id);
    setData(updated);
    setShowDelete(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h2 className="text-2xl font-semibold mb-6">Data Anggota</h2>

      {/* SEARCH */}
      <div className="mb-10 px-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari anggota"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm table-fixed border-collapse">
          <thead className="bg-pink-100">
            <tr className="text-center">
              <th className="p-1">No</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-center">{i + 1}</td>
                <td className="p-3 text-center">{item.nama}</td>
                <td className="p-3 text-center">{item.email}</td>

                <td className="p-3 text-center">
                  <span className={`px-2 py-1 text-xs rounded ${
                    item.status === "Aktif"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {item.status}
                  </span>
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelected(item);
                      setMode("lihat");
                      setShowModal(true);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Lihat
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelected(item);
                      setShowDelete(true);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            {mode === "lihat" && (
              <div className="text-center mb-4">
                <img
                  src={selected.foto}
                  alt="foto"
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-2"
                />
                <p className="font-semibold text-lg">{selected.nama}</p>
              </div>
            )}

            <h3 className="text-lg font-semibold mb-4 capitalize">
              {mode} Anggota
            </h3>

            <input
              type="text"
              value={selected.nama}
              onChange={(e) =>
                setSelected({ ...selected, nama: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
              readOnly={mode === "lihat"}
            />

            <input
              type="text"
              value={selected.email}
              onChange={(e) =>
                setSelected({ ...selected, email: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
              readOnly={mode === "lihat"}
            />

            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowModal(false)}>Tutup</Button>
            </div>
          </div>
        </div>
      )}

      {/* HAPUS */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl text-center">
            <h3 className="mb-3 font-semibold">Yakin hapus?</h3>
            <div className="flex justify-center gap-3">
              {/* PERBAIKAN: Tombol Batal sekarang hanya menutup modal */}
              <Button onClick={() => setShowDelete(false)}>Batal</Button>
              <Button onClick={handleDelete}>Hapus</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}