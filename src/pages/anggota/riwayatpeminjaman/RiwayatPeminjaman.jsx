import { useState } from "react";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RiwayatPeminjaman() {

  const navigate = useNavigate();
  const [buku, setBuku]= useState( [
    {
      title: "SEPTIAN",
      image: "/images/nailong.jpg",
      peminjaman: "1-8-2026",
      pengembalian: "8-8-2026",
      status: "dipinjam",
    },

    {
      title: "MASTER SUKSES CPNS",
      image: "/images/nailong.jpg",
      peminjaman: "1-8-2026",
      pengembalian: "8-8-2026",
      status: "diajukan",
    },

    {
      title: "SNBT UTBK 2026",
      image: "/images/nailong.jpg",
      peminjaman: "1-8-2026",
      pengembalian: "8-8-2026",
      status: "dikembalikan",
    },
  ]);

  return (
  <div className="flex flex-col gap-3 px-4">
    <h1 className="font-bold text-sm md:text-2xl lg: text-2xl mt-4 ml-4">Riwayat Peminjaman</h1>
    {buku.map((item, index) => (
        <div key={index} className={`border w-full shadow rounded-xl ${item.status ==="dikembalikan"?"bg-gray-200":"bg-pink-100"}`}>
            <div className="flex justify-between items-center mr-6">
            <div className="flex gap-4 lg:gap-10 items-center m-5">
                <img src={item.image} alt={item.title} className="w-24 h-32 object-cover rounded text-xs"/>
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-sm md:text-xl lg:text-2xl">{item.title}</h1>
                    <div className="flex gap-20">
                    <div className="flex flex-col gap-2 text-xs md:text-base lg:text-base">
                        <h3>Tanggal Peminjaman</h3>
                        <h3>Tanggal Pengembalian</h3>
                    </div>
                    <div className="flex flex-col gap-2 text-xs md:text-base lg:text-base">
                        <h3>{item.peminjaman}</h3>
                        <h3>{item.pengembalian}</h3>
                    </div>
                    </div>
                </div>
                </div>
                <div className="text-xs lg:text-base">
                    {item.status === "dipinjam" && (<Link to="/ajukanperpanjangan" state={item}><Button className="text-sm">AJUKAN PERPANJANGAN</Button></Link>)}
                    {item.status === "diajukan" && (<h1 className="font-semibold px-10">TELAH DIAJUKAN</h1>)}
                    {item.status === "dikembalikan" && (<h1 className="font-semibold px-6">SUDAH DIKEMBALIKAN</h1>)}
                </div>
            </div>
        </div>
    ))}
    </div>
  );
}