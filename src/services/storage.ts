// Funções genéricas para ler e escrever no localStorage.
// O <T> permite que cada chamada informe o "tipo" do dado guardado.

export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key)

  if (!value) return null

  return JSON.parse(value) as T
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key: string): void {
  localStorage.removeItem(key)
}