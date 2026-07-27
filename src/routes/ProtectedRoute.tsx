import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Só deixa passar quem está autenticado.
// Caso contrário, redireciona para /login.
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
