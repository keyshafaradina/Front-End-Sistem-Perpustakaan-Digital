import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import KotakInput from "../../components/ui/KotakInput";
import PopUp from "../../components/ui/Popup";

const VerifikasiEmail = () => {
  const navigate = useNavigate();

  const [kode, setKode] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleVerifikasi = () => {

    if (!kode) {
      setShowPopup(true);
      return;
    }

    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">

      <div className="w-full max-w-md">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-4">
          Verifikasi Email
        </h1>

        {/* DESKRIPSI */}
        <p className="text-center text-gray-500 mb-8">
          Masukkan kode verifikasi yang telah dikirim ke email anda
        </p>

        {/* INPUT OTP */}
        <KotakInput
          label="Kode Verifikasi"
          type="text"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          direction="column"
          placeholder="Masukkan kode OTP"
        />

        {/* BUTTON */}
        <div className="flex justify-center mt-6">
          <Button onClick={handleVerifikasi}>
            Verifikasi
          </Button>
        </div>

        {/* KIRIM ULANG */}
        <p className="text-center text-sm mt-5">
          Tidak menerima kode?{" "}

          <button className="text-pink-400 font-semibold hover:underline">
            Kirim ulang
          </button>
        </p>

      </div>

      {/* POPUP */}
      <PopUp isOpen={showPopup}>
        <h1 className="text-lg font-bold text-center mb-3">
          Peringatan
        </h1>

        <p className="text-center mb-5">
          Silahkan isi kode verifikasi!
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => setShowPopup(false)}
            className="bg-pink-300 px-5 py-2 rounded-lg font-bold"
          >
            OK
          </button>
        </div>
      </PopUp>

    </div>
  );
};

export default VerifikasiEmail;