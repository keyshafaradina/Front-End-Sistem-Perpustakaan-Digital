import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Calendar,
  MapPin,
  Mail,
  Phone,
  AtSign,
  Lock,
  UserPlus,
} from "lucide-react";

import Button from "../../components/ui/Button";
import PopUp from "../../components/ui/PopUp";
import { register } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
  });

  const [form, setForm] = useState({
    nama_lengkap: "",
    tanggal_lahir: "",
    alamat: "",
    email: "",
    no_telepon: "",
    username: "",
    password: "",
  });

  const fields = [
    { name: "nama_lengkap", type: "text", placeholder: "Nama Lengkap", icon: User },
    { name: "tanggal_lahir", type: "date", placeholder: "Tanggal Lahir", icon: Calendar },
    { name: "alamat", type: "text", placeholder: "Alamat", icon: MapPin },
    { name: "email", type: "email", placeholder: "Email", icon: Mail },
    { name: "no_telepon", type: "tel", placeholder: "No Telepon", icon: Phone },
    { name: "username", type: "text", placeholder: "Username", icon: AtSign },
    { name: "password", type: "password", placeholder: "Password", icon: Lock },
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !form.nama_lengkap ||
      !form.tanggal_lahir ||
      !form.alamat ||
      !form.email ||
      !form.no_telepon ||
      !form.username ||
      !form.password
    ) {
      setPopupData({
        title: "Peringatan",
        message: "Silahkan lengkapi data diri!",
      });
      setShowPopup(true);
      return;
    }

    try {
      setLoading(true);

      console.log("DATA DIKIRIM:", form);

      const res = await register(form);

      console.log("REGISTER BERHASIL:", res.data);

      setPopupData({
        title: "Berhasil",
        message: "Akun berhasil dibuat. Silahkan login.",
      });

      setShowPopup(true);
    } catch (error) {
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);

      let message = "Registrasi gagal. Cek console browser dan terminal Laravel.";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      if (error.response?.data?.errors) {
        message = Object.values(error.response.data.errors).flat().join(", ");
      }

      setPopupData({
        title: "Gagal",
        message,
      });

      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);

    if (popupData.title === "Berhasil") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white px-5 py-12 flex items-center justify-center font-sans">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 items-center">
        <div className="hidden lg:block">
          <div className="bg-pink-200 rounded-[36px] p-10 shadow-xl border border-pink-100">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md mb-8">
              <UserPlus className="text-pink-500" size={42} />
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Humbang
              <br />
              E-Library
            </h1>

            <p className="text-gray-700 mt-5 text-lg leading-relaxed">
              Daftar sebagai anggota perpustakaan digital untuk mengakses kartu
              anggota dan layanan peminjaman buku.
            </p>

            <div className="mt-10 bg-white/70 rounded-3xl p-5 border border-white">
              <p className="font-bold text-gray-800">
                Sistem Informasi Perpustakaan Digital
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Cepat, mudah, dan modern.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[36px] shadow-xl border border-pink-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-pink-100 rounded-3xl flex items-center justify-center mb-4">
              <UserPlus className="text-pink-500" size={32} />
            </div>

            <h2 className="text-4xl font-extrabold text-gray-900">
              Buat Akun Baru
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Silahkan isi data diri untuk mendaftar dan membuat kartu anggota
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {fields.map((field) => {
              const Icon = field.icon;

              return (
                <div key={field.name} className="relative">
                  <Icon
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                  />

                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full bg-pink-50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              );
            })}

            <p className="text-xs text-gray-400">
              Password minimal 8 karakter, mengandung huruf besar, huruf kecil,
              angka, dan simbol. Contoh: Admin123@
            </p>

            <div className="text-right">
              <span className="text-sm text-gray-500">
                Sudah memiliki akun?{" "}
                <Link
                  to="/login"
                  className="font-bold text-pink-500 hover:text-pink-600 hover:underline"
                >
                  Login disini
                </Link>
              </span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 bg-pink-400 hover:bg-pink-500 text-white rounded-2xl py-4 text-lg font-bold shadow-md disabled:opacity-60"
            >
              {loading ? "Mendaftarkan..." : "Daftar"}
            </Button>
          </form>
        </div>
      </div>

      <PopUp isOpen={showPopup} onClose={handleClosePopup}>
        <div className="text-center min-w-[300px]">
          <h1 className="text-xl font-bold mb-3">{popupData.title}</h1>

          <p className="mb-6 text-gray-600">{popupData.message}</p>

          <button
            onClick={handleClosePopup}
            className="font-bold bg-pink-400 hover:bg-pink-500 text-white px-8 py-2 rounded-xl transition"
          >
            OK
          </button>
        </div>
      </PopUp>
    </div>
  );
};

export default Register;