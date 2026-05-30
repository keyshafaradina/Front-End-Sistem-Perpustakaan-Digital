import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  History,
  ClipboardList,
  RotateCcw,
  RefreshCcw,
  FileText,
  CreditCard,
  Library,
} from "lucide-react";

export default function Sidebar({ role, showSidebar, user, fotoProfil }) {
  const location = useLocation();

  const namaUser = user?.nama_lengkap || user?.name || "Pengguna";
  const roleUser = user?.role || role || "anggota";

  const profilePath =
    roleUser === "admin" ? "/profileadmin" : "/profileanggota";

  const defaultFoto = "/images/nailong.jpg";

  const menus =
    roleUser === "admin"
      ? [
          { label: "Dashboard", path: "/dashboardadmin", icon: LayoutDashboard },
          { label: "Kelola Buku", path: "/kelolabuku", icon: BookOpen },
          { label: "Riwayat Buku", path: "/riwayatbuku", icon: History },
          { label: "Peminjaman Buku", path: "/peminjaman", icon: ClipboardList },
          { label: "Pengembalian Buku", path: "/pengembalian", icon: RotateCcw },
          { label: "Perpanjangan Buku", path: "/perpanjangan", icon: RefreshCcw },
          { label: "Laporan Perpustakaan", path: "/laporan", icon: FileText },
        ]
      : [
          { label: "Dashboard", path: "/dashboardanggota", icon: LayoutDashboard },
          { label: "Kartu Anggota", path: "/kartuanggota", icon: CreditCard },
          { label: "Daftar Buku", path: "/daftarbukuanggota", icon: Library },
          { label: "Riwayat Peminjaman", path: "/riwayatpeminjaman", icon: History },
        ];

  return (
    <aside
      className={`fixed top-14 left-0 bottom-0 w-64 bg-gradient-to-b from-pink-200 via-pink-100 to-pink-50 z-40 overflow-y-auto transition-all duration-300 shadow-xl border-r border-pink-200 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link
        to={profilePath}
        className="mx-3 mt-4 mb-4 flex items-center gap-3 rounded-3xl bg-white/70 px-4 py-4 shadow-sm border border-pink-100 hover:bg-white hover:shadow-md transition"
      >
        <img
          src={fotoProfil || defaultFoto}
          alt="Foto Profil"
          onError={(e) => {
            e.currentTarget.src = defaultFoto;
          }}
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
        />

        <div className="flex flex-col min-w-0">
          <h1 className="font-bold text-sm leading-tight text-gray-800 break-words">
            {namaUser}
          </h1>

          <p className="bg-pink-100 text-pink-600 rounded-full px-4 py-1 text-xs font-bold w-fit mt-1 capitalize">
            {roleUser}
          </p>
        </div>
      </Link>

      <div className="mx-3 mb-3 rounded-2xl bg-pink-300/70 px-5 py-3 font-bold text-gray-700 text-sm tracking-wide">
        MAIN NAVIGATION
      </div>

      <nav className="flex flex-col px-3 pb-6 gap-2">
        {menus.map((menu) => {
          const active = location.pathname === menu.path;
          const Icon = menu.icon;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`group flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all duration-200 ${
                active
                  ? "bg-pink-500 text-white shadow-lg translate-x-1"
                  : "text-gray-800 hover:bg-white/80 hover:shadow-md hover:translate-x-1"
              }`}
            >
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-pink-100 text-pink-500 group-hover:bg-pink-200"
                }`}
              >
                <Icon size={19} />
              </span>

              <span className="text-sm">
                {menu.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}