import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
      <p className="text-8xl mb-4">🗺️</p>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        404
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Esta página não existe ou foi removida.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Voltar para o Dashboard
      </Link>
    </div>
  );
}
