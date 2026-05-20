import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import KotakInput from "../../components/ui/KotakInput";
import PopUp from "../../components/ui/Popup";

const Register = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
  });

  const [form, setForm] = useState({
    nama: "",
    tanggalLahir: "",
    alamat: "",
    email: "",
    telepon: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // VALIDASI INPUT
    if (
      !form.nama ||
      !form.tanggalLahir ||
      !form.alamat ||
      !form.email ||
      !form.telepon ||
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

    // BERHASIL
    setPopupData({
      title: "Berhasil",
      message: "Silahkan lakukan login.",
    });

    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);

    // pindah ke login kalau berhasil
    if (popupData.title === "Berhasil") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen mt-10 flex justify-center items-center bg-white px-5 font-sans">

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
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4"
        >

          <KotakInput
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={handleChange}
          />

          <KotakInput
            type="text"
            name="tanggalLahir"
            placeholder="Tanggal Lahir"
            value={form.tanggalLahir}
            onChange={handleChange}
          />

          <KotakInput
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={form.alamat}
            onChange={handleChange}
          />

          <KotakInput
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <KotakInput
            type="tel"
            name="telepon"
            placeholder="No telepon"
            value={form.telepon}
            onChange={handleChange}
          />

          <KotakInput
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <KotakInput
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          {/* LOGIN LINK */}
          <div className="text-right">
            <span className="text-xs text-pink-300">
              Sudah memiliki akun?{" "}
              <Link
                to="/login"
                className="font-bold hover:underline"
              >
                Login disini
              </Link>
            </span>
          </div>

          {/* BUTTON */}
          <Button type="submit">
            Daftar
          </Button>

        </form>
      </div>
      <PopUp
        isOpen={showPopup}
        onClose={handleClosePopup}
      >
        <h1 className="text-lg font-bold mb-3">
          {popupData.title}
        </h1>

        <p className="mb-5 text-center">
          {popupData.message}
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleClosePopup}
            className="font-bold bg-pink-300 hover:bg-pink-100 px-5 py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      </PopUp>

    </div>
  );
};

export default Register;