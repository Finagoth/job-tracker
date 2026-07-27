import type { JobStatus } from './job'


export interface JobFilters {
  company?: string
  technology?: string
  status?: JobStatus | 'all'  // 'all' = mostrar todos os status
  date?: string
  search?: string             // Busca por nome da vaga
}