import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import PopUp from "../../components/ui/Popup";

export default function Pengembalian() {
  const [step, setStep] = useState(1);

  // DATA INPUT
  const [userData, setUserData] = useState({
    nomor: '',
    nama: ''
  });

  // POPUP
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
    action: "" // save | cancel | ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // SCAN
  const handleScan = () => {
    if (userData.nomor.trim() === '' || userData.nama.trim() === '') {
      setPopupData({
        title: "Peringatan",
        message: "Nomor dan Nama wajib diisi!",
        action: ""
      });
      setShowPopup(true);
      return;
    }

    setStep(2);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-white p-10 font-sans relative text-black">
      
      <h2 className="text-2xl font-bold mb-10 ml-4">Pengembalian Buku</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-[500px] mb-16">
            <h3 className="text-center font-bold text-sm mb-6">Data Anggota</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-24 text-right mr-6 text-xs font-bold">Nomor :</label>
                <input 
                  type="text"
                  name="nomor"
                  value={userData.nomor}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-full h-8 px-4 text-xs outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-right mr-6 text-xs font-bold">Nama :</label>
                <input 
                  type="text"
                  name="nama"
                  value={userData.nama}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-full h-8 px-4 text-xs outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-bold text-sm mb-6">Silahkan lakukan scan QR kartu anggota</p>
            <Button onClick={handleScan}>SCAN</Button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="max-w-4xl ml-16 animate-in fade-in duration-300">
          
          {/* DATA ANGGOTA */}
          <div className="mb-10">
            <h3 className="font-bold text-sm mb-6 ml-44">Data Anggota</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <label className="w-24 text-right mr-6 text-xs font-bold">Nomor :</label>
                <input value={userData.nomor} readOnly className="w-80 border border-gray-400 rounded-full px-5 py-1 text-xs bg-transparent outline-none" />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-right mr-6 text-xs font-bold">Nama :</label>
                <input value={userData.nama} readOnly className="w-80 border border-gray-400 rounded-full px-5 py-1 text-xs bg-transparent outline-none" />
              </div>
            </div>
          </div>

          {/* DATA BUKU */}
          <div className="mb-12">
            <h3 className="font-bold text-sm mb-6 ml-44">Data Buku</h3>
            <div className="flex items-start gap-10">
              <div className="w-28 h-40 border border-gray-400 flex-shrink-0">
                <img src="/images/nailong.jpg" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2 mt-2">
                {[
                  { label: "Judul buku :", val: "SEPTIAN" },
                  { label: "Kode buku :", val: "0862" },
                  { label: "Tanggal Peminjaman :", val: "01-04-2026" },
                  { label: "Tanggal Pengembalian :", val: "06-04-2026" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <label className="w-40 text-[11px] font-bold">{item.label}</label>
                    <input value={item.val} readOnly className="w-72 border border-gray-400 rounded-full px-4 py-1 text-[11px] bg-transparent outline-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TOMBOL */}
          <div className="w-[580px] flex justify-end gap-5">
            <button 
              onClick={() => {
                setPopupData({
                  title: "Konfirmasi",
                  message: "Batalkan pengembalian?",
                  action: "cancel"
                });
                setShowPopup(true);
              }}
              className="bg-[#fbc2eb] border border-gray-400 px-10 py-1.5 rounded-md text-xs font-bold shadow-sm"
            >
              Batalkan
            </button>

            <button 
              onClick={() => {
                setPopupData({
                  title: "Konfirmasi",
                  message: "Simpan data pengembalian?",
                  action: "save"
                });
                setShowPopup(true);
              }}
              className="bg-[#fbc2eb] border border-gray-400 px-10 py-1.5 rounded-md text-xs font-bold shadow-sm"
            >
              Dikembalikan
            </button>
          </div>
        </div>
      )}

      {/* POPUP */}
      <PopUp isOpen={showPopup} onClose={handleClosePopup}>
        <h1 className="text-lg font-bold mb-3">{popupData.title}</h1>
        <p className="mb-5 text-center">{popupData.message}</p>

        <div className="flex justify-center gap-4">
          {popupData.action ? (
            <>
              <button
                onClick={() => {
                  if (popupData.action === "save") {
                    setPopupData({
                      title: "Berhasil",
                      message: "Data berhasil disimpan",
                      action: ""
                    });
                  } else {
                    setPopupData({
                      title: "Dibatalkan",
                      message: "Pengembalian dibatalkan",
                      action: ""
                    });
                  }
                }}
                className="font-bold bg-pink-300 px-5 py-2 rounded-lg"
              >
                Ya
              </button>

              <button
                onClick={handleClosePopup}
                className="font-bold bg-gray-200 px-5 py-2 rounded-lg"
              >
                Tidak
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleClosePopup();
                setStep(1);
                setUserData({ nomor: '', nama: '' });
              }}
              className="font-bold bg-pink-300 px-5 py-2 rounded-lg"
            >
              OK
            </button>
          )}
        </div>
      </PopUp>

    </div>
  );
}