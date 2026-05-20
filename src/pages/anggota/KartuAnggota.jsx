import { QRCodeCanvas } from "qrcode.react";

export default function KartuAnggota() {

  const user = {
    nama: "Calista Angel",
    nomor: "AGT001",
    tanggalLahir: "24 Agustus 2003",
    alamat: "Humbang Hasundutan",
    foto:
      "/images/nailong.jpg",
  };

  return (
    <div className="flex flex-col justify-center">
        <div className="font-bold w-full text-center text-xl lg:text-2xl py-7 bg-pink-200"><h1>Dinas Perpustakaan dan Arsip Daerah</h1></div>
        <div className="flex justify-center items-center px-10 py-12">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <img src={user.foto}
                alt="foto anggota"
                className="w-36 h-44 object-cover rounded-md border" />
                <div className="space-y-4 text-base lg:text-xl">
                    <h1><span className="font-semibold">Nama :</span>{" "}{user.nama}</h1>
                    <h1><span className="font-semibold">Nomor :</span>{" "}{user.nomor}</h1>
                    <h1><span className="font-semibold">Tanggal lahir :</span>{" "}{user.tanggalLahir}</h1>
                    <h1><span className="font-semibold">Alamat :</span>{" "}{user.alamat}</h1>
                </div>
            </div>
        </div>
        <div className="flex justify-end bg-white p-3 rounded-md mr-20 mb-7">
          <QRCodeCanvas value={user.nomor} size={120} lg:size={140}/> 
        </div>
    </div>
  );
}