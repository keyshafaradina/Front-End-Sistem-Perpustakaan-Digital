import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Save,
  X,
  User,
  Mail,
  Briefcase,
} from "lucide-react";

import Button from "../../components/ui/Button";
import { updateProfilAdmin } from "../../services/authService";

function EditProfileAdmin() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [nama, setNama] = useState(user.nama_lengkap || user.name || "");
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

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFoto(file);
    setPreviewFoto(URL.createObjectURL(file));
    setShowFotoModal(false);
    setMessage("");
  };

  const handleSimpan = async () => {
    if (!nama.trim()) {
      setMessage("Nama wajib diisi!");
      setShowConfirm(false);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nama_lengkap", nama);

      if (foto instanceof File) {
        formData.append("foto", foto, foto.name);
      }

      const res = await updateProfilAdmin(user.id, formData);

      const updatedUser = {
        ...user,
        ...res.data.data,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/profileadmin");
    } catch (error) {
      console.error("EDIT PROFILE ADMIN ERROR:", error.response?.data || error);

      setMessage(
        error.response?.data?.message ||
          "Gagal memperbarui profil"
      );

      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Edit Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Perbarui informasi profil admin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">
            <div className="bg-pink-50 border border-pink-100 rounded-3xl p-6">
              <div className="relative">
                <img
                  src={previewFoto}
                  alt="foto profil"
                  onClick={() => setShowFotoModal(true)}
                  onError={(e) => {
                    e.currentTarget.src = "/images/nailong.jpg";
                  }}
                  className="w-full h-[430px] object-cover rounded-3xl shadow-md cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setShowFotoModal(true)}
                  className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition"
                >
                  <Camera size={22} />
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="hidden"
              />

              <p className="text-center text-gray-500 text-sm mt-4">
                Klik foto untuk mengganti foto profil
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-5">
                <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                  <label className="flex items-center gap-3 mb-2 text-gray-600 font-bold">
                    <User size={20} className="text-pink-500" />
                    Nama
                  </label>

                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>

                <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                  <label className="flex items-center gap-3 mb-2 text-gray-600 font-bold">
                    <Mail size={20} className="text-pink-500" />
                    Email
                  </label>

                  <input
                    type="text"
                    value={user.email || ""}
                    readOnly
                    className="w-full bg-gray-50 border border-pink-100 rounded-xl px-4 py-3 font-bold text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                  <label className="flex items-center gap-3 mb-2 text-gray-600 font-bold">
                    <Briefcase size={20} className="text-pink-500" />
                    Jabatan
                  </label>

                  <input
                    type="text"
                    value={user.jabatan || "Pustakawan"}
                    readOnly
                    className="w-full bg-gray-50 border border-pink-100 rounded-xl px-4 py-3 font-bold text-gray-500 cursor-not-allowed"
                  />
                </div>

                {message && (
                  <div className="bg-red-50 text-red-500 border border-red-100 rounded-xl px-4 py-3 font-semibold">
                    {message}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
                <Button
                  type="button"
                  onClick={() => navigate("/profileadmin")}
                  className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <X size={18} />
                  Batal
                </Button>

                <Button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Save size={18} />
                  {loading ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFotoModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-7 w-80 text-center">
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="text-pink-500" size={28} />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Edit Foto Profil
            </h2>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-xl font-bold transition"
              >
                Pilih Galeri
              </button>

              <button
                type="button"
                onClick={() => setShowFotoModal(false)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-xl font-bold transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-7 w-80 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Simpan perubahan?
            </h2>

            <p className="text-gray-500 mb-6">
              Data profil admin akan diperbarui.
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl font-bold transition"
              >
                Tidak
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  handleSimpan();
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl font-bold transition"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfileAdmin;