import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      register({ name, email, password });
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Criar conta
      </h2>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 transition"
      >
        Cadastrar
      </button>

      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Já tem conta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
