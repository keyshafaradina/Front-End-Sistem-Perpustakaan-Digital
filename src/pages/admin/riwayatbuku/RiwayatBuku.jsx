import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

export default function RiwayatBuku() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white flex justify-center items-center p-8">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-pink-100 p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Riwayat Buku
        </h1>

        <p className="text-gray-500 mb-8">
          Pilih data riwayat buku yang ingin dilihat
        </p>

        <img
          src="/images/logoperpus.png"
          alt="Logo Perpustakaan"
          className="w-56 h-56 mx-auto mb-8 object-contain"
        />

        <div className="flex flex-col gap-4">
          <Link to="/diarsipkan" className="w-full">
            <Button className="w-full py-3 text-lg">
              Buku Diarsipkan
            </Button>
          </Link>

          <Link to="/dihapus" className="w-full">
            <Button className="w-full py-3 text-lg">
              Buku Dihapus
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}