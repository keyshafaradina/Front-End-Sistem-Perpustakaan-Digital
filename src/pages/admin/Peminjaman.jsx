import { useState } from "react";
import Button from "../../components/ui/Button";
import KotakInput from "../../components/ui/KotakInput";
import PopUp from "../../components/ui/PopUp";

export default function Peminjaman() {
  const [step, setStep] = useState("scan");
  const [popup, setPopup] = useState("");

  const [form, setForm] = useState({
    nomor: "",
    nama: "",
    kodeCari: "",
    judulBuku: "",
    kodeBuku: "",
    tanggalPeminjaman: "",
    tanggalPengembalian: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetAwal = () => {
    setStep("scan");
    setPopup("");

    setForm({
      nomor: "",
      nama: "",
      kodeCari: "",
      judulBuku: "",
      kodeBuku: "",
      tanggalPeminjaman: "",
      tanggalPengembalian: "",
    });
  };

  const validasiDataAnggota = () => {
    if (form.nomor === "" || form.nama === "") {
      setPopup("lengkapi");
      return;
    }

    setStep("cari");
  };

  const validasiCariBuku = () => {
    if (form.kodeCari === "") {
      setPopup("lengkapi");
      return;
    }

    setStep("detail");
  };

  const validasiSimpan = () => {
    if (
      form.nomor === "" ||
      form.nama === "" ||
      form.kodeCari === "" ||
      form.judulBuku === "" ||
      form.kodeBuku === "" ||
      form.tanggalPeminjaman === "" ||
      form.tanggalPengembalian === ""
    ) {
      setPopup("lengkapi");
      return;
    }

    setPopup("simpanConfirm");
  };

  return (
    <div className="bg-white min-h-screen px-10 py-8">
      <h1 className="text-3xl font-bold mb-10">Peminjaman Buku</h1>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Data Anggota</h2>

        <div className="space-y-4">
          <KotakInput
            label="Nomor:"
            type="text"
            name="nomor"
            value={form.nomor}
            onChange={handleChange}
            direction="row"
          />

          <KotakInput
            label="Nama:"
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            direction="row"
          />
        </div>

        {step === "scan" && (
          <div className="text-center mt-28">
            <p className="text-xl font-bold mb-5">
              Silahkan lakukan scan QR kartu anggota
            </p>

            <Button onClick={validasiDataAnggota} className="px-12">
              CARI
            </Button>
          </div>
        )}

        {(step === "cari" || step === "detail") && (
          <>
            <h2 className="text-2xl font-bold text-center mt-12 mb-5">
              Data Buku
            </h2>

            <KotakInput
              type="text"
              name="kodeCari"
              value={form.kodeCari}
              onChange={handleChange}
              placeholder="Masukkan kode buku"
              direction="column"
            />
          </>
        )}

        {step === "cari" && (
          <>
            <div className="flex justify-center mt-8">
              <Button onClick={validasiCariBuku} className="px-10">
                Cari buku
              </Button>
            </div>

            <div className="flex justify-end mt-24">
              <Button onClick={resetAwal} className="px-10">
                Kembali
              </Button>
            </div>
          </>
        )}

        {step === "detail" && (
          <div className="flex gap-8 mt-8">
            <div className="w-28 h-40 bg-gray-200 border border-black rounded-xl flex items-center justify-center text-gray-500">
              Cover
            </div>

            <div className="flex-1 space-y-4">
              <KotakInput
                label="Judul buku :"
                type="text"
                name="judulBuku"
                value={form.judulBuku}
                onChange={handleChange}
                direction="row"
              />

              <KotakInput
                label="Kode buku :"
                type="text"
                name="kodeBuku"
                value={form.kodeBuku}
                onChange={handleChange}
                direction="row"
              />

              <KotakInput
                label="Tanggal Peminjaman :"
                type="text"
                name="tanggalPeminjaman"
                value={form.tanggalPeminjaman}
                onChange={handleChange}
                direction="row"
              />

              <KotakInput
                label="Tanggal Pengembalian :"
                type="text"
                name="tanggalPengembalian"
                value={form.tanggalPengembalian}
                onChange={handleChange}
                direction="row"
              />

              <div className="flex justify-end gap-5 pt-5">
                <Button
                  onClick={() => setPopup("batalConfirm")}
                  className="px-10"
                >
                  Batalkan
                </Button>

                <Button onClick={validasiSimpan} className="px-10">
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PopUp isOpen={popup === "lengkapi"} onClose={() => setPopup("")}>
        <div className="text-center min-w-[280px]">
          <h2 className="text-xl font-bold mb-5">Harap lengkapi data</h2>

          <Button onClick={() => setPopup("")} className="bg-white px-8">
            OK
          </Button>
        </div>
      </PopUp>

      <PopUp isOpen={popup === "simpanConfirm"} onClose={() => setPopup("")}>
        <div className="text-center min-w-[280px]">
          <h2 className="text-xl font-bold mb-5">
            Simpan data peminjaman?
          </h2>

          <div className="flex justify-center gap-5">
            <Button onClick={() => setPopup("berhasil")} className="bg-white">
              Ya
            </Button>

            <Button onClick={() => setPopup("dibatalkan")} className="bg-white">
              Tidak
            </Button>
          </div>
        </div>
      </PopUp>

      <PopUp isOpen={popup === "berhasil"} onClose={() => setPopup("")}>
        <div className="text-center min-w-[280px]">
          <h2 className="text-xl font-bold mb-5">
            Data berhasil disimpan
          </h2>

          <Button onClick={resetAwal} className="bg-white px-8">
            OK
          </Button>
        </div>
      </PopUp>

      <PopUp isOpen={popup === "batalConfirm"} onClose={() => setPopup("")}>
        <div className="text-center min-w-[280px]">
          <h2 className="text-xl font-bold mb-5">
            Batalkan peminjaman?
          </h2>

          <div className="flex justify-center gap-5">
            <Button onClick={() => setPopup("dibatalkan")} className="bg-white">
              Ya
            </Button>

            <Button onClick={() => setPopup("")} className="bg-white">
              Tidak
            </Button>
          </div>
        </div>
      </PopUp>

      <PopUp isOpen={popup === "dibatalkan"} onClose={() => setPopup("")}>
        <div className="text-center min-w-[280px]">
          <h2 className="text-xl font-bold mb-5">
            Peminjaman dibatalkan
          </h2>

          <Button onClick={resetAwal} className="bg-white px-8">
            OK
          </Button>
        </div>
      </PopUp>
    </div>
  );
}