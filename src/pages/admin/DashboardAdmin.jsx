import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* WELCOME */}
      <div className="bg-pink-200 p-6 rounded-2xl mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            Selamat datang, Admin 👋
          </h2>
          <p className="text-gray-700">
            Kelola perpustakaan dengan mudah hari ini.
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div onClick={() => navigate("/kelolabuku")}
          className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:scale-105 transition">
          <p className="text-gray-500 text-lg">Buku</p>
          <h2 className="text-2xl font-bold">500</h2>
        </div>

        <div onClick={() => navigate("/anggota")}
          className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:scale-105 transition">
          <p className="text-gray-500 text-lg">Total Anggota</p>
          <h2 className="text-2xl font-bold">350</h2>
        </div>

        <div onClick={() => navigate("/peminjaman")}
          className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:scale-105 transition">
          <p className="text-gray-500 text-lg">Dipinjam</p>
          <h2 className="text-2xl font-bold">120</h2>
        </div>

          <div onClick={() => navigate("/terlambat")}
          className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:scale-105 transition">
          <p className="text-gray-500 text-lg">Terlambat</p>
          <h2 className="text-2xl font-bold text-red-500">10</h2>
        </div>

      </div>

      {/* BUKU POPULER + NOTIF */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* Buku Populer */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold text-xl">Buku Populer</h3>
           
            <Button  onClick={() => navigate("/buku")}>Lihat</Button>
          </div>

          <div className="space-y-3 text-lg">
            {["Pemrograman Web", "Struktur Data", "Basis Data"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="bg-pink-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-lg">
                  {i + 1}
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifikasi */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="font-semibold mb-3 text-xl">Notifikasi Penting</h3>

          <div className="bg-red-100 text-red-600 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="font-medium text-lg">10 Buku terlambat</p>
              <p className="text-sm">Segera konfirmasi</p>
            </div>

            <Button onClick={() => navigate("/peringatan")}>Lihat</Button>
          </div>
        </div>

      </div>

      {/* 🔹 MENU CEPAT */}
      <div className="text-xl bg-white p-5 rounded-2xl">
        <h3 className="font-semibold mb-4">Menu Cepat</h3>

        <div className="grid grid-cols-6 gap-4">
            <Button onClick={() => navigate("/kelolabuku")} > 📚 Kelola Buku</Button>
    
             <Button onClick={() => navigate("/anggota")} > 👤 Anggota </Button>

             <Button onClick={() => navigate("/peminjaman")} > 📥 Peminjaman</Button>

             <Button onClick={() => navigate("/pengembalian")} >🔄 Pengembalian</Button>

             <Button onClick={() => navigate("/laporan")} >📄 Laporan</Button>

             <Button onClick={() => navigate("/editdashboard")} >⚙️ Edit Dashboard </Button>

        </div>
      </div>

    </div>
  );
}