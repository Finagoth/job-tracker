import type { User } from './user'

// O estado de autenticação (autenticado ou não autenticado)
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}