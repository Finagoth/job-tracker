import { useMemo } from 'react'
import type { Job } from '../types/job'
import type { JobFilters } from '../types/filters'

// Recebe a lista completa de vagas e os filtros ativos,
// e retorna apenas as vagas que passam por TODOS os filtros.
export function useFilteredJobs(jobs: Job[], filters: JobFilters): Job[] {
    return useMemo(() => {
        return jobs.filter((job) => {
            // Busca por cargo (nome da vaga)
            if (
                filters.search &&
                !job.position.toLowerCase().includes(filters.search.toLowerCase())
            ) {
                return false
            }

            // Filtro por empresa
            if (
                filters.company &&
                !job.company.toLowerCase().includes(filters.company.toLowerCase())
            ) {
                return false
            }

            // Filtro por tecnologia (verifica se ALGUMA tecnologia da vaga
            // contém o texto digitado)
            if (
                filters.technology &&
                !job.technologies.some((tech) =>
                    tech.toLowerCase().includes(filters.technology!.toLowerCase())
                )
            ) {
                return false
            }

            // Filtro por status (ignorado se for 'all' ou não definido)
            if (filters.status && filters.status !== 'all' && job.status !== filters.status) {
                return false
            }

            // Filtro por data (comparação exata)
            if (filters.date && job.appliedDate !== filters.date) {
                return false
            }

            // Se chegou até aqui, passou por todos os filtros ativos
            return true
        })
    }, [jobs, filters])
}