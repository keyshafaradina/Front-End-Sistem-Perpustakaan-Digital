import React from "react";

const LandingLogin = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      
      {/* HEADER */}
      
      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-center items-center">

        {/* LOGO */}
        <div className="mb-10">
          <img
            src="/logo.humbang.png"
            alt="Logo Perpustakaan"
            className="w-52 h-auto"
          />
        </div>

        {/* BUTTON ROLE */}
        <div className="flex flex-col gap-5 w-full max-w-sm">

          {/* BUTTON ADMIN */}
          <button className="bg-pink-200 py-3 rounded-xl font-bold hover:bg-pink-300 transition">
            Login sebagai admin
          </button>

          {/* BUTTON ANGGOTA */}
          <button className="bg-pink-200 py-3 rounded-xl font-bold hover:bg-pink-300 transition">
            Login sebagai anggota perpustakaan
          </button>

        </div>

      </div>
    </div>
  );
};

export default LandingLogin;