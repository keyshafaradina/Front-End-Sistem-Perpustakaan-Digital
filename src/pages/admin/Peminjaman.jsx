import { useState } from "react";
import Button from "../../components/ui/Button";
import PopUp from "../../components/ui/PopUp";
import api from "../../services/api";

export default function Peminjaman() {
  const [step, setStep] = useState("scan");
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
  });

  const [anggota, setAnggota] = useState(null);
  const [buku, setBuku] = useState(null);

  const [form, setForm] = useState({
    nomor: "",
    nama: "",
    kodeBuku: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showPopup = (title, message) => {
    setPopup({
      show: true,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      title: "",
      message: "",
    });
  };

  const resetAwal = () => {
    setStep("scan");
    setLoading(false);
    setAnggota(null);
    setBuku(null);
    setForm({
      nomor: "",
      nama: "",
      kodeBuku: "",
    });

    setPopup({
      show: false,
      title: "",
      message: "",
    });
  };

  const handlePopupOk = () => {
    if (popup.title === "Berhasil") {
      resetAwal();
    } else {
      closePopup();
    }
  };

  const tanggalHariIni = () => {
    const date = new Date();
    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, "0");
    const tanggal = String(date.getDate()).padStart(2, "0");

    return `${tahun}-${bulan}-${tanggal}`;
  };

  const tambahHari = (tanggalAwal, jumlahHari) => {
    const date = new Date(tanggalAwal);
    date.setDate(date.getDate() + jumlahHari);

    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, "0");
    const tanggal = String(date.getDate()).padStart(2, "0");

    return `${tahun}-${bulan}-${tanggal}`;
  };

  const handleCariAnggota = async () => {
    if (!form.nomor.trim() || !form.nama.trim()) {
      showPopup("Peringatan", "Nomor dan nama anggota wajib diisi!");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/peminjaman/scan-anggota", {
        nomor_anggota: form.nomor,
      });

      const dataAnggota = res.data.data;

      if (!dataAnggota) {
        showPopup("Gagal", "Data anggota tidak ditemukan.");
        return;
      }

      if (
        dataAnggota.nama_lengkap?.toLowerCase().trim() !==
        form.nama.toLowerCase().trim()
      ) {
        showPopup(
          "Data Tidak Cocok",
          "Nomor anggota dan nama anggota tidak sesuai dengan database."
        );
        return;
      }

      setAnggota(dataAnggota);
      setStep("cariBuku");
    } catch (error) {
      const data = error.response?.data;

      showPopup(
        "Data Tidak Ditemukan",
        data?.message || "Data anggota perpustakaan tidak ditemukan."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCariBuku = async () => {
    if (!form.kodeBuku.trim()) {
      showPopup("Peringatan", "Kode buku wajib diisi!");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/peminjaman/cari-buku", {
        kode_buku: form.kodeBuku,
      });

      const dataBuku = res.data.data;

      if (!dataBuku) {
        showPopup("Gagal", "Data buku tidak ditemukan.");
        return;
      }

      setBuku(dataBuku);
      setStep("detail");
    } catch (error) {
      const data = error.response?.data;

      showPopup(
        "Buku Tidak Ditemukan",
        data?.message || "Buku tidak ditemukan atau stok habis."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSimpan = async () => {
    if (!anggota || !buku) {
      showPopup("Peringatan", "Data anggota dan buku belum lengkap.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/peminjaman/simpan", {
        anggota_id: anggota.id,
        petugas_id: 1,
        tanggal_peminjaman: tanggalHariIni(),
        tanggal_pengembalian: tambahHari(tanggalHariIni(), 7),
        buku_ids: [buku.id],
      });

      showPopup("Berhasil", "Buku berhasil dipinjam.");
    } catch (error) {
      console.error("ERROR SIMPAN:", error.response?.data || error);

      const data = error.response?.data;

      showPopup(
        "Gagal",
        data?.message ||
          data?.error ||
          "Gagal menyimpan peminjaman"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white px-8 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Peminjaman Buku
          </h1>

          <p className="text-gray-500 mt-2">
            Cari anggota, pilih buku, lalu simpan data peminjaman.
          </p>
        </div>

        {step === "scan" && (
          <div className="max-w-2xl mx-auto bg-pink-50 border border-pink-100 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Data Anggota
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-semibold mb-2">
                  Nomor Anggota
                </label>

                <input
                  type="text"
                  name="nomor"
                  value={form.nomor}
                  onChange={handleChange}
                  placeholder="Masukkan nomor anggota"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Nama Anggota
                </label>

                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama anggota"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="font-semibold mb-5">
                Silahkan lakukan scan QR kartu anggota
              </p>

              <Button onClick={handleCariAnggota} disabled={loading}>
                {loading ? "MENCARI..." : "CARI"}
              </Button>
            </div>
          </div>
        )}

        {(step === "cariBuku" || step === "detail") && (
          <>
            <button
              onClick={resetAwal}
              className="mb-8 text-pink-600 font-semibold hover:text-pink-700"
            >
              ← Kembali
            </button>

            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-5">Data Anggota</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold mb-2">
                    Nomor Anggota
                  </label>

                  <input
                    value={anggota?.nomor_anggota || form.nomor}
                    readOnly
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Nama Anggota
                  </label>

                  <input
                    value={anggota?.nama_lengkap || form.nama}
                    readOnly
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Data Buku</h2>

              <div>
                <label className="block font-semibold mb-2">
                  Kode Buku
                </label>

                <input
                  type="text"
                  name="kodeBuku"
                  value={form.kodeBuku}
                  onChange={handleChange}
                  placeholder="Masukkan kode buku"
                  readOnly={step === "detail"}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {step === "cariBuku" && (
                <div className="flex justify-center mt-8">
                  <Button onClick={handleCariBuku} disabled={loading}>
                    {loading ? "MENCARI..." : "Cari Buku"}
                  </Button>
                </div>
              )}

              {step === "detail" && buku && (
                <div className="mt-8 bg-pink-50 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                  <img
                    src={buku.gambar_url || "/images/nailong.jpg"}
                    alt={buku.judul || "Foto Buku"}
                    onError={(e) => {
                      e.currentTarget.src = "/images/nailong.jpg";
                    }}
                    className="w-32 h-44 object-cover rounded-xl border bg-white"
                  />

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-3">
                      {buku.judul || buku.nama_buku || "Judul Buku"}
                    </h3>

                    <p className="text-gray-600 mb-2">
                      Kode Buku: {buku.kode_buku || form.kodeBuku}
                    </p>

                    <p className="text-gray-600 mb-2">
                      Penulis: {buku.penulis || "-"}
                    </p>

                    <p className="text-gray-600 mb-2">
                      Tanggal Peminjaman: {tanggalHariIni()}
                    </p>

                    <p className="bg-pink-200 text-pink-800 font-semibold inline-block px-4 py-2 rounded-full">
                      Tanggal Pengembalian:{" "}
                      {tambahHari(tanggalHariIni(), 7)}
                    </p>

                    <div className="flex justify-end gap-4 mt-8">
                      <Button onClick={resetAwal}>Batalkan</Button>

                      <Button onClick={handleSimpan} disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <PopUp isOpen={popup.show} onClose={closePopup}>
        <div className="text-center min-w-[300px]">
          <h2 className="text-xl font-bold mb-4">{popup.title}</h2>
          <p className="mb-6 break-words">{popup.message}</p>

          <Button onClick={handlePopupOk}>OK</Button>
        </div>
      </PopUp>
    </div>
  );
}