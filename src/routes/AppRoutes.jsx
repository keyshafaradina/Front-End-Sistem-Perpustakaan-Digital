import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/buku" element={<Buku />} />
    </Routes>
  );
}

export default AppRoutes