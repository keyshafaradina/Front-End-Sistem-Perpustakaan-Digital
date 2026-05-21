import { useState } from "react";
import PopUp from "../../../components/ui/Popup";
import { useLocation , useNavigate } from "react-router-dom";
import KotakInput from "../../../components/ui/KotakInput";
import Button from "../../../components/ui/Button";

export default function AjukanPerpanjangan() {
    const location=useLocation();
    const buku=location.state || {};
    const [tanggalPerpanjangan, setTanggalPerpanjangan]= useState("");
    const [showModalWarning, setShowModalWarning]= useState(false);
    const [showModalConfirm, setShowModalConfirm]= useState (false);
    const navigate = useNavigate();

    //ini buat tanggal otomatis max 7 hari
    const tanggalOptions=[];
    const [day, month, year] = buku.pengembalian.split("-");
    const today = new Date(year, month - 1, day);
    for (let i = 1; i <= 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const formatted = `${nextDate.getDate()}-${nextDate.getMonth() + 1}-${nextDate.getFullYear()}`;
        tanggalOptions.push(formatted)};

        // tombol ajukan
        const handleAjukan = () => {
            // validasi wajib pilih tanggal
            if (!tanggalPerpanjangan) {setShowModalWarning(true);
                return;
            }
            // tampilkan modal konfirmasi
            setShowModalConfirm(true);
        };
        
        // tombol ya saya mengerti
        const handleSetuju = () => {setShowModalConfirm(false);
            buku.status="diajukan";
            navigate("/riwayatpeminjaman");
        };

    return(
        <div className="m-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Ajukan Perpanjangan</h1>
            <div className="flex m-10 gap-6 justify-center">
                <img src={buku.image} alt={buku.title} className="w-60 h-80 object-cover"/>
                <div className="flex flex-col w-full gap-3">
                    <h1 className="font-bold text-3xl">{buku.title}</h1>
                    <KotakInput 
                        label="Tanggal Peminjaman : "
                        type="text"
                        value={buku.peminjaman}
                        disabled={true} //isi input tidak bisa dirubah
                    />
                    <KotakInput
                        label="Tanggal Pengembalian : "
                        type="text"
                        value={buku.pengembalian}
                        disabled={true}
                    />
                    <KotakInput
                    label="Tanggal Perpanjangan : "
                    type="select"
                    value={tanggalPerpanjangan}
                    onChange={(e) =>
                        setTanggalPerpanjangan(e.target.value)}
                        options={tanggalOptions}
                    />
                    <Button onClick={handleAjukan}>AJUKAN PERPANJANGAN</Button>
                </div>
            </div>
            <PopUp isOpen={showModalWarning}>
                <h2 className="text-2xl font-bold text-red-500 mb-4">Peringatan</h2>
                <p className="mb-6">Harap isi tanggal perpanjangan!</p>
                <div className="flex justify-end">
                <Button onClick={()=>setShowModalWarning(false)}>Ya, saya mengerti</Button>
                </div>
            </PopUp>
            <PopUp isOpen={showModalConfirm}>
                <h2 className="text-2xl font-bold mb-4">Konfirmasi</h2>
                <p className="mb-4">Apakah kamu yakin ingin mengajukan perpanjangan?</p>
                <div className="bg-gray-100 p-3 rounded mb-5 text-sm">
                    Dengan menekan tombol <b> "Ya, Saya Mengerti" </b> maka pengajuan perpanjangan akan dikirim.
                </div>
                <div className="flex justify-end gap-3">

          <button
            onClick={() => setShowModalConfirm(false)}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold"
          >
            Batal
          </button>

          <button
            onClick={handleSetuju}
            className="bg-pink-300 hover:bg-pink-400 px-4 py-2 rounded font-semibold"
          >
            Ya, Saya Mengerti
          </button>

        </div>

      </PopUp>
        </div>
    );
}