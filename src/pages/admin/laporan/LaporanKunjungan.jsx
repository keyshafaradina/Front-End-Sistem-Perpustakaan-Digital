import { useState } from "react";
import Button from "../../../components/ui/Button";

export default function LaporanKunjungan() {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl">

      <h2 className="text-2xl font-semibold mb-6">
        Laporan Kunjungan
      </h2>

      {/* FILTER */}
      <div className="border rounded-lg p-6 mb-10 ">

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

        <div className="flex justify-end mt-7">
          <Button onClick={() => setShow(true)}>Tampilkan Data</Button>
        </div>

      </div>

      {show && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-lg">

            <thead className="bg-pink-200">
              <tr>
                <th className="p-3 text-left w-1/2">Nama</th>
                <th className="p-3 text-left w-1/2">Tanggal</th>
                <th className="p-3 text-left w-1/4">Jam</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Nabila</td>
                <td className="p-3">02 Maret 2026</td>
                <td className="p-3">10:00</td>
              </tr>

              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Angel</td>
                <td className="p-3">02 Maret 2026</td>
                <td className="p-3">13:00</td>
              </tr>

              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Vania</td>
                <td className="p-3">02 Maret 2026</td>
                <td className="p-3">14:00</td>
              </tr>

              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Nuel Surya</td>
                <td className="p-3">02 Maret 2026</td>
                <td className="p-3">15:10</td>
              </tr>
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}