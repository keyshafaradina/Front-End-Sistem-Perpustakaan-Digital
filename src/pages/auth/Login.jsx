import { useState } from "react";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import KotakInput from "../../components/ui/KotakInput";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setShowPopup(true);
      return;
    }

    // LOGIN ADMIN
    if (
      form.email === "admin" &&
      form.password === "admin123"
    ) {
      navigate("/dashboardadmin");
    }

    // LOGIN ANGGOTA
    else {
      navigate("/dashboardanggota");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center mt-20">

        <div className="bg-pink-300 w-28 h-28 rounded-full flex items-center justify-center mt-20 mb-6">
          <UserRound size={90} strokeWidth={1.5} />
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <KotakInput
              label="Email/Username"
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              direction="column"
            />
          </div>

          <div className="flex flex-col">
            <KotakInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              direction="column"
            />
          </div>

          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-pink-400 text-sm hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="flex justify-center">
            <Button type="submit">
              LOGIN
            </Button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-pink-200 p-6 rounded-xl shadow-lg w-80">

            <h1 className="text-lg font-bold mb-2">
              Peringatan
            </h1>

            <p className="mb-4">
              Email dan password wajib diisi!
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-pink-300 hover:bg-pink-400 px-4 py-2 rounded-lg"
              >
                OK
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Login;