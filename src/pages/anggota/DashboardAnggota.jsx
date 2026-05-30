import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardAnggota() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data.data || res.data);
    } catch (error) {
      console.error("Gagal mengambil dashboard:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100">
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-20 -right-20 w-80 h-80 bg-rose-300 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold text-sm mb-5 shadow-sm">
              Humbang E-Library
            </span>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {dashboard?.nama_instansi ||
                "Dinas Perpustakaan dan Arsip Daerah"}
            </h1>

            <p className="mt-4 text-gray-600 text-base lg:text-lg">
              Sistem informasi perpustakaan digital yang modern dan mudah
              digunakan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-300 rounded-full blur-2xl opacity-40 scale-110" />

                <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-pink-100">
                  <img
                    src={
                      dashboard?.logo
                        ? `http://127.0.0.1:8000/uploads/dashboard/${dashboard.logo}`
                        : "/images/logoperpus.png"
                    }
                    alt="logo"
                    className="w-52 h-52 lg:w-80 lg:h-80 object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-lg border border-pink-100 hover:shadow-xl transition">
                <h2 className="text-xl lg:text-2xl font-bold text-pink-700 mb-3">
                  Visi
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify lg:text-lg">
                  {dashboard?.visi ||
                    "Mewujudkan masyarakat Humbang Hasundutan yang cerdas, mandiri, dan bermartabat melalui optimalisasi budaya baca dan pengelolaan kearsipan yang profesional."}
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-lg border border-pink-100 hover:shadow-xl transition">
                <h2 className="text-xl lg:text-2xl font-bold text-pink-700 mb-3">
                  Misi
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify lg:text-lg whitespace-pre-line">
                  {dashboard?.misi ||
                    `1. Peningkatkan Minat Baca: Menumbuhkan kebiasaan membaca di seluruh lapisan masyarakat, mulai dari tingkat desa hingga perkotaan.
2. Penyediaan Koleksi yang Berkualitas: Menyediakan buku dan referensi (baik fisik maupun digital) yang relevan dengan kebutuhan masyarakat petani, pelajar, dan umum di Humbang Hasundutan.
3. Transformasi Perpustakaan Berbasis Inklusi Sosial: Menjadikan perpustakaan bukan sekadar tempat pinjam buku, tapi pusat kegiatan masyarakat untuk meningkatkan kesejahteraan.
4. Profesionalisme Tata Kelola: Meningkatkan kualitas pelayanan perpustakaan dan kearsipan melalui pemanfaatan teknologi informasi (digitalisasi).`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-pink-100">
                  <h2 className="text-lg font-bold text-pink-700 mb-2">
                    Alamat
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {dashboard?.alamat ||
                      "Kompleks Tanah Lapang, Kel. I, Ps. Doloksanggul, Kec. Doloksanggul, Kabupaten Humbang Hasundutan, Sumatera Utara 22457"}
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-pink-100">
                  <h2 className="text-lg font-bold text-pink-700 mb-2">
                    Sosial Media
                  </h2>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {dashboard?.sosial_media ||
                      dashboard?.akun_sosial_media ||
                      "@disperpusiphumbahas"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}