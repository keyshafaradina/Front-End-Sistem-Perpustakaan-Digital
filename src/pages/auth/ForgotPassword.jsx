import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleKembali = () => {
    navigate("/login");
  };

  const handleLanjutkan = () => {
    if (!form.username || !form.email) {
      setShowPopup(true);
      return;
    }

    navigate("/reset-password");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center px-4">
        <div className="absolute top-24 left-20 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-24 right-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-20"></div>

        <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg mb-5">
              <KeyRound size={52} className="text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Lupa Password
            </h1>

            <p className="text-gray-500 text-center mt-2 text-sm">
              Masukkan username dan email untuk melanjutkan proses reset password.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleKembali}
                className="w-1/2 flex items-center justify-center gap-2 py-3 rounded-2xl border border-pink-300 text-pink-500 font-bold hover:bg-pink-50 transition-all"
              >
                <ArrowLeft size={18} />
                Kembali
              </button>

              <button
                onClick={handleLanjutkan}
                className="w-1/2 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-80 rounded-3xl shadow-2xl p-6 border border-pink-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                ⚠️
              </div>

              <h2 className="font-bold text-lg text-gray-800">
                Peringatan
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              Silahkan isi username dan email!
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;