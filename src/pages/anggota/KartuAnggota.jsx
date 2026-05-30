import { QRCodeCanvas } from "qrcode.react";

function KartuAnggota() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fotoProfil = user.foto
    ? `http://127.0.0.1:8000/uploads/profile/${user.foto}?t=${Date.now()}`
    : "/images/nailong.jpg";

  const dataAnggota = [
    ["Nomor Anggota", user.nomor_anggota],
    ["Nama", user.nama_lengkap],
    ["Username", user.username],
    ["Email", user.email],
    ["No. Telepon", user.no_telepon],
    ["Alamat", user.alamat],
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 px-4 py-10">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-2xl border border-white/60">
        
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-fuchsia-300 rounded-full blur-3xl opacity-40" />

        <div className="relative p-8 md:p-10">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-semibold">
              Membership Card
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-2">
              Kartu Anggota
            </h1>
          </div>

          <div className="grid md:grid-cols-[320px_1fr] gap-8 items-stretch">
            
            <div className="bg-gradient-to-b from-pink-400 to-fuchsia-500 rounded-[2rem] p-6 text-center text-white shadow-xl">
              <img
                src={fotoProfil}
                alt="Foto Profil"
                className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-white shadow-xl"
              />

              <h2 className="mt-5 text-2xl font-bold">
                {user.nama_lengkap || "Nama Anggota"}
              </h2>

              <p className="text-white/80 mt-1">
                @{user.username || "username"}
              </p>

              <div className="mt-6 inline-block bg-white p-4 rounded-2xl shadow-lg">
                <QRCodeCanvas
                  value={user.nomor_anggota || "ANGGOTA"}
                  size={135}
                />
              </div>

              <p className="mt-4 text-sm text-white/80">
                Scan untuk melihat nomor anggota
              </p>
            </div>

            <div className="bg-white/80 rounded-[2rem] p-6 md:p-8 shadow-lg border border-pink-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Detail Anggota
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {dataAnggota.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-gradient-to-br from-pink-50 to-white p-4 border border-pink-100 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-pink-500 mb-1">
                      {label}
                    </p>
                    <p className="text-gray-800 font-medium break-words">
                      {value || "-"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default KartuAnggota;