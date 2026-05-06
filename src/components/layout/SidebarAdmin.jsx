import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#eee",
        padding: "10px",
      }}
    >
      <h3>Menu</h3>
       <button onClick={handleLogout}>Logout</button>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/buku" style={{ textDecoration: "none" }}>Buku</Link>
        </li>
        <li>
          <Link to="/admin/peminjaman">Peminjaman</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;