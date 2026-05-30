import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  LogOut,
  Pencil,
  Mail,
  Phone,
  MapPin,
  AtSign,
} from "lucide-react";
import PopUp from "../../../components/ui/Popup";
import { useState } from "react";

function ProfileAnggota() {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8 text-center">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <UserRound className="text-pink-500" size={42} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">Belum login</h1>

          <p className="text-gray-500 mt-2 mb-5">
            Silahkan login untuk melihat profil anggota.
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
            Profile Anggota
          </h1>

          <p className="text-gray-500 mt-2">
            Informasi data diri anggota perpustakaan digital.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[36px] shadow-2xl border border-pink-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-300 to-pink-400 h-36 relative">
            <div className="absolute -bottom-20 left-1/2 lg:left-12 -translate-x-1/2 lg:translate-x-0">
              <img
                src={
                  user?.foto
                    ? `http://127.0.0.1:8000/uploads/profile/${user.foto}?t=${new Date().getTime()}`
                    : "/images/nailong.jpg"
                }
                alt="foto profil"
                className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-xl"
              />
            </div>
          </div>

          <div className="pt-24 lg:pt-10 px-6 lg:px-12 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
              <div className="hidden lg:block"></div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 text-center lg:text-left">
                  {user.nama_lengkap || "Nama Anggota"}
                </h2>

                <p className="text-gray-500 text-center lg:text-left mt-1">
                  @{user.username || "username"}
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InfoCard
                    icon={<UserRound className="text-pink-500" size={22} />}
                    label="Nama Lengkap"
                    value={user.nama_lengkap || "-"}
                  />

                  <InfoCard
                    icon={<AtSign className="text-pink-500" size={22} />}
                    label="Username"
                    value={user.username || "-"}
                  />

                  <InfoCard
                    icon={<MapPin className="text-pink-500" size={22} />}
                    label="Alamat"
                    value={user.alamat || "-"}
                    full
                  />

                  <InfoCard
                    icon={<Phone className="text-pink-500" size={22} />}
                    label="No. Telepon"
                    value={user.no_telepon || "-"}
                  />

                  <InfoCard
                    icon={<Mail className="text-pink-500" size={22} />}
                    label="Email"
                    value={user.email || "-"}
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                  <Link to="/editprofileanggota">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition">
                      <Pencil size={18} />
                      Edit Profil
                    </button>
                  </Link>

                  <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 border border-pink-300 text-pink-500 hover:bg-pink-50 font-bold px-6 py-3 rounded-2xl transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 Humbang E-Library
        </p>
      </div>

      <PopUp isOpen={showLogoutPopup}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-200">
            <LogOut className="text-pink-600" size={34} />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
            Konfirmasi Logout
          </h2>

          <p className="text-gray-500 mb-6">
            Apakah kamu yakin ingin keluar dari akun ini?
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowLogoutPopup(false)}
              className="w-40 py-3 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-bold shadow-md transition"
            >
              Batal
            </button>

            <button
              onClick={handleLogout}
              className="w-40 py-3 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-bold shadow-md transition"
            >
              Ya, Logout
            </button>
          </div>
        </div>
      </PopUp>
    </div>
  );
}

function InfoCard({ icon, label, value, full }) {
  return (
    <div
      className={`bg-pink-50 rounded-3xl p-5 border border-pink-100 ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <p className="text-sm font-bold text-gray-500">{label}</p>
      </div>

      <p className="font-bold text-gray-800 text-lg break-all">{value}</p>
    </div>
  );
}

export default ProfileAnggota;