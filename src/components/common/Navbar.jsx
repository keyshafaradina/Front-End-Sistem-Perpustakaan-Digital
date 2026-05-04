import {Menu} from "lucide-react";

function Navbar({onToggle}) {
  return (
    <nav className="bg-pink-300 text-black px-4 md:px-10 py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
        <button onClick={onToggle}><Menu size={30} className="text-black font-bold"/></button>
        <h1 className="text-lg md:text-3xl font-bold">
            Humbang E-Library
        </h1>
        </div>
        <h1 className="text-sm md:text-xl font-bold text-right">
            Sistem Informasi Perpustakaan Digital
        </h1>     
    </nav>
  );
}

export default Navbar;