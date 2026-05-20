import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(
) {
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}