import React from "react";
import { NavLink } from "react-router-dom";

const menuByRole = {
  ADMIN: [
    { name: "Dashboard", path: "/dashboardadmin" },
    { name: "Kelola Buku", path: "kelolabuku" },
    { name: "Riwayat Buku", path: "/admin/riwayat-buku" },
    { name: "Peminjaman Buku", path: "/admin/peminjaman-buku" },
    { name: "Pengembalian Buku", path: "/admin/pengembalian-buku" },
    { name: "Laporan Perpustakaan", path: "/admin/laporan" },
  ],

  ANGGOTA: [
    { name: "Dashboard", path: "/dashboardanggota" },
    { name: "Kartu Anggota", path: "/kartuanggota" },
    { name: "Daftar Buku", path: "/daftarbukuanggota" },
    { name: "Riwayat Peminjaman", path: "/riwayatpeminjaman" },
  ],
};

export default function Sidebar({ role, showSidebar }) {
  const menus = menuByRole[role] || [];

  return (
    <aside
      className={
        showSidebar
          ? "bg-pink-200 w-64 fixed top-16 left-0 bottom-0 z-40 overflow-y-auto transition-all duration-300 translate-x-0"
          : "bg-pink-200 w-64 fixed top-16 left-0 bottom-0 z-40 overflow-y-auto transition-all duration-300 -translate-x-full"}>
      <div className="p-5">
        <NavLink
        to={role === "ADMIN"? "/profileadmin": "/profileanggota"} className="flex mb-5 gap-4 items-center group">
            {({ isActive }) => (<>
            <div className="w-14 h-14 bg-white rounded-full"></div>
            <div className="flex flex-col">
                <h2 className={`font-bold uppercase transition ${isActive? "text-black/40" : "text-black group-hover:text-black/50"}`}>Saya</h2>
                <div className="bg-white px-4 rounded-xl text-sm font-semibold text-black">{role}</div>
            </div>
            </>
        )}
        </NavLink>

        <div className="bg-pink-300 text-black/40 font-bold text-l w-[calc(100%+40px)] -mx-5 px-5">MAIN NAVIGATION</div>
        <div className="mt-11 space-y-11 font-bold">
          {menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              className={({ isActive }) =>
                `block transition ${
                  isActive
                    ? "text-black/50 font-bold"
                    : "text-black hover:text-black/50"
                }`
              }
            >
              {menu.name}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}