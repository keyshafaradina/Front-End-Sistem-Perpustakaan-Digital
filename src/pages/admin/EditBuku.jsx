import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";

export default function EditBuku() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    deskripsi: "",
    cover: "",
    status: "aktif",
  });

  const [preview, setPreview] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    if (location.state) {
      setForm(location.state);
      setPreview(location.state.cover);
    }
  }, [location.state]);

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
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-2xl font-bold">Edit Buku</h1>
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

          <input name="judul" value={form.judul} onChange={handleChange} className="border-b-2 p-2 outline-none bg-transparent" />
          <input name="penulis" value={form.penulis} onChange={handleChange} className="border-b-2 p-2 outline-none bg-transparent" />
          <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className="border-b-2 p-2 outline-none bg-transparent h-24" />
          <input type="file" onChange={handleImage} />

          <div className="flex flex-wrap gap-3 mt-6">
            <Button onClick={() => setAction("update")}>Update</Button>
            <Button onClick={() => setAction("arsip")}>Arsip</Button>
            <Button onClick={() => setAction("hapus")}>Hapus</Button>
          </div>

        </div>

      </div>

      {action && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 w-[300px] text-center">

            <p className="mb-5 font-semibold">
              {action === "update" && "Simpan perubahan?"}
              {action === "hapus" && "Yakin hapus buku?"}
              {action === "arsip" && "Arsipkan buku?"}
            </p>

            <div className="flex justify-center gap-3">
              <Button onClick={() => setAction(null)}>Tidak</Button>

              <Button
                onClick={() => {
                  navigate("/kelolabuku", {
                    state: {
                      type: action,
                      id: id,
                      data: {
                        ...form,
                        status: action === "arsip" ? "arsip" : "aktif",
                      },
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