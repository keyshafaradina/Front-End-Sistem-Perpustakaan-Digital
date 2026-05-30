import { useState } from "react";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setPopupMessage("Email/Username dan Password wajib diisi!");
      setShowPopup(true);
      return;
    }

    try {
      const role =
        form.email.toLowerCase() === "admin@gmail.com" ||
        form.email.toLowerCase() === "admin"
          ? "admin"
          : "anggota";

      const res = await login({
        login: form.email,
        password: form.password,
        role,
      });

      const user = res.data.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/profileadmin");
      } else {
        navigate("/profileanggota");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error);

      setPopupMessage(
        error.response?.data?.message ||
          "Login gagal. Periksa Email/Username dan Password."
      );

      setShowPopup(true);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center px-4">

        {/* Background Blur */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-20"></div>

        {/* Card */}
        <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-pink-400 to-pink-500 w-28 h-28 rounded-full flex items-center justify-center shadow-lg mb-5">
              <UserRound
                size={75}
                strokeWidth={1.5}
                className="text-white"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-center mt-2">
              Login ke Sistem Informasi
              <br />
              Humbang E-Library
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email / Username
              </label>

              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email atau username"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-pink-500 hover:text-pink-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              LOGIN
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              © 2025 Humbang E-Library
            </p>
          </div>
        </div>
      </div>

      {/* Popup */}
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
              {popupMessage}
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
}

export default Login;