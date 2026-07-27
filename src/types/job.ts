// Os possíveis status de uma candidatura.
// Usamos "union type" — a variável só pode ser um desses valores.
export type JobStatus =
  | 'wishlist'      // Quero me candidatar
  | 'applied'       // Currículo enviado
  | 'interview'     // Entrevista
  | 'technical'     // Processo técnico
  | 'approved'      // Aprovado
  | 'rejected'      // Reprovado

// O "molde" de uma vaga.
// Toda vaga no sistema vai seguir essa estrutura.
export interface Job {
  id: string
  company: string        // Empresa
  position: string       // Cargo
  technologies: string[] // Lista de tecnologias (ex: ["React", "TypeScript"])
  status: JobStatus
  appliedDate: string    // Data no formato "2026-06-14"
  notes?: string         // Observações (opcional)
  link?: string          // Link da vaga (opcional)
}