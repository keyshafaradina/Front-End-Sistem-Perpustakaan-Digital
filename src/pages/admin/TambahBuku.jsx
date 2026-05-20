import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function TambahBuku() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    deskripsi: "",
    cover: "",
  });

  const [preview, setPreview] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setForm({ ...form, cover: url });
    }
  };

  return (
    <div className="min-h-screen bg-white-100 p-10">

      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-2xl font-bold">Tambah Buku</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12">

        <div className="flex justify-center">
          <div className="w-[240px] h-[340px] bg-gray-200 overflow-hidden">
            {preview && (
              <img src={preview} className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">

          <input name="judul" placeholder="Judul Buku" onChange={handleChange} className="border-b-2 p-2 outline-none bg-transparent" />
          <input name="penulis" placeholder="Penulis" onChange={handleChange} className="border-b-2 p-2 outline-none bg-transparent" />
          <textarea name="deskripsi" placeholder="Deskripsi" onChange={handleChange} className="border-b-2 p-2 outline-none bg-transparent h-24" />
          <input type="file" onChange={handleImage} />

          <div className="mt-6">
            <Button onClick={() => setShowConfirm(true)}>Simpan</Button>
          </div>

        </div>

      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-[300px] text-center">

            <p className="mb-5 font-semibold">Tambah buku?</p>

            <div className="flex justify-center gap-3">
              <Button onClick={() => setShowConfirm(false)}>Tidak</Button>

              <Button
                onClick={() => {
                  navigate("/kelolabuku", {
                    state: {
                      type: "tambah",
                      data: form,
                    },
                  });
                }}
              >
                Ya
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}