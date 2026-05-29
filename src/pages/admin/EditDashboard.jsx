import { useState } from "react";
import PopUp from "../../components/ui/Popup";
import Button from "../../components/ui/Button";

export default function EditDashboard() {
  const [form, setForm] = useState({
    visi: "",
    misi: "",
    alamat: "",
    sosmed: ""
  });

  const [showPopUp, setShowPopUp] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // contoh simpan (nanti bisa localStorage / backend)
    console.log(form);

    // tampilkan popup
    setShowPopUp(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Dashboard Anggota</h1>

      <div className="space-y-4">
        <textarea
          name="visi"
          placeholder="Visi"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="misi"
          placeholder="Misi"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="alamat"
          placeholder="Alamat"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="sosmed"
          placeholder="Sosial Media"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <Button onClick={handleSubmit}>
          Simpan
        </Button>
      </div>

      {/* POPUP */}
      <PopUp isOpen={showPopUp} onClose={() => setShowPopUp(false)}>
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Berhasil</h2>
          <p>Dashboard anggota berhasil diperbarui.</p>

          <Button onClick={() => setShowPopUp(false)}>
            Tutup
          </Button>
        </div>
      </PopUp>
    </div>
  );
}