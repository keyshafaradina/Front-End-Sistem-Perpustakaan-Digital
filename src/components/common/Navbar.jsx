import {Menu} from "lucide-react";

function Navbar({ showMenu= true, onToggle}) {
  return (
    <nav className="bg-pink-300 h-16 px-5 flex justify-between items-center gap-4 shadow fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
        {showMenu && (
          <button onClick={onToggle}><Menu className="w-6 h-6 md:w-8 md:h-8 text-black font-bold hover:bg-pink-200"/></button>)}
        <h1 className="text-sm md:text-2xl lg:text-3xl font-bold ">
            Humbang E-Library
        </h1>
        </div>
        <h1 className="text-sm md:text-base lg:text-base font-bold text-right">
            Sistem Informasi Perpustakaan Digital
        </h1>     
    </nav>
  );
}

export default Navbar;