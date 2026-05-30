import { useState } from "react";
import Button from "../../../components/ui/Button";
import api from "../../../services/api";

export default function LaporanPeminjamanDanPengembalian() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const [tanggal, setTanggal] = useState("1");
  const [bulan, setBulan] = useState("3");
  const [tahun, setTahun] = useState("2026");

  const getLaporan = async () => {
    try {
      const res = await api.get("/laporan/peminjaman", {
        params: {
          tanggal,
          bulan,
          tahun,
        },
      });

      setData(res.data.data || []);
      setShow(true);
    } catch (error) {
      console.error("Gagal mengambil laporan peminjaman:", error);
      setData([]);
      setShow(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">
        Laporan Peminjaman
      </h2>

      <div className="border rounded-lg p-6 mb-10 relative overflow-visible">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-lg block mb-1">Tanggal</label>
            <select
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-lg block mb-1">Bulan</label>
            <select
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
          </div>

          <div>
            <label className="text-lg block mb-1">Tahun</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {Array.from({ length: 7 }, (_, i) => {
                const year = 2024 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={getLaporan}>Tampilkan Data</Button>
        </div>
      </div>

      {show && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-lg">
            <thead className="bg-pink-200 text-left">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Buku</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.nama || "-"}</td>
                    <td className="p-3">{item.tanggal_pinjam || "-"}</td>
                    <td className="p-3">{item.buku || "-"}</td>
                    <td className="p-3 text-yellow-600 font-medium">
                      {item.status || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-t">
                  <td colSpan="4" className="p-3 text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}