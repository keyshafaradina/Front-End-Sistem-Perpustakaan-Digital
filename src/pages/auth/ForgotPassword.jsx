import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../../components/ui/Button";
import KotakInput from "../../components/ui/KotakInput";
import PopUp from "../../components/ui/Popup";

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

    // VALIDASI
    if (!form.username || !form.email) {
      setShowPopup(true);
      return;
    }

    navigate("/verifikasi-email");
  };

  return (
    <div className="mt-36 flex flex-col items-center justify-center">

      {/* CONTENT */}
      <div className="px-2 py-16">

        {/* TITLE */}
        <h2 className="text-3xl text-center font-bold mb-5">
          Lupa Password
        </h2>

        <div className="flex flex-col gap-6 max-w-lg">

          {/* USERNAME */}
          <KotakInput
            label="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            direction="column"
            placeholder="Masukkan username"
          />

          {/* EMAIL */}
          <KotakInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            direction="column"
            placeholder="Masukkan email"
          />

          {/* BUTTON */}
          <div className="flex justify-center gap-5 m-64 -mb-10 mt-6">

            <Button onClick={handleKembali}>
              Kembali
            </Button>

            <Button onClick={handleLanjutkan}>
              Lanjutkan
            </Button>

          </div>

        </div>

      </div>

      {/* POPUP */}
      <PopUp isOpen={showPopup}>
        <h1 className="text-lg font-bold mb-3 text-center">
          Peringatan
        </h1>

        <p className="mb-5 text-center">
          Silahkan isi username dan email!
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => setShowPopup(false)}
            className="font-bold bg-pink-300 hover:bg-pink-100 px-5 py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      </PopUp>

    </div>
  );
};

export default ForgotPassword;