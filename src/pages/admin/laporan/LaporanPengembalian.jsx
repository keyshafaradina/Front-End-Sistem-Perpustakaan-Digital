import { useState } from "react";
import Button from "../../../components/ui/Button";

export default function LaporanPengembalian() {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl">

      <h2 className="text-2xl font-semibold mb-6">
        Laporan Pengembalian
      </h2>

      <div className="border rounded-lg p-6 mb-10">

        <div className="grid grid-cols-3 gap-4">

          {/* TANGGAL */}
          <div>
            <label className="text-lg block mb-1">Tanggal</label>
            <select className="w-full border rounded px-3 py-2">
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* BULAN */}
          <div>
            <label className="text-lg block mb-1">Bulan</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Januari</option>
              <option>Februari</option>
              <option>Maret</option>
              <option>April</option>
              <option>Mei</option>
              <option>Juni</option>
              <option>Juli</option>
              <option>Agustus</option>
              <option>September</option>
              <option>Oktober</option>
              <option>November</option>
              <option>Desember</option>
            </select>
          </div>

          {/* TAHUN */}
          <div>
            <label className="text-lg block mb-1">Tahun</label>
            <select className="w-full border rounded px-3 py-2">
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return <option key={year}>{year}</option>;
              })}
            </select>
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => setShow(true)}>Tampilkan Data</Button>
        </div>

      </div>

      {show && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-lg">

            <thead className="bg-pink-200 text-left">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Tgl Pinjam</th>
                <th className="p-3">Tgl Kembali</th>
                <th className="p-3">Buku</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Nabila</td>
                <td className="p-3">02 Maret 2026</td>
                <td className="p-3">09 Maret 2026</td>
                <td className="p-3">Pulang</td>
                <td className="p-3 text-green-600 font-medium">
                  Dikembalikan
                </td>
              </tr>

              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Chelsea</td>
                <td className="p-3">7 Maret 2026</td>
                <td className="p-3">10 Maret 2026</td>
                <td className="p-3">Septian</td>
                <td className="p-3 text-green-600 font-medium">
                  Dikembalikan
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}