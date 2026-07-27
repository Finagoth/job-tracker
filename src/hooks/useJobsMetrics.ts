import { useMemo } from 'react'
import { useJobsStore } from '../stores/jobsStore'
import type { JobStatus } from '../types/job'

export interface JobsMetrics {
    total: number
    interviews: number
    approved: number
    rejected: number
    byStatus: Record<JobStatus, number>
}

// Hook que deriva métricas a partir da lista de vagas.
// Sempre que `jobs` mudar, os números são recalculados automaticamente.
export function useJobsMetrics(): JobsMetrics {
    const jobs = useJobsStore((state) => state.jobs)

    return useMemo(() => {
        // Conta quantas vagas existem em cada status.
        const byStatus = jobs.reduce(
            (acc, job) => {
                acc[job.status] = (acc[job.status] ?? 0) + 1
                return acc
            },
            {
                wishlist: 0,
                applied: 0,
                interview: 0,
                technical: 0,
                approved: 0,
                rejected: 0,
            } as Record<JobStatus, number>
        )

        return {
            total: jobs.length,
            // "Entrevistas agendadas" considera tanto entrevista
            // quanto processo técnico — ambas são etapas de entrevista.
            interviews: byStatus.interview + byStatus.technical,
            approved: byStatus.approved,
            rejected: byStatus.rejected,
            byStatus,
        }
    }, [jobs])
}