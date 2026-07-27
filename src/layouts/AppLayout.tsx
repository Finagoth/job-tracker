import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useJobsStore } from "../stores/jobsStore";
import { useTheme } from "../hooks/useTheme";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/jobs", label: "Vagas" },
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const loadJobs = useJobsStore((state) => state.loadJobs);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (user) loadJobs(user.id);
  }, [user, loadJobs]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Job Tracker
            </h1>
            <nav className="flex gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    location.pathname === link.to
                      ? "text-sm text-blue-600 font-semibold"
                      : "text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle de tema */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-lg"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user?.name}
            </span>

            <button
              onClick={logout}
              className="text-sm px-3 py-1.5 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
