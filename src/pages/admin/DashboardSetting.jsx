import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardSetting() {
  const [dashboard, setDashboard] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    nama_instansi: "",
    visi: "",
    misi: "",
    alamat: "",
    sosial_media: "",
  });

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const res = await api.get("/dashboard-setting");
      const data = res.data.data || res.data;

      setDashboard(data);

      if (data) {
        setForm({
          nama_instansi: data.nama_instansi || "",
          visi: data.visi || "",
          misi: data.misi || "",
          alamat: data.alamat || "",
          sosial_media: data.sosial_media || "",
        });
      }
    } catch (error) {
      console.error("Gagal mengambil dashboard:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);

    if (dashboard) {
      setForm({
        nama_instansi: dashboard.nama_instansi || "",
        visi: dashboard.visi || "",
        misi: dashboard.misi || "",
        alamat: dashboard.alamat || "",
        sosial_media: dashboard.sosial_media || "",
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await api.put("/dashboard-setting", form);
      const data = res.data.data || form;

      setDashboard(data);
      setEditMode(false);
      setShowSuccess(true);
      getDashboard();
    } catch (error) {
      console.error("Gagal menyimpan dashboard:", error.response?.data || error);
      alert(error.response?.data?.message || "Gagal menyimpan dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 w-[90%] max-w-md p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-5">
              <span className="text-4xl text-pink-600 font-bold">✓</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Berhasil!
            </h2>

            <p className="text-gray-500 mb-6">
              Dashboard berhasil diperbarui.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-20 -right-20 w-80 h-80 bg-rose-300 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold text-sm mb-5 shadow-sm">
              Humbang E-Library
            </span>

            {editMode ? (
              <input
                type="text"
                name="nama_instansi"
                value={form.nama_instansi}
                onChange={handleChange}
                className="w-full text-center text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight bg-white/80 border border-pink-200 rounded-3xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Nama instansi"
              />
            ) : (
              <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                {dashboard?.nama_instansi ||
                  "Dinas Perpustakaan dan Arsip Daerah"}
              </h1>
            )}

            <p className="mt-4 text-gray-600 text-base lg:text-lg">
              Sistem informasi perpustakaan digital yang modern dan mudah
              digunakan.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              {!editMode ? (
                <button
                  onClick={handleEdit}
                  className="px-8 py-3 rounded-2xl bg-pink-700 hover:bg-pink-800 text-white font-bold shadow-lg transition"
                >
                  Edit Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-8 py-3 rounded-2xl bg-pink-700 hover:bg-pink-800 text-white font-bold shadow-lg transition disabled:opacity-60"
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="px-8 py-3 rounded-2xl bg-pink-700 hover:bg-pink-800 text-white font-bold shadow-lg transition disabled:opacity-60"
                  >
                    Batal
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-300 rounded-full blur-2xl opacity-40 scale-110" />

                <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-pink-100">
                  <img
                    src="/images/logoperpus.png"
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

                {editMode ? (
                  <textarea
                    name="visi"
                    value={form.visi}
                    onChange={handleChange}
                    rows="5"
                    className="w-full text-gray-700 leading-relaxed text-justify lg:text-lg bg-white border border-pink-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Masukkan visi"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed text-justify lg:text-lg">
                    {dashboard?.visi ||
                      "Mewujudkan masyarakat Humbang Hasundutan yang cerdas, mandiri, dan bermartabat melalui optimalisasi budaya baca dan pengelolaan kearsipan yang profesional."}
                  </p>
                )}
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-lg border border-pink-100 hover:shadow-xl transition">
                <h2 className="text-xl lg:text-2xl font-bold text-pink-700 mb-3">
                  Misi
                </h2>

                {editMode ? (
                  <textarea
                    name="misi"
                    value={form.misi}
                    onChange={handleChange}
                    rows="10"
                    className="w-full text-gray-700 leading-relaxed text-justify lg:text-lg bg-white border border-pink-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Masukkan misi"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed text-justify lg:text-lg whitespace-pre-line">
                    {dashboard?.misi ||
                      `1. Peningkatkan Minat Baca: Menumbuhkan kebiasaan membaca di seluruh lapisan masyarakat, mulai dari tingkat desa hingga perkotaan.
2. Penyediaan Koleksi yang Berkualitas: Menyediakan buku dan referensi baik fisik maupun digital yang relevan dengan kebutuhan masyarakat.
3. Transformasi Perpustakaan Berbasis Inklusi Sosial: Menjadikan perpustakaan sebagai pusat kegiatan masyarakat.
4. Profesionalisme Tata Kelola: Meningkatkan kualitas pelayanan perpustakaan dan kearsipan melalui teknologi informasi.`}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-pink-100">
                  <h2 className="text-lg font-bold text-pink-700 mb-2">
                    Alamat
                  </h2>

                  {editMode ? (
                    <textarea
                      name="alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      rows="4"
                      className="w-full text-gray-700 leading-relaxed bg-white border border-pink-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder="Masukkan alamat"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {dashboard?.alamat ||
                        "Kompleks Tanah Lapang, Kel. I, Ps. Doloksanggul, Kec. Doloksanggul, Kabupaten Humbang Hasundutan, Sumatera Utara 22457"}
                    </p>
                  )}
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-pink-100">
                  <h2 className="text-lg font-bold text-pink-700 mb-2">
                    Sosial Media
                  </h2>

                  {editMode ? (
                    <input
                      type="text"
                      name="sosial_media"
                      value={form.sosial_media}
                      onChange={handleChange}
                      className="w-full text-gray-700 leading-relaxed font-medium bg-white border border-pink-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder="@disperpusiphumbahas"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {dashboard?.sosial_media || "@disperpusiphumbahas"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}