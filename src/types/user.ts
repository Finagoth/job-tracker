// Representa um usuário cadastrado no sistema.
export interface User {
  id: string
  name: string
  email: string
}

// Dados enviados no formulário de cadastro.
export interface RegisterData {
  name: string
  email: string
  password: string
}

// Dados enviados no formulário de login.
export interface LoginData {
  email: string
  password: string
}