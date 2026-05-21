import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

export default function RiwayatBuku() {
    return (
        <div className="min-h-screen -mt-10 flex flex-col justify-center items-center gap-6">
            <h2 className="font-bold text-xl lg:text-3xl">Riwayat Buku</h2>
            <div className="w-52 flex flex-col justify-center gap-5 items-center">
                <img src="/images/logoperpus.png"a alt="logo perpus" className="w-40 h-40 lg:w-100 lg:h-100"/>
                <Link to="/diarsipkan" className="w-full"><Button className="w-full">Diarsipkan</Button></Link>
                <Link to="/dihapus" className="w-full"><Button className="w-full">Dihapus</Button></Link>
            </div>
        </div>
    );
}