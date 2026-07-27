import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, RegisterData, LoginData } from "../types/user";
import * as authService from "../services/authService";

// Esse é o "formato" da caixa global: o que qualquer
// componente vai conseguir acessar via useAuth().
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (data: RegisterData) => void;
  login: (data: LoginData) => void;
  logout: () => void;
}

// createContext precisa de um valor inicial.
// Usamos "undefined" e vamos garantir, no hook useAuth,
// que ninguém use o context fora do Provider.
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Quando o app carrega, verifica se já existe alguém logado.
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  function register(data: RegisterData) {
    const newUser = authService.register(data);
    setUser(newUser);
  }

  function login(data: LoginData) {
    const loggedUser = authService.login(data);
    setUser(loggedUser);
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
