import type { Job } from '../types/job'
import { getItem, setItem } from './storage'

// Cada usuário tem sua própria lista de vagas, guardada
// numa chave separada do localStorage.
function getJobsKey(userId: string): string {
    return `job-tracker:jobs:${userId}`
}

export function getJobs(userId: string): Job[] {
    return getItem<Job[]>(getJobsKey(userId)) ?? []
}

export function saveJobs(userId: string, jobs: Job[]): void {
    setItem(getJobsKey(userId), jobs)
}