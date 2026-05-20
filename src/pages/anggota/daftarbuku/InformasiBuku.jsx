import { useLocation } from "react-router-dom";
import Button from "../../../components/ui/Button";

export default function InformasiBukuAnggota() {

  // mengambil data buku dari halaman sebelumnya
const location = useLocation();
const buku = location.state || {};

  // jika data kosong
  if (!buku.title) {
    return (
      <h1 className="text-2xl font-bold p-5">Data buku tidak ditemukan</h1>
    );
  }

return (
<div className="p-5">
    <h1 className="text-4xl font-bold mb-8">Informasi Buku</h1>
    <div className="flex gap-10 justify-center">
        <img
          src={buku.image}
          alt={buku.title}
          className="w-80 h-96 object-cover shadow-lg rounded-md"
        />
        <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="text-5xl font-bold">{buku.title}</h1>
            <div className="flex flex-col">
                <h2 className="font-bold text-xl mb-2">Sinopsis</h2>
                <p className="text-justify leading-relaxed">Bujang, seorang anak laki-laki dari pedalaman Sumatra, harus meninggalkan kampung halamannya dan memasuki dunia penuh rahasia, kekuasaan, dan pertarungan hidup. Bersama keluarga Tong, ia tumbuh menjadi sosok yang disegani. Namun, di balik semua itu, Bujang terus mencari makna tentang keluarga, persahabatan, dan arti sebenarnya dari pulang.</p>
                {/* <p className="text-justify leading-relaxed">{buku.sinopsis}</p> */}
                <h3><span className="font-bold">Penulis :</span>{" "}{buku.penulis}</h3>
                <h3><span className="font-bold">Penerbit :</span>{" "}{buku.penerbit}</h3>
                <h3><span className="font-bold">Tahun Terbit :</span>{" "}{buku.tahun}</h3>
            </div>
            <h2 className="text-2xl font-bold">NOMOR RAK: {buku.rak}</h2>
            <div className={`px-6 py-2 rounded-xl font-bold text-xl text-center w-fit ${buku.status === "tersedia"? "bg-pink-300": "bg-gray-400 text-white"}`}>
            {buku.status === "tersedia"? "TERSEDIA": "TIDAK TERSEDIA"}
            </div>
        </div>
    </div>
</div>
  );
}