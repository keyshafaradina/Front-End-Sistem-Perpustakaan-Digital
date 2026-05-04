export default function Sidebar({ role = "user" }) {
  const menu = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Kelola Buku", path: "/admin/buku" },
      { name: "Riwayat Buku", path: "/admin/riwayatbuku" },
      { name: "Peminjaman Buku", path: "/admin/peminjamanbuku" },
      { name: "Pengembalian Buku", path: "/admin/pengembalianbuku" },
      { name: "Laporan Perpustakaan", path: "/admin/laporan" },
    ],
    anggota: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Kartu Anggota", path: "/kartuanggota" },
      { name: "Daftar Buku", path: "/daftarbuku" },
      { name: "Riwayat Peminjaman", path: "/riwayatpeminjaman" },
    ],
  };

  const menus = menu[role] || [];

  return (
    <div className="w-80 h-screen bg-pink-300">
            <div className="flex items-center gap-6 px-10 py-7">
                <div className="border rounded-full w-12 h-12"></div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold">
                        SAYA
                    </h2>
                    <span className="inline-block mt-2 px-7 py-1 text-s font-bold rounded-full bg-white">{role==="admin"? "ADMIN" : "ANGGOTA"}</span>
                </div>
            </div>
            <div className="font-bold text-xl text-black/50 bg-pink-400/50 px-5 py-1"><h1>MAIN NAVIGATION</h1></div>
      <ul className="space-y-2 font-bold text-xl">
        {menus.map((item, i) => (
          <li
            key={i}
            className="p-5 rounded hover:bg-pink-400/50 cursor-pointer"
          >
            {item.name}
          </li>
        ))}
      </ul>
      </div>
  );
}