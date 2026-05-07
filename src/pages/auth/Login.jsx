import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      
      {/* HEADER */}
      <div className="bg-pink-200 px-10 py-5 flex justify-between items-center">
        
        <h1 className="text-3xl font-bold">
          Humbang E-Library
        </h1>

        <p className="text-sm font-bold">
          Sistem Informasi Perpustakaan Digital
        </p>

      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-center items-center">

        {/* ICON PROFILE */}
        <div className="w-28 h-28 bg-pink-200 rounded-full border border-black flex justify-center items-center mb-8">
          <span className="text-6xl">👤</span>
        </div>

        {/* FORM */}
        <form className="w-full max-w-sm text-center">

          {/* EMAIL */}
          <div className="text-left text-sm ml-2 mb-1">
            Email / Username
          </div>

          <input
            type="text"
            className="w-full border border-black rounded-2xl py-3 px-4 text-center mb-5 outline-none"
          />

          {/* PASSWORD */}
          <div className="text-left text-sm ml-2 mb-1">
            Password
          </div>

          <input
            type="password"
            className="w-full border border-black rounded-2xl py-3 px-4 text-center mb-5 outline-none"
          />

          {/* FORGOT PASSWORD */}
          <div className="mb-6">
            <a
              href="/forgot-password"
              className="text-pink-500 text-sm hover:underline"
            >
              Forget password?
            </a>
          </div>

          {/* BUTTON LOGIN */}
          <button
            className="bg-pink-200 border border-black px-12 py-3 rounded-lg font-bold hover:bg-pink-300 transition"
          >
            LOGIN
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;