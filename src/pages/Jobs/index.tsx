import { useState } from "react";
import { useJobsStore } from "../../stores/jobsStore";
import { useFilteredJobs } from "../../hooks/useFilteredJobs";
import { useToast } from "../../hooks/useToast";
import { usePageTitle } from "../../hooks/usePageTitle";
import { JobForm } from "../../components/JobForm";
import { JobCard } from "../../components/JobCard";
import { JobFiltersBar } from "../../components/JobFiltersBar";
import { EmptyState } from "../../components/EmptyState";
import type { Job } from "../../types/job";
import type { JobFormData } from "../../schemas/jobSchema";
import type { JobFilters } from "../../types/filters";

export function Jobs() {
  usePageTitle("Vagas");

  const { jobs, addJob, updateJob, deleteJob, updateStatus } = useJobsStore();
  const { showToast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState<JobFilters>({});

  const filteredJobs = useFilteredJobs(jobs, filters);

  function handleAddClick() {
    setEditingJob(null);
    setIsFormOpen(true);
  }

  function handleEditClick(job: Job) {
    setEditingJob(job);
    setIsFormOpen(true);
  }

  function handleSubmit(data: JobFormData) {
    if (editingJob) {
      updateJob(editingJob.id, data);
      showToast("Vaga atualizada com sucesso");
    } else {
      addJob(data);
      showToast("Vaga adicionada com sucesso");
    }
    setIsFormOpen(false);
    setEditingJob(null);
  }

  function handleCancel() {
    setIsFormOpen(false);
    setEditingJob(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Minhas vagas
        </h2>
        {!isFormOpen && (
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Adicionar vaga
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <JobForm
            defaultValues={editingJob ?? undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <JobFiltersBar jobs={jobs} filters={filters} onChange={setFilters} />

      {jobs.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Exibindo {filteredJobs.length} de {jobs.length}{" "}
          {jobs.length === 1 ? "vaga" : "vagas"}
        </p>
      )}

      {jobs.length === 0 ? (
        <EmptyState
          title="Nenhuma vaga cadastrada"
          description="Comece adicionando a primeira vaga para a qual você se candidatou ou quer se candidatar."
          action={{
            label: "+ Adicionar primeira vaga",
            onClick: handleAddClick,
          }}
        />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title="Nenhuma vaga encontrada"
          description="Nenhuma vaga bate com os filtros selecionados. Tente ajustar ou limpar os filtros."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={() => handleEditClick(job)}
              onDelete={() => deleteJob(job.id)}
              onStatusChange={(status) => updateStatus(job.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
