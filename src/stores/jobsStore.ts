import { create } from 'zustand'
import type { Job, JobStatus } from '../types/job'
import type { JobFormData } from '../schemas/jobSchema'
import * as jobsService from '../services/jobsService'

interface JobsState {
    jobs: Job[]
    userId: string | null
    loadJobs: (userId: string) => void
    addJob: (data: JobFormData) => void
    updateJob: (id: string, data: JobFormData) => void
    deleteJob: (id: string) => void
    updateStatus: (id: string, status: JobStatus) => void
}

// Converte os dados do formulário (technologies como string)
// para o formato salvo (technologies como array).
function mapFormToJob(data: JobFormData): Omit<Job, 'id'> {
    return {
        company: data.company,
        position: data.position,
        technologies: data.technologies
            .split(',')
            .map((tech) => tech.trim())
            .filter(Boolean), // remove strings vazias (ex: "React, , TS")
        status: data.status,
        appliedDate: data.appliedDate,
        notes: data.notes,
        link: data.link,
    }
}

export const useJobsStore = create<JobsState>((set, get) => ({
    jobs: [],
    userId: null,

    loadJobs: (userId) => {
        set({ jobs: jobsService.getJobs(userId), userId })
    },

    addJob: (data) => {
        const { userId, jobs } = get()
        if (!userId) return

        const newJob: Job = { id: crypto.randomUUID(), ...mapFormToJob(data) }
        const updated = [...jobs, newJob]

        set({ jobs: updated })
        jobsService.saveJobs(userId, updated)
    },

    updateJob: (id, data) => {
        const { userId, jobs } = get()
        if (!userId) return

        const updated = jobs.map((job) =>
            job.id === id ? { id, ...mapFormToJob(data) } : job
        )

        set({ jobs: updated })
        jobsService.saveJobs(userId, updated)
    },

    deleteJob: (id) => {
        const { userId, jobs } = get()
        if (!userId) return

        const updated = jobs.filter((job) => job.id !== id)

        set({ jobs: updated })
        jobsService.saveJobs(userId, updated)
    },

    updateStatus: (id, status) => {
        const { userId, jobs } = get()
        if (!userId) return

        const updated = jobs.map((job) => (job.id === id ? { ...job, status } : job))

        set({ jobs: updated })
        jobsService.saveJobs(userId, updated)
    },
}))