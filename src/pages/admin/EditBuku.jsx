import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PopUp from "../../components/ui/Popup";

export default function EditBuku() {
  const { id } = useParams();
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
  const [popupMessage, setPopupMessage] = useState("");
  const [actionType, setActionType] = useState("");

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

  const handleButtonClick = (type) => {
    setActionType(type);

    setPopupStep("confirm");

    if (type === "update") {
      setPopupMessage("Simpan perubahan?");
    }

    if (type === "hapus") {
      setPopupMessage("Hapus buku?");
    }

    if (type === "arsip") {
      setPopupMessage("Arsipkan buku?");
    }

    setShowPopup(true);
  };

  const handleSave = () => {
    setPopupStep("success");

    if (actionType === "update") {
      setPopupMessage("Data berhasil diperbarui");
    }

    if (actionType === "hapus") {
      setPopupMessage("Buku berhasil dihapus");
    }

    if (actionType === "arsip") {
      setPopupMessage("Buku berhasil diarsipkan");
    }
  };

  return (
    <div className="p-10 bg-white min-h-screen font-sans">

      <h1 className="text-3xl font-bold mb-8 text-black">
        Edit Buku
      </h1>

      <div className="flex flex-col md:flex-row gap-10">

        {/* COVER */}
        <div className="w-[300px]">

          <div className="w-full h-[420px] bg-gray-200 border border-gray-400 rounded-sm shadow-sm overflow-hidden mb-4">

            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
                Belum ada cover
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
            className="text-[10px] text-gray-500 cursor-pointer"
          />

        </div>

        {/* FORM */}
        <div className="flex-1 flex flex-col gap-4 max-w-2xl">

          <div className="grid grid-cols-[120px_1fr] items-center gap-2">
            <label className="font-bold text-sm">
              Judul :
            </label>

            <input
              name="judul"
              value={form.judul}
              onChange={handleChange}
              className="border border-gray-400 rounded-md px-3 py-1 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">

            <label className="font-bold text-sm">
              Sinopsis
            </label>

            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-3 h-44 resize-none"
            />

          </div>

          {[
            ["penulis", "Penulis"],
            ["penerbit", "Penerbit"],
            ["tahun", "Tahun terbit"],
            ["stok", "Stok"],
            ["rak", "Nomor rak"],
          ].map(([name, label]) => (

            <div
              key={name}
              className="grid grid-cols-[120px_1fr] items-center gap-2"
            >

              <label className="font-bold text-sm">
                {label} :
              </label>

              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="border border-gray-400 rounded-md px-3 py-1 text-sm"
              />

            </div>

          ))}

          <div className="flex justify-end gap-3 mt-6">

            <button
              onClick={() =>
                handleButtonClick("arsip")
              }
              className="bg-[#F8C1D5] px-6 py-1 rounded font-bold text-sm"
            >
              ARSIPKAN
            </button>

            <button
              onClick={() =>
                handleButtonClick("update")
              }
              className="bg-[#F8C1D5] px-6 py-1 rounded font-bold text-sm"
            >
              UPDATE
            </button>

            <button
              onClick={() =>
                handleButtonClick("hapus")
              }
              className="bg-[#F8C1D5] px-6 py-1 rounded font-bold text-sm"
            >
              HAPUS
            </button>

          </div>

        </div>

      </div>

      {/* POPUP */}
      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      >

        <div className="p-4 text-center">

          <h2 className="text-xl font-bold mb-8">
            {popupMessage}
          </h2>

          {popupStep === "confirm" ? (

            <div className="flex justify-center gap-6">

              <button
                onClick={handleSave}
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
                setShowPopup(false);

                if (actionType === "hapus") {
                  navigate("/kelolabuku", {
                    state: {
                      deletedId: id,
                    },
                  });
                } else {
                  navigate("/kelolabuku", {
                    state: {
                      updatedBook: {
                        ...form,
                        id,
                        cover: preview,
                        status:
                          actionType === "arsip"
                            ? "diarsipkan"
                            : "aktif",
                      },
                    },
                  });
                }
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