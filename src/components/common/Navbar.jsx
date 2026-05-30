import { Menu, LibraryBig } from "lucide-react";

function Navbar({ showMenu = true, onToggle }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 shadow-md border-b border-pink-200 px-5">
      <div className="h-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {showMenu && (
            <button
              onClick={onToggle}
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/50 hover:bg-white hover:shadow transition"
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
          )}

          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex w-10 h-10 rounded-2xl bg-white/60 items-center justify-center shadow-sm">
              <LibraryBig className="text-pink-600" size={22} />
            </div>

            <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-gray-900 truncate">
              Humbang E-Library
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-white/50 px-5 py-2 rounded-2xl shadow-sm border border-white/60">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>

          <h1 className="text-sm lg:text-base font-bold text-gray-800 text-right whitespace-nowrap">
            Sistem Informasi Perpustakaan Digital
          </h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;