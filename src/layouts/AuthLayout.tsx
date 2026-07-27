import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export function AuthLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 relative">
      {/* Toggle de tema no canto superior direito */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-lg shadow"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Job Tracker
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
