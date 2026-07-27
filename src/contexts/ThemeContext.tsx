import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { getItem, setItem } from '../services/storage'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  // 1. Se o usuário já escolheu antes, usa a escolha salva.
  const saved = getItem<Theme>('job-tracker:theme')
  if (saved === 'light' || saved === 'dark') return saved

  // 2. Caso contrário, segue a preferência do sistema.
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Toda vez que o tema muda, atualiza a classe no <html>
  // e salva a preferência no localStorage.
  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    setItem('job-tracker:theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}