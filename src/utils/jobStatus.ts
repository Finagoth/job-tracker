import type { JobStatus } from '../types/job'

// Texto exibido para cada status (o código usa valores em inglês,
// a interface mostra em português).
export const statusLabels: Record<JobStatus, string> = {
    wishlist: 'Quero me candidatar',
    applied: 'Currículo enviado',
    interview: 'Entrevista',
    technical: 'Processo técnico',
    approved: 'Aprovado',
    rejected: 'Reprovado',
}

// Cores (Tailwind) para cada status, com versão dark mode.
export const statusColors: Record<JobStatus, string> = {
    wishlist: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    interview: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    technical: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

// Lista de todos os status, útil para gerar <option> em selects.
export const statusOptions: JobStatus[] = [
    'wishlist',
    'applied',
    'interview',
    'technical',
    'approved',
    'rejected',
]