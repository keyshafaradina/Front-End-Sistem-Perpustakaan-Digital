import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Peringatan() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "late",
      message: "10 Buku terlambat",
      detail: "Segera konfirmasi",
      level: "high"
    },
    {
      id: 2,
      type: "extend",
      message: "3 Permohonan perpanjangan",
      detail: "Butuh persetujuan",
      level: "medium"
    },
    {
      id: 3,
      type: "reminder",
      message: "5 Buku akan jatuh tempo",
      detail: "Hari ini",
      level: "low"
    },
  ];

  const getColor = (level) => {
    if (level === "high") return "bg-red-100";
    if (level === "medium") return "bg-yellow-100";
    return "bg-blue-100";
  };

  // ACTION BERDASARKAN TYPE
  const handleClick = (type) => {
    if (type === "late") navigate("/terlambat");
    else if (type === "extend") navigate("/perpanjangan");
    else if (type === "reminder") navigate("/peminjaman");
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="font-semibold mb-4 text-xl">
        Notifikasi Penting
      </h2>

      <div className="space-y-3">

        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-xl flex justify-between items-center ${getColor(notif.level)} hover:shadow-md transition`}
          >
            <div>
              <p className="font-semibold text-gray-800">
                {notif.message}
              </p>
              <p className="text-sm text-gray-600">
                {notif.detail}
              </p>
            </div>

            <Button  onClick={() => handleClick(notif.type)}>Lihat</Button>
          </div>
        ))}

      </div>

    </div>
  );
}