import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Archive, Save, Trash2, Upload } from "lucide-react";
import PopUp from "../../components/ui/Popup";
import api from "../../services/api";

export default function EditBuku() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [gambarFile, setGambarFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    kode_buku: "",
    judul: "",
    sinopsis: "",
    penulis: "",
    penerbit: "",
    tahun_terbit: "",
    stok: "",
    nomor_rak: "",
  });

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    action: "",
  });

  const getGambar = (gambar) => {
    if (!gambar) return "";
    if (gambar.startsWith("http")) return gambar;
    return `http://127.0.0.1:8000/uploads/buku/${gambar}?t=${Date.now()}`;
  };

  const getBuku = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/buku/${id}`);
      const data = res.data.data;

      setForm({
        kode_buku: data.kode_buku || "",
        judul: data.judul || "",
        sinopsis: data.sinopsis || "",
        penulis: data.penulis || "",
        penerbit: data.penerbit || "",
        tahun_terbit: data.tahun_terbit || "",
        stok: data.stok || "",
        nomor_rak: data.nomor_rak || "",
      });

      if (data.gambar) {
        setPreview(getGambar(data.gambar));
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data buku");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBuku();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setGambarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const bukaPopup = (action) => {
    let message = "";

    if (action === "update") message = "Simpan perubahan data buku?";
    if (action === "arsip") message = "Arsipkan buku ini?";
    if (action === "hapus") message = "Hapus buku ini?";

    setPopup({
      open: true,
      type: "confirm",
      title: "Konfirmasi",
      message,
      action,
    });
  };

  const closePopup = () => {
    setPopup({
      open: false,
      type: "",
      title: "",
      message: "",
      action: "",
    });
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("kode_buku", form.kode_buku);
      data.append("judul", form.judul);
      data.append("sinopsis", form.sinopsis);
      data.append("penulis", form.penulis);
      data.append("penerbit", form.penerbit);
      data.append("tahun_terbit", form.tahun_terbit);
      data.append("stok", form.stok);
      data.append("nomor_rak", form.nomor_rak);

      if (gambarFile) {
        data.append("gambar", gambarFile);
      }

      await api.post(`/buku/${id}?_method=PUT`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message: "Data buku berhasil diperbarui",
        action: "",
      });
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message:
          error.response?.data?.message ||
          "Gagal memperbarui data buku",
        action: "",
      });
    }
  };

  const handleArsip = async () => {
    try {
      await api.put(`/buku/${id}/arsipkan`);

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message: "Buku berhasil diarsipkan",
        action: "",
      });
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message:
          error.response?.data?.message ||
          "Gagal mengarsipkan buku",
        action: "",
      });
    }
  };

  const handleHapus = async () => {
    try {
      await api.put(`/buku/${id}/hapuskan`);

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message: "Buku berhasil dipindahkan ke data dihapus",
        action: "",
      });
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message:
          error.response?.data?.message ||
          "Gagal menghapus buku",
        action: "",
      });
    }
  };

  const jalankanAksi = () => {
    const action = popup.action;
    closePopup();

    if (action === "update") handleUpdate();
    if (action === "arsip") handleArsip();
    if (action === "hapus") handleHapus();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-semibold text-gray-500">
        Memuat data buku...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        <button
          onClick={() => navigate("/kelolabuku")}
          className="flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 mb-6"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Edit Buku
          </h1>
          <p className="text-gray-500 mt-2">
            Perbarui data buku perpustakaan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-10">
          <div>
            <div className="w-full h-[430px] bg-pink-50 border border-pink-100 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Cover Buku"
                  onError={() => setPreview("")}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <p className="font-semibold">Belum ada cover</p>
                  <p className="text-sm mt-1">Upload cover buku</p>
                </div>
              )}
            </div>

            <label className="mt-4 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl cursor-pointer shadow-md">
              <Upload size={18} />
              Upload Cover

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
              />
            </label>
          </div>

          <div className="bg-pink-50 rounded-3xl border border-pink-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-2">
                  Kode Buku
                </label>
                <input
                  name="kode_buku"
                  value={form.kode_buku}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Judul Buku
                </label>
                <input
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Penulis
                </label>
                <input
                  name="penulis"
                  value={form.penulis}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Penerbit
                </label>
                <input
                  name="penerbit"
                  value={form.penerbit}
                  onChange={handleChange}
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
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  name="stok"
                  value={form.stok}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">
                  Nomor Rak
                </label>
                <input
                  name="nomor_rak"
                  value={form.nomor_rak}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">
                  Sinopsis
                </label>
                <textarea
                  name="sinopsis"
                  value={form.sinopsis}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-4 mt-8">
              <button
                onClick={() => bukaPopup("arsip")}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
              >
                <Archive size={18} />
                Arsipkan
              </button>

              <button
                onClick={() => bukaPopup("update")}
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
              >
                <Save size={18} />
                Update
              </button>

              <button
                onClick={() => bukaPopup("hapus")}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
              >
                <Trash2 size={18} />
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <PopUp isOpen={popup.open} onClose={closePopup}>
        <div className="text-center min-w-[300px]">
          <h2 className="text-xl font-bold mb-4">
            {popup.title}
          </h2>

          <p className="mb-6">
            {popup.message}
          </p>

          {popup.type === "confirm" ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={jalankanAksi}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-xl font-bold shadow-md transition"
              >
                Ya
              </button>

              <button
                onClick={closePopup}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-xl font-bold shadow-md transition"
              >
                Tidak
              </button>
            </div>
          ) : popup.type === "success" ? (
            <button
              onClick={() => navigate("/kelolabuku")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-xl font-bold shadow-md transition"
            >
              OK
            </button>
          ) : (
            <button
              onClick={closePopup}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-xl font-bold shadow-md transition"
            >
              OK
            </button>
          )}
        </div>
      </PopUp>
    </div>
  );
}