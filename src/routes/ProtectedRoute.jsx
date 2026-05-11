import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}) {
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return children;
}