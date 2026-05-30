import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  ImagePlus,
  X,
  Save,
  ArrowLeft,
  UserRound,
  AtSign,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";

import { updateProfilAnggota } from "../../../services/authService";

function EditProfileAnggota() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState({
    nama_lengkap: user.nama_lengkap || "",
    tanggal_lahir: user.tanggal_lahir || "",
    username: user.username || "",
    alamat: user.alamat || "",
    no_telepon: user.no_telepon || "",
  });

  const [foto, setFoto] = useState(null);

  const [previewFoto, setPreviewFoto] = useState(
    user.foto
      ? `http://127.0.0.1:8000/uploads/profile/${user.foto}?t=${Date.now()}`
      : "/images/nailong.jpg"
  );

  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFotoModal, setShowFotoModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full bg-pink-50 border border-pink-100 rounded-2xl pl-12 pr-4 py-4 font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFoto(file);
    setPreviewFoto(URL.createObjectURL(file));
    setShowFotoModal(false);
    setMessage("");
  };

  const handleSimpan = async (e) => {
    if (e) e.preventDefault();

    if (
      !form.nama_lengkap ||
      !form.username ||
      !form.alamat ||
      !form.no_telepon
    ) {
      setMessage("Semua data wajib diisi!");
      setShowConfirm(false);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("nama_lengkap", form.nama_lengkap);
      formData.append(
        "tanggal_lahir",
        form.tanggal_lahir || user.tanggal_lahir || ""
      );
      formData.append("username", form.username);
      formData.append("alamat", form.alamat);
      formData.append("no_telepon", form.no_telepon);

      if (foto instanceof File) {
        formData.append("foto", foto, foto.name);
      }

      const res = await updateProfilAnggota(user.id, formData);

      const updatedUser = {
        ...user,
        ...res.data.data,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/profileanggota");
    } catch (error) {
      console.error("EDIT PROFILE ERROR:", error.response?.data || error);

      setMessage(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data) ||
          "Gagal memperbarui profil"
      );

      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (!user?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8 text-center">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <UserRound className="text-pink-500" size={42} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Data user tidak ditemukan
          </h1>

          <p className="text-gray-500 mt-2 mb-5">
            Silahkan login kembali untuk mengedit profil.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-3 rounded-2xl transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-pink-500 font-semibold">Humbang E-Library</p>

          <h1 className="text-4xl font-extrabold text-gray-900">
            Edit Profile Anggota
          </h1>

          <p className="text-gray-500 mt-2">
            Perbarui data diri dan foto profil anggota.
          </p>
        </div>

        <form
          onSubmit={handleSimpan}
          encType="multipart/form-data"
          className="bg-white/80 backdrop-blur-xl rounded-[36px] shadow-2xl border border-pink-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-pink-300 to-pink-400 h-36 relative">
            <div className="absolute -bottom-20 left-1/2 lg:left-12 -translate-x-1/2 lg:translate-x-0">
              <div className="relative">
                <img
                  src={previewFoto}
                  alt="foto profil"
                  onClick={() => setShowFotoModal(true)}
                  className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-xl cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setShowFotoModal(true)}
                  className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:bg-pink-600 transition"
                >
                  <Camera size={22} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-24 lg:pt-10 px-6 lg:px-12 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
              <div className="hidden lg:block"></div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 text-center lg:text-left">
                  {form.nama_lengkap || "Nama Anggota"}
                </h2>

                <p className="text-gray-500 text-center lg:text-left mt-1">
                  @{form.username || "username"}
                </p>

                <input
                  ref={fileInputRef}
                  id="foto-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <UserRound
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                    />
                    <input
                      type="text"
                      name="nama_lengkap"
                      value={form.nama_lengkap}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
                      className={inputClass}
                    />
                  </div>

                  <div className="relative">
                    <Calendar
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                    />
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={form.tanggal_lahir}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative">
                    <AtSign
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                    />
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className={inputClass}
                    />
                  </div>

                  <div className="relative">
                    <Phone
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                    />
                    <input
                      type="text"
                      name="no_telepon"
                      value={form.no_telepon}
                      onChange={handleChange}
                      placeholder="No Telepon"
                      className={inputClass}
                    />
                  </div>

                  <div className="relative md:col-span-2">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                    />
                    <input
                      type="text"
                      name="alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      placeholder="Alamat"
                      className={inputClass}
                    />
                  </div>
                </div>

                {message && (
                  <div className="mt-5 bg-red-50 border border-red-200 text-red-500 px-4 py-3 rounded-2xl text-sm font-semibold">
                    {message}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => navigate("/profileanggota")}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 border border-pink-300 text-pink-500 hover:bg-pink-50 font-bold px-6 py-3 rounded-2xl transition"
                  >
                    <ArrowLeft size={18} />
                    Batal
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition disabled:opacity-60"
                  >
                    <Save size={18} />
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {showFotoModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-sm p-6 border border-pink-100">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-extrabold text-xl text-gray-800">
                Edit Foto Profil
              </h2>

              <button
                type="button"
                onClick={() => setShowFotoModal(false)}
                className="w-9 h-9 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center hover:bg-pink-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 bg-pink-300 hover:bg-pink-400 text-white px-4 py-3 rounded-2xl font-bold shadow-md transition"
            >
              <ImagePlus size={20} />
              Pilih dari galeri
            </button>

            <button
              type="button"
              onClick={() => setShowFotoModal(false)}
              className="w-full mt-3 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-500 px-4 py-3 rounded-2xl font-bold transition"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-pink-100 w-full max-w-md">
            <div className="px-6 pt-8 pb-6 text-center bg-gradient-to-br from-white via-pink-50 to-pink-100">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center mb-4">
                <Save size={28} className="text-pink-500" />
              </div>

              <h2 className="text-2xl font-extrabold text-gray-800">
                Simpan Perubahan?
              </h2>

              <p className="text-gray-500 mt-2">
                Data profil anggota akan diperbarui.
              </p>
            </div>

            <div className="border-t border-pink-100 p-5 bg-white">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    setShowConfirm(false);
                    handleSimpan(e);
                  }}
                  disabled={loading}
                  className="h-14 rounded-2xl bg-pink-100 hover:bg-pink-200 border border-pink-200 text-pink-600 font-bold text-lg shadow-sm transition disabled:opacity-60"
                >
                  {loading ? "..." : "Ya"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  disabled={loading}
                  className="h-14 rounded-2xl bg-pink-100 hover:bg-pink-200 border border-pink-200 text-pink-600 font-bold text-lg shadow-sm transition disabled:opacity-60"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfileAnggota;