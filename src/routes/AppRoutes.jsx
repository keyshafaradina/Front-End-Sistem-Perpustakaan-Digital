import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/anggota/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/anggota/dashboard" element={<Dashboard />} />
        <Route path="/buku" element={<Buku />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes