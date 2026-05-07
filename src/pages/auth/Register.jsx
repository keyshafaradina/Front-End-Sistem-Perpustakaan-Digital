import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-5 font-sans">
      
      {/* CONTAINER */}
      <div className="w-full max-w-md text-center">

        {/* TITLE */}
        <h2 className="text-4xl font-bold mb-2">
          Buat Akun Baru
        </h2>

        <p className="text-sm text-gray-500 mb-8">
          Silahkan isi data diri untuk mendaftar dan membuat kartu anggota
        </p>

        {/* FORM */}
        <form>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <input
            type="text"
            placeholder="Tanggal Lahir"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <input
            type="text"
            placeholder="Alamat"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <input
            type="tel"
            placeholder="No telepon"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          {/* LOGIN LINK */}
          <div className="text-right mb-6">
            <span className="text-xs text-pink-300">
              Sudah memiliki akun?{" "}
              <a
                href="/login"
                className="font-bold hover:underline"
              >
                Login disini
              </a>
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-pink-200 text-white font-bold px-12 py-3 rounded-xl hover:bg-pink-300 transition"
          >
            Daftar
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;