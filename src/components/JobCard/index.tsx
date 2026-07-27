import { useState } from "react";
import type { Job, JobStatus } from "../../types/job";
import {
  statusLabels,
  statusColors,
  statusOptions,
} from "../../utils/jobStatus";
import { ConfirmDialog } from "../ConfirmDialog";
import { useToast } from "../../hooks/useToast";

interface JobCardProps {
  job: Job;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: JobStatus) => void;
}

export function JobCard({
  job,
  onEdit,
  onDelete,
  onStatusChange,
}: JobCardProps) {
  const { showToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  const formattedDate = new Date(
    `${job.appliedDate}T00:00:00`,
  ).toLocaleDateString("pt-BR");

  function handleDelete() {
    onDelete();
    setShowConfirm(false);
    showToast("Vaga excluída com sucesso", "error");
  }

  function handleStatusChange(status: JobStatus) {
    onStatusChange(status);
    showToast(`Status atualizado para "${statusLabels[status]}"`, "info");
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {job.position}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {job.company}
            </p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusColors[job.status]}`}
          >
            {statusLabels[job.status]}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {job.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Candidatura em {formattedDate}
        </p>

        {job.notes && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {job.notes}
          </p>
        )}

        {job.link && (
          <a
            href={job.link}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Ver vaga original
          </a>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <select
            value={job.status}
            onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
            className="text-xs border rounded px-2 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>

          <button
            onClick={onEdit}
            className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Editar
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            Excluir
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message={`Deseja excluir a vaga "${job.position}" em ${job.company}? Essa ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
