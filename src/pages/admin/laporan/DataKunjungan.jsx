import Button from "../../../components/ui/Button";

export default function DataKunjungan({ onScan }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10">

      <h1 className="text-3xl font-semibold mb-10">
        Kunjungan Perpustakaan
      </h1>

      <div className="w-full max-w-xl text-center">

        <h2 className="font-semibold mb-6">
          Data Anggota
        </h2>

        <div className="flex items-center mb-5">
          <label className="w-24 text-left">Nomor :</label>
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="flex items-center mb-10">
          <label className="w-24 text-left">Nama :</label>
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          />
        </div>

        <p className="mb-6">
          Silahkan lakukan scan QR kartu anggota
        </p>

        {/* 🔥 klik ini pindah ke laporan */}
        <Button onClick={onScan} className="px-6">
          SCAN
        </Button>

      </div>
    </div>
  );
}