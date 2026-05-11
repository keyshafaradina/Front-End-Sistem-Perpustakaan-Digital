import React from "react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* CONTENT */}
      <div className="px-20 py-16">

        {/* TITLE */}
        <h2 className="text-5xl font-bold mb-14">
          Lupa Password
        </h2>

        {/* FORM */}
        <div className="flex flex-col gap-6 max-w-lg">

          {/* USERNAME */}
          <div className="flex items-center gap-5">
            
            <label className="w-28 text-lg font-bold">
              Username
            </label>

            <input
              type="text"
              className="border border-black rounded-2xl px-5 py-2 w-64 outline-none"
            />

          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-5">
            
            <label className="w-28 text-lg font-bold">
              Email
            </label>

            <input
              type="email"
              className="border border-black rounded-2xl px-5 py-2 w-64 outline-none"
            />

          </div>

          {/* BUTTON */}
          <div className="flex gap-5 ml-32 mt-5">

            <button className="bg-pink-200 px-6 py-2 rounded-xl font-bold hover:bg-pink-300 transition">
              Kembali
            </button>

            <button className="bg-pink-200 px-6 py-2 rounded-xl font-bold hover:bg-pink-300 transition">
              Lanjutkan
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;