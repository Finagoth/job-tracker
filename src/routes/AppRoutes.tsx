import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { Jobs } from "../pages/Jobs";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
