import React from "react";

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      
      {/* HEADER */}
      <div className="bg-pink-200 px-10 py-6 pb-12">
        
        {/* BAGIAN ATAS */}
        <div className="flex justify-between items-center">

          <p className="text-2xl font-bold">
            Sistem Informasi Perpustakaan Digital
          </p>

        </div>

        {/* JUDUL TENGAH */}
        <h2 className="text-center text-4xl font-bold mt-10">
          Dinas Perpustakaan dan Arsip Daerah
        </h2>

      </div>

      {/* CONTENT */}
      <div className="px-20 py-16">

        {/* WELCOME TEXT */}
        <div className="mb-16">
          
          <h1 className="text-5xl font-bold mb-3">
            Selamat datang, Admin!
          </h1>

          <h2 className="text-3xl font-semibold">
            Kelola perpustakaan dengan mudah hari ini!
          </h2>

        </div>

        {/* CARD */}
        <div className="flex justify-center gap-14 mb-20">

          {/* CARD 1 */}
          <div className="bg-pink-200 px-14 py-8 rounded-xl text-3xl font-bold min-w-[230px] text-center">
            500 Buku
          </div>

          {/* CARD 2 */}
          <div className="bg-pink-200 px-14 py-8 rounded-xl text-3xl font-bold min-w-[230px] text-center">
            350 Anggota
          </div>

          {/* CARD 3 */}
          <div className="bg-pink-200 px-14 py-8 rounded-xl text-3xl font-bold min-w-[230px] text-center">
            120 Dipinjam
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-center">
          
          <button className="bg-pink-200 px-20 py-5 rounded-xl text-3xl font-bold hover:bg-pink-300 transition">
            Edit tampilan dashboard utama
          </button>

        </div>

      </div>
    </div>
  );
};

export default DashboardAdmin;