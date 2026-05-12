export default function DashboardAdmin() {
  return (
    <div className="bg-white shadow rounded p-6 text-center">
      
      <h2 className="font-semibold bg-pink-200 h-16 px-4 flex justify-center items-center gap-4 shadow fixed top-12 left-0 right-0 z-50"> 
        Dinas Perpustakaan dan Arsip Daerah
      </h2>

      <p className="mt-12 font-bold text-center">Selamat datang, Admin!</p>
      <p className="font-bold text-center">Kelola perpustakaan dengan mudah hari ini!</p>

      <div className="flex justify-center gap-4 mt-6 py-3">
        <div className="bg-pink-200 px-4 py-2 rounded">500 Buku</div>
        <div className="bg-pink-200 px-4 py-2 rounded">350 Anggota</div>
        <div className="bg-pink-200 px-4 py-2 rounded">120 Dipinjam</div>
      </div>

      <button className="mt-6 bg-pink-300 px-4 py-2 rounded">
        Edit tampilan dashboard utama
      </button>

    </div>
  );
}