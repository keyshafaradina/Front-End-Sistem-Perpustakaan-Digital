import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role || "anggota";

  const fotoProfil = user.foto
    ? `http://127.0.0.1:8000/uploads/profile/${user.foto}?t=${Date.now()}`
    : "/images/nailong.jpg";

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        showMenu={true}
        onToggle={() => setShowSidebar(!showSidebar)}
      />

      <Sidebar
        role={role}
        user={user}
        fotoProfil={fotoProfil}
        showSidebar={showSidebar}
      />

      <main
        className={`mt-14 min-h-screen transition-all duration-300 ${
          showSidebar ? "ml-64" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}