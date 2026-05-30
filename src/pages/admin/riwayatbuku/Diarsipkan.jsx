import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import PopUp from "../../../components/ui/PopUp";
import api from "../../../services/api";

export default function Diarsipkan() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });

  const getGambar = (gambar) => {
    if (!gambar) {
      return "/images/nailong.jpg";
    }

    if (gambar.startsWith("http")) {
      return gambar;
    }

    return `http://127.0.0.1:8000/uploads/buku/${gambar}?t=${Date.now()}`;
  };

  const getBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/buku-arsip");
      setBooks(res.data.data || []);
    } catch (error) {
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message: "Gagal mengambil data buku diarsipkan",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handlePopup = (book) => {
    setSelectedBook(book);
    setPopup({
      open: true,
      type: "confirm",
      title: "Konfirmasi",
      message: `Yakin ingin membuka arsip buku "${book.judul}"?`,
    });
  };

  const handleBukaArsip = async () => {
    if (!selectedBook) return;

    try {
      setLoading(true);
      await api.put(`/buku/${selectedBook.id}/buka-arsip`);

      setPopup({
        open: true,
        type: "success",
        title: "Berhasil",
        message: "Arsip buku berhasil dibuka",
      });

      setSelectedBook(null);
      getBooks();
    } catch (error) {
      setPopup({
        open: true,
        type: "info",
        title: "Gagal",
        message:
          error.response?.data?.message ||
          "Gagal membuka arsip buku",
      });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup({
      open: false,
      type: "",
      title: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        <button
          onClick={() => navigate("/riwayatbuku")}
          className="mb-6 text-pink-600 font-semibold hover:text-pink-700 transition"
        >
          ← Kembali
        </button>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Buku Diarsipkan
          </h1>
          <p className="text-gray-500 mt-2">
            Daftar buku yang sedang diarsipkan
          </p>
        </div>

        {loading && (
          <p className="text-center font-semibold text-gray-500">
            Memuat data...
          </p>
        )}

        {!loading && books.length === 0 && (
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-8 text-center">
            <p className="font-semibold text-gray-600">
              Tidak ada buku yang diarsipkan
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-5 flex items-center justify-between gap-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-5">
                <img
                  src={getGambar(book.gambar)}
                  alt={book.judul}
                  onError={(e) => {
                    e.currentTarget.src = "/images/nailong.jpg";
                  }}
                  className="w-24 h-32 object-cover rounded-xl border"
                />

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {book.judul}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Kode Buku: {book.kode_buku || "-"}
                  </p>

                  <span className="inline-block mt-3 bg-pink-200 text-pink-700 px-4 py-1 rounded-full text-sm font-semibold">
                    Diarsipkan
                  </span>
                </div>
              </div>

              <Button
                onClick={() => handlePopup(book)}
                disabled={loading}
              >
                Buka Arsip
              </Button>
            </div>
          ))}
        </div>
      </div>

      <PopUp isOpen={popup.open} onClose={closePopup}>
        <div className="text-center min-w-[300px]">
          <h2 className="text-xl font-bold mb-4">
            {popup.title}
          </h2>

          <p className="mb-6">
            {popup.message}
          </p>

          {popup.type === "confirm" ? (
            <div className="flex justify-center gap-4">
              <Button onClick={handleBukaArsip}>
                Ya
              </Button>

              <Button onClick={closePopup}>
                Batal
              </Button>
            </div>
          ) : (
            <Button onClick={closePopup}>
              OK
            </Button>
          )}
        </div>
      </PopUp>
    </div>
  );
}