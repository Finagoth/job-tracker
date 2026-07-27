import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Só deixa passar quem não está autenticado.
export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
