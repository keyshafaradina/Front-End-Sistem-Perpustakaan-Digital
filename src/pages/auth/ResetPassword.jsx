import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import KotakInput from "../../components/ui/KotakInput";
import PopUp from "../../components/ui/Popup";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
  });

  const [form, setForm] = useState({
    passwordBaru: "",
    konfirmasiPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSimpan = () => {

    // VALIDASI KOSONG
    if (
      !form.passwordBaru ||
      !form.konfirmasiPassword
    ) {
      setPopupData({
        title: "Peringatan",
        message: "Silahkan isi semua data!",
      });

      setShowPopup(true);
      return;
    }

    // VALIDASI PASSWORD TIDAK SAMA
    if (
      form.passwordBaru !==
      form.konfirmasiPassword
    ) {
      setPopupData({
        title: "Peringatan",
        message: "Konfirmasi password tidak sesuai!",
      });

      setShowPopup(true);
      return;
    }

    // BERHASIL
    setPopupData({
      title: "Berhasil",
      message: "Password berhasil diubah.",
    });

    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);

    // balik ke login kalau berhasil
    if (popupData.title === "Berhasil") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">

      <div className="w-full max-w-md">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        {/* FORM */}
        <div className="flex flex-col gap-5">

          <KotakInput
            label="Password Baru"
            type="password"
            name="passwordBaru"
            value={form.passwordBaru}
            onChange={handleChange}
            direction="column"
            placeholder="Masukkan password baru"
          />

          <KotakInput
            label="Konfirmasi Password"
            type="password"
            name="konfirmasiPassword"
            value={form.konfirmasiPassword}
            onChange={handleChange}
            direction="column"
            placeholder="Masukkan ulang password"
          />

          {/* BUTTON */}
          <div className="flex justify-center mt-4">
            <Button onClick={handleSimpan}>
              Simpan Password
            </Button>
          </div>

        </div>
      </div>

      {/* POPUP */}
      <PopUp isOpen={showPopup}>
        <h1 className="text-lg font-bold text-center mb-3">
          {popupData.title}
        </h1>

        <p className="text-center mb-5">
          {popupData.message}
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleClosePopup}
            className="bg-pink-300 hover:bg-pink-100 px-5 py-2 rounded-lg font-bold"
          >
            OK
          </button>
        </div>
      </PopUp>

    </div>
  );
};

export default ResetPassword;