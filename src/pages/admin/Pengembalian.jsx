import React, { useState } from "react";
import Button from "../../components/ui/Button";
import PopUp from "../../components/ui/Popup";
import KotakInput from "../../components/ui/KotakInput";

export default function Pengembalian() {
  const [step, setStep] = useState(1);

  // DATA ANGGOTA
  const [userData, setUserData] = useState({
    nomor: "",
    nama: "",
  });

  // DATA BUKU
  const [books] = useState([
    {
      id: 1,
      judul: "SEPTIAN",
      kode: "0862",
      tanggalPinjam: "01-08-2026",
      tanggalKembali: "08-08-2026",
      gambar: "/images/nailong.jpg",
    },
    {
      id: 2,
      judul: "LASKAR PELANGI",
      kode: "0911",
      tanggalPinjam: "02-08-2026",
      tanggalKembali: "09-08-2026",
      gambar: "/images/nailong.jpg",
    },
    {
      id: 3,
      judul: "BUMI",
      kode: "0771",
      tanggalPinjam: "03-08-2026",
      tanggalKembali: "10-08-2026",
      gambar: "/images/nailong.jpg",
    },
  ]);

  // BUKU YANG SUDAH DIKEMBALIKAN
  const [returnedBooks, setReturnedBooks] = useState([]);

  // POPUP
  const [showPopup, setShowPopup] = useState(false);

  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
    action: "",
    bookId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SCAN
  const handleScan = () => {
    if (
      userData.nomor.trim() === "" ||
      userData.nama.trim() === ""
    ) {
      setPopupData({
        message: "Harap lengkapi data",
        action: "",
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
    <div className="min-h-screen bg-white p-8 font-sans text-black">

      <h2 className="text-3xl font-bold mb-10">
        Pengembalian Buku
      </h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="flex flex-col items-center justify-center mt-10">

          <div className="w-[520px] mb-16">
            <h3 className="text-center font-bold text-lg mb-6">
              Data Anggota
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-5">
                <label className="w-24 text-right text-sm font-bold">
                  Nomor :
                </label>

                <KotakInput
                  type="text"
                  name="nomor"
                  value={userData.nomor}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-24 text-right text-sm font-bold">
                  Nama :
                </label>

                <KotakInput
                  type="text"
                  name="nama"
                  value={userData.nama}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          <div className="text-center">
            <p className="font-bold text-sm mb-6">
              Silahkan lakukan scan QR kartu anggota
            </p>

            <Button onClick={handleScan}>
              CARI
            </Button>
          </div>

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="animate-in fade-in duration-300">

          {/* DATA ANGGOTA */}
          <div className="mb-10">
            <h3 className="font-bold text-xl mb-6 text-center">
              Data Anggota
            </h3>

            <div className="space-y-4 max-w-3xl mx-auto">

              <div className="flex items-center gap-5">
                <label className="w-24 text-right text-sm font-bold">
                  Nomor :
                </label>

                <KotakInput value={userData.nomor} readOnly />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-24 text-right text-sm font-bold">
                  Nama :
                </label>

                <KotakInput value={userData.nama} readOnly />
              </div>

            </div>
          </div>

          {/* DATA BUKU */}
          <div>
            <h3 className="font-bold text-xl mb-8 text-center">
              Data Buku
            </h3>

            <div className="space-y-5">

              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-gray-100 rounded-lg p-5 flex items-center justify-between"
                >

                  <div className="flex items-center gap-5">

                    <div className="w-24 h-32 overflow-hidden rounded border border-gray-300">
                      <img
                        src={book.gambar}
                        alt={book.judul}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>

                      <h1 className="font-bold text-2xl mb-3">
                        {book.judul}
                      </h1>

                      <p className="text-sm mb-1">
                        Kode Buku : {book.kode}
                      </p>

                      <p className="text-sm mb-1">
                        Tanggal Peminjaman : {book.tanggalPinjam}
                      </p>

                      <p className="text-sm font-semibold bg-pink-200 inline-block px-3 py-1 rounded-full">
                        Tanggal Pengembalian : {book.tanggalKembali}
                      </p>

                    </div>

                  </div>

                  <div>
                    <Button
                      disabled={returnedBooks.includes(book.id)}
                      onClick={() => {
                        if (returnedBooks.includes(book.id)) return;

                        setPopupData({
                          title: "Konfirmasi",
                          message: `Kembalikan buku ${book.judul}?`,
                          action: "save",
                          bookId: book.id,
                        });

                        setShowPopup(true);
                      }}
                    >
                      {returnedBooks.includes(book.id)
                        ? "Sudah Dikembalikan"
                        : "Pengembalian"}
                    </Button>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* BUTTON BAWAH */}
          <div className="flex justify-end mt-10">
            <Button
              onClick={() => {
                setPopupData({
                  title: "Konfirmasi",
                  message: "Batalkan pengembalian?",
                  action: "cancel",
                });

                setShowPopup(true);
              }}
            >
              Batalkan
            </Button>
          </div>

        </div>
      )}

      {/* POPUP */}
      <PopUp isOpen={showPopup} onClose={handleClosePopup}>

        <h1 className="text-xl font-bold mb-4 text-center">
          {popupData.title}
        </h1>

        <p className="text-center mb-6">
          {popupData.message}
        </p>

        <div className="flex justify-center gap-4">

          {popupData.action === "save" || popupData.action === "cancel" ? (
            <>
              <Button
                onClick={() => {

                  if (popupData.action === "save") {

                    const updatedBooks = [
                      ...returnedBooks,
                      popupData.bookId,
                    ];

                    setReturnedBooks(updatedBooks);

                    if (updatedBooks.length === books.length) {

                      setPopupData({
                        title: "Berhasil",
                        message: "Semua buku berhasil dikembalikan",
                        action: "finish",
                      });

                    } else {

                      setPopupData({
                        title: "Berhasil",
                        message: "Buku berhasil dikembalikan",
                        action: "",
                      });

                    }

                  } else if (popupData.action === "cancel") {

                    setPopupData({
                      title: "Dibatalkan",
                      message: "Pengembalian dibatalkan",
                      action: "reset",
                    });

                  }
                }}
              >
                Ya
              </Button>

              <Button onClick={handleClosePopup}>
                Tidak
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {

                handleClosePopup();

                if (
                  returnedBooks.length === books.length ||
                  popupData.action === "reset"
                ) {
                  setStep(1);
                  setUserData({ nomor: "", nama: "" });
                  setReturnedBooks([]);
                }
              }}
            >
              OK
            </Button>
          )}

        </div>

      </PopUp>

    </div>
  );
}