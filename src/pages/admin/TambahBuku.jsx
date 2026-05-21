import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PopUp from "../../components/ui/Popup";

export default function TambahBuku() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    penerbit: "",
    tahun: "",
    stok: "",
    rak: "",
    deskripsi: "",
    cover: "",
  });

  const [preview, setPreview] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState("confirm");
  const [popupMessage, setPopupMessage] =
    useState("Tambah buku?");

  useEffect(() => {
    if (location.state) {
      setForm(location.state);
      setPreview(location.state.cover);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleTambah = () => {
    setPopupStep("success");
    setPopupMessage(
      "Buku berhasil ditambahkan"
    );
  };

  return (
    <div className="p-10 bg-white min-h-screen font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b pb-2">

        <h1 className="text-3xl font-bold">
          Tambah Buku
        </h1>

      </div>

      <div className="flex flex-col md:flex-row gap-10">

        {/* COVER */}
        <div className="w-[300px]">

          <div className="w-full h-[400px] bg-gray-200 border-2 border-gray-300 rounded shadow-sm overflow-hidden mb-4">

            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}

          </div>

          <input
            type="file"
            onChange={(e) =>
              setPreview(
                URL.createObjectURL(
                  e.target.files[0]
                )
              )
            }
            className="text-xs"
          />

        </div>

        {/* FORM */}
        <div className="flex-1 flex flex-col gap-4">

          <div className="grid grid-cols-[120px_1fr] gap-2">

            <label className="font-bold">
              Judul :
            </label>

            <input
              name="judul"
              value={form.judul}
              onChange={handleChange}
              className="border border-gray-400 rounded px-2 py-1"
            />

          </div>

          <div className="flex flex-col gap-1">

            <label className="font-bold">
              Sinopsis
            </label>

            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="border border-gray-400 rounded p-2 h-40 resize-none"
            />

          </div>

          <div className="flex flex-col gap-3">

            <div className="grid grid-cols-[120px_1fr] gap-2">
              <label className="font-bold">
                Penulis :
              </label>

              <input
                name="penulis"
                value={form.penulis}
                onChange={handleChange}
                className="border border-gray-400 rounded px-2 py-1"
              />
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-2">
              <label className="font-bold">
                Penerbit :
              </label>

              <input
                name="penerbit"
                value={form.penerbit}
                onChange={handleChange}
                className="border border-gray-400 rounded px-2 py-1"
              />
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-2">
              <label className="font-bold">
                Tahun terbit :
              </label>

              <input
                name="tahun"
                value={form.tahun}
                onChange={handleChange}
                className="border border-gray-400 rounded px-2 py-1"
              />
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-2">
              <label className="font-bold">
                Stok :
              </label>

              <input
                name="stok"
                value={form.stok}
                onChange={handleChange}
                className="border border-gray-400 rounded px-2 py-1"
              />
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-2">
              <label className="font-bold">
                Nomor rak :
              </label>

              <input
                name="rak"
                value={form.rak}
                onChange={handleChange}
                className="border border-gray-400 rounded px-2 py-1"
              />
            </div>

          </div>

          {/* BUTTON */}
          <div className="flex justify-end mt-4">

            <button
              onClick={() => {
                setPopupStep("confirm");
                setPopupMessage(
                  "Tambah buku?"
                );
                setShowPopup(true);
              }}
              className="bg-[#F8C1D5] px-10 py-1 rounded font-bold"
            >
              TAMBAH
            </button>

          </div>

        </div>

      </div>

      {/* POPUP */}
      <PopUp
        isOpen={showPopup}
        onClose={() =>
          setShowPopup(false)
        }
      >

        <div className="p-4 text-center">

          <h2 className="text-xl font-bold mb-8">
            {popupMessage}
          </h2>

          {popupStep === "confirm" ? (

            <div className="flex justify-center gap-6">

              <button
                onClick={handleTambah}
                className="bg-[#F8C1D5] px-10 py-1 rounded font-bold"
              >
                Ya
              </button>

              <button
                onClick={() =>
                  setShowPopup(false)
                }
                className="bg-[#F8C1D5] px-10 py-1 rounded font-bold"
              >
                Tidak
              </button>

            </div>

          ) : (

            <button
              onClick={() => {
                navigate(
                  "/kelolabuku",
                  {
                    state: {
                      newBook: {
                        ...form,
                        id: Date.now(),
                        cover: preview,
                        status: "aktif",
                      },
                    },
                  }
                );
              }}
              className="bg-[#F8C1D5] px-10 py-1 rounded font-bold"
            >
              OK
            </button>

          )}

        </div>

      </PopUp>

    </div>
  );
}