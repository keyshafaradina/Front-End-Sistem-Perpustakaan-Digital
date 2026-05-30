import { useLocation, Link } from "react-router-dom";

export default function InformasiBukuAnggota() {
  const location = useLocation();
  const buku = location.state || {};

  const getTitle = () => {
    return buku.judul || buku.title || buku.nama_buku || buku.nama || "";
  };

  const getImage = () => {
    const gambar =
      buku.cover ||
      buku.gambar ||
      buku.foto ||
      buku.image ||
      buku.sampul;

    if (!gambar) return "/images/nailong.jpg";

    if (gambar.startsWith("http")) return gambar;

    return `http://127.0.0.1:8000/uploads/buku/${gambar}`;
  };

  const getSinopsis = () => {
    return (
      buku.sinopsis ||
      buku.deskripsi ||
      buku.ringkasan ||
      buku.keterangan ||
      "Sinopsis belum tersedia."
    );
  };

  const getJumlahTersedia = () => {
    return Number(
      buku.stok_tersedia ??
        buku.jumlah_tersedia ??
        buku.sisa_stok ??
        buku.stok ??
        buku.jumlah ??
        buku.qty ??
        0
    );
  };

  const title = getTitle();
  const jumlahTersedia = getJumlahTersedia();
  const tersedia = jumlahTersedia > 0;

  if (!title) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Data buku tidak ditemukan
          </h1>

          <Link
            to="/daftarbukuanggota"
            className="inline-block mt-5 text-pink-500 font-semibold hover:text-pink-600"
          >
            Kembali ke daftar buku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/daftarbukuanggota"
            className="text-pink-500 font-semibold hover:text-pink-600"
          >
            ← Kembali
          </Link>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 items-start">
            
            {/* COVER */}
            <div className="flex justify-center">
              <div className="w-[300px]">
                <img
                  src={getImage()}
                  alt={title}
                  className="w-full h-[420px] object-cover rounded-[28px] shadow-lg"
                />

                <div
                  className={`mt-5 py-4 rounded-2xl text-center font-bold text-2xl ${
                    tersedia
                      ? "bg-pink-200 text-pink-700"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {tersedia ? "AKTIF / TERSEDIA" : "HABIS DIPINJAM"}
                </div>
              </div>
            </div>

            {/* DETAIL */}
            <div>
              <p className="text-sm font-semibold tracking-[5px] uppercase text-pink-500">
                Informasi Buku
              </p>

              <h1 className="text-5xl font-extrabold text-gray-800 mt-2">
                {title}
              </h1>

              <div className="mt-6 bg-pink-50 rounded-3xl p-6 border border-pink-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Sinopsis
                </h2>

                <p className="text-gray-600 leading-9 text-justify text-lg">
                  {getSinopsis()}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                <InfoItem
                  label="Penulis"
                  value={buku.penulis || buku.pengarang || "-"}
                />

                <InfoItem
                  label="Penerbit"
                  value={buku.penerbit || "-"}
                />

                <InfoItem
                  label="Tahun Terbit"
                  value={buku.tahun || buku.tahun_terbit || "-"}
                />

                <InfoItem
                  label="Nomor Rak"
                  value={buku.rak || buku.nomor_rak || "-"}
                />

                <InfoItem
                  label="Stok Tersedia"
                  value={jumlahTersedia}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-pink-100">
      <p className="text-sm font-semibold text-pink-500 mb-2">
        {label}
      </p>

      <p className="text-2xl font-bold text-gray-800 break-words">
        {value ?? "-"}
      </p>
    </div>
  );
}