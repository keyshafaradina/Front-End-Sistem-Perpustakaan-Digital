import { useState } from "react";
import Button from "../../components/ui/Button";
import PopUp from "../../components/ui/Popup";

export default function Perpanjangan() {

  const [daftarPengajuan, setDaftarPengajuan] = useState([
    { id: 1, nama: "Septian", buku: "Septihan", tglKembali: "1-8-2026", tglBaru: "8-8-2026" },
    { id: 2, nama: "Budi", buku: "Laskar Pelangi", tglKembali: "2-8-2026", tglBaru: "9-8-2026" },
    { id: 3, nama: "Ani", buku: "Filosofi Teras", tglKembali: "3-8-2026", tglBaru: "10-8-2026" },
  ]);

  //  POPUP STATE
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
    action: "", // setuju | tolak
    selectedId: null
  });

  // 👉 klik SETUJU
  const handleSetuju = (id) => {
    setPopupData({
      title: "Konfirmasi",
      message: "Setujui perpanjangan?",
      action: "setuju",
      selectedId: id
    });
    setShowPopup(true);
  };

  // 👉 klik TOLAK
  const handleTolak = (id) => {
    setPopupData({
      title: "Konfirmasi",
      message: "Tolak permohonan?",
      action: "tolak",
      selectedId: id
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-6">Persetujuan Perpanjangan Buku</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          
          {/* 🔥 HEADER PINK */}
          <thead className="bg-pink-200 border-b">
            <tr>
              <th className="p-4 font-semibold">Nama Peminjam</th>
              <th className="p-4 font-semibold">Judul Buku</th>
              <th className="p-4 font-semibold text-center">Tgl Kembali Awal</th>
              <th className="p-4 font-semibold text-center">Tgl Perpanjangan</th>
              <th className="p-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {daftarPengajuan.length > 0 ? (
              daftarPengajuan.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{item.nama}</td>
                  <td className="p-4">{item.buku}</td>
                  <td className="p-4 text-center text-red-500">{item.tglKembali}</td>
                  <td className="p-4 text-center text-green-600 font-bold">{item.tglBaru}</td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => handleSetuju(item.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Setuju
                      </button>
                      <button 
                        onClick={() => handleTolak(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  Tidak ada permohonan baru.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* 🔥 POPUP */}
      <PopUp isOpen={showPopup} onClose={handleClosePopup}>
        <h1 className="text-lg font-bold mb-3">
          {popupData.title}
        </h1>

        <p className="mb-5 text-center">
          {popupData.message}
        </p>

        <div className="flex justify-center gap-4">
          {popupData.action ? (
            <>
              <button
                onClick={handleClosePopup}
                className="bg-gray-200 px-5 py-2 rounded-lg font-bold"
              >
                Tidak
              </button>

              <button
                onClick={() => {
                  setDaftarPengajuan(
                    daftarPengajuan.filter(item => item.id !== popupData.selectedId)
                  );

                  setPopupData({
                    title: "Berhasil",
                    message: popupData.action === "setuju"
                      ? "Perpanjangan disetujui"
                      : "Permohonan ditolak",
                    action: ""
                  });
                }}
                className="bg-pink-300 px-5 py-2 rounded-lg font-bold"
              >
                Ya
              </button>
            </>
          ) : (
            <button
              onClick={handleClosePopup}
              className="bg-pink-300 px-5 py-2 rounded-lg font-bold"
            >
              OK
            </button>
          )}
        </div>
      </PopUp>

    </div>
  );
}