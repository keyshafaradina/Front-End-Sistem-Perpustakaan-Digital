import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/ui/PopUp";
import api from "../../services/api";

export default function TambahBuku() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    kode_buku: "",
    judul: "",
    sinopsis: "",
    penulis: "",
    penerbit: "",
    tahun_terbit: "",
    stok: "",
    nomor_rak: "",
    gambar: null,
  });

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });

  const tombolPink =
    "min-w-[120px] bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-bold shadow-md transition";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      gambar: file,
    }));
  };

  const handleSubmit = () => {
    if (!form.kode_buku || !form.judul || !form.penulis || !form.stok) {
      setPopup({
        open: true,
        type: "info",
        title: "Peringatan",
        message: "Kode buku, judul, penulis, dan stok wajib diisi.",
      });
      return;
    }

    setPopup({
      open: true,
      type: "confirm",
      title: "Konfirmasi",
      message: "Tambah buku baru?",
    });
  };

  const simpanBuku = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      data.append("kode_buku", form.kode_buku);
      data.append("judul", form.judul);
      data.append("sinopsis", form.sinopsis);
      data.append("penulis", form.penulis);
      data.append("penerbit", form.penerbit);
      data.append("tahun_terbit", form.tahun_terbit);
      data.append("stok", form.stok);
      data.append("nomor_rak", form.nomor_rak);

      if (form.gambar) {
        data.append("gambar", form.gambar);
      }

      await api.post("/buku", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message: "Buku berhasil ditambahkan.",
      });
    } catch (error) {
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message: error.response?.data?.message || "Gagal menambahkan buku.",
      });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup({
      open: false,
      type: "",
      title: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        <button
          onClick={() => navigate("/kelolabuku")}
          className="mb-6 text-pink-600 font-semibold hover:text-pink-700 transition"
        >
          ← Kembali
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Tambah Buku</h1>
          <p className="text-gray-500 mt-2">
            Masukkan data buku baru ke perpustakaan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
          <div>
            <div className="w-full h-[430px] bg-pink-50 border border-pink-100 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview Buku"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <p className="font-semibold">No Image</p>
                  <p className="text-sm mt-1">Upload cover buku</p>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-4 block w-full text-sm"
            />
          </div>

          <div className="bg-pink-50 rounded-3xl border border-pink-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-2">Kode Buku</label>
                <input
                  name="kode_buku"
                  value={form.kode_buku}
                  onChange={handleChange}
                  placeholder="Masukkan kode buku"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Judul Buku</label>
                <input
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
                  placeholder="Masukkan judul buku"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Penulis</label>
                <input
                  name="penulis"
                  value={form.penulis}
                  onChange={handleChange}
                  placeholder="Masukkan nama penulis"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Penerbit</label>
                <input
                  name="penerbit"
                  value={form.penerbit}
                  onChange={handleChange}
                  placeholder="Masukkan penerbit"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Tahun Terbit
                </label>
                <input
                  name="tahun_terbit"
                  value={form.tahun_terbit}
                  onChange={handleChange}
                  placeholder="Contoh: 2024"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Stok</label>
                <input
                  type="number"
                  name="stok"
                  value={form.stok}
                  onChange={handleChange}
                  placeholder="Masukkan stok"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">Nomor Rak</label>
                <input
                  name="nomor_rak"
                  value={form.nomor_rak}
                  onChange={handleChange}
                  placeholder="Masukkan nomor rak"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">Sinopsis</label>
                <textarea
                  name="sinopsis"
                  value={form.sinopsis}
                  onChange={handleChange}
                  placeholder="Masukkan sinopsis buku"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-10 py-3 rounded-xl shadow-md transition disabled:opacity-60"
              >
                {loading ? "MENYIMPAN..." : "TAMBAH"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <PopUp isOpen={popup.open} onClose={closePopup}>
        <div className="text-center min-w-[300px]">
          <h2 className="text-xl font-bold mb-4">{popup.title}</h2>

          <p className="mb-6">{popup.message}</p>

          {popup.type === "confirm" ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  closePopup();
                  simpanBuku();
                }}
                className={tombolPink}
              >
                Ya
              </button>

              <button onClick={closePopup} className={tombolPink}>
                Tidak
              </button>
            </div>
          ) : popup.type === "success" ? (
            <button onClick={() => navigate("/kelolabuku")} className={tombolPink}>
              OK
            </button>
          ) : (
            <button onClick={closePopup} className={tombolPink}>
              OK
            </button>
          )}
        </div>
      </PopUp>
    </div>
  );
}