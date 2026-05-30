import { Link, useNavigate } from "react-router-dom";
import { Mail, Briefcase, User, LogOut, Edit, X } from "lucide-react";
import { useState } from "react";
import Button from "../../components/ui/Button";

function ProfileAdmin() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fotoProfil = user?.foto
    ? `http://127.0.0.1:8000/uploads/profile/${user.foto}?t=${Date.now()}`
    : "/images/nailong.jpg";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Profile Admin
          </h1>
          <p className="text-gray-500 mt-2">
            Informasi akun admin perpustakaan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">
          <div className="bg-pink-50 rounded-3xl p-6 border border-pink-100">
            <img
              src={fotoProfil}
              alt="foto profil"
              className="w-full h-[430px] object-cover rounded-3xl shadow-md"
              onError={(e) => {
                e.currentTarget.src = "/images/nailong.jpg";
              }}
            />

            <div className="mt-5 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.nama_lengkap || user.name || "Admin"}
              </h2>

              <p className="inline-block mt-2 bg-white text-pink-600 px-5 py-2 rounded-full font-bold shadow-sm">
                {user.role || "admin"}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-5">
              <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2 text-gray-600 font-bold">
                  <User size={20} className="text-pink-500" />
                  Nama
                </div>
                <div className="bg-white border border-pink-100 rounded-xl px-4 py-3 font-bold text-gray-800">
                  {user.nama_lengkap || user.name || "-"}
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2 text-gray-600 font-bold">
                  <Mail size={20} className="text-pink-500" />
                  Email
                </div>
                <div className="bg-white border border-pink-100 rounded-xl px-4 py-3 font-bold text-gray-800">
                  {user.email || "-"}
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2 text-gray-600 font-bold">
                  <Briefcase size={20} className="text-pink-500" />
                  Jabatan
                </div>
                <div className="bg-white border border-pink-100 rounded-xl px-4 py-3 font-bold text-gray-800">
                  {user.jabatan || "Pustakawan"}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
              <Button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white"
              >
                <LogOut size={18} />
                Logout
              </Button>

              <Link to="/editprofileadmin">
                <Button className="flex items-center justify-center gap-2">
                  <Edit size={18} />
                  Edit Profil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-pink-100 p-8">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">
          <LogOut size={28} className="text-pink-500" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
        Konfirmasi Logout
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Apakah kamu yakin ingin keluar dari akun admin?
      </p>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowLogoutConfirm(false)}
          className="py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-md transition-all duration-300"
        >
          Tidak
        </button>

        <button
          onClick={handleLogout}
          className="py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-md transition-all duration-300"
        >
          Ya, Logout
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ProfileAdmin;