import { useMemo } from "react";
import type { Job } from "../../types/job";
import type { JobFilters } from "../../types/filters";
import { statusOptions, statusLabels } from "../../utils/jobStatus";

interface JobFiltersBarProps {
  jobs: Job[]; // usado só para gerar a lista de tecnologias do autocomplete
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

const inputClass =
  "border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600";

export function JobFiltersBar({ jobs, filters, onChange }: JobFiltersBarProps) {
  // Lista de tecnologias únicas, vindas das vagas já cadastradas,
  // usada como sugestão no autocomplete do filtro de tecnologia.
  const availableTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    jobs.forEach((job) =>
      job.technologies.forEach((tech) => techSet.add(tech)),
    );
    return Array.from(techSet).sort();
  }, [jobs]);

  function handleChange<K extends keyof JobFilters>(
    field: K,
    value: JobFilters[K],
  ) {
    onChange({ ...filters, [field]: value });
  }

  function handleClear() {
    onChange({});
  }

  // Verifica se existe algum filtro ativo, para mostrar o botão "Limpar".
  const hasActiveFilters = Object.entries(filters).some(
    ([, value]) => value && value !== "all",
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600 dark:text-gray-300">
          Buscar por cargo
        </label>
        <input
          value={filters.search ?? ""}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Ex: Front-end"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600 dark:text-gray-300">
          Empresa
        </label>
        <input
          value={filters.company ?? ""}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="Ex: Nubank"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600 dark:text-gray-300">
          Tecnologia
        </label>
        <input
          value={filters.technology ?? ""}
          onChange={(e) => handleChange("technology", e.target.value)}
          placeholder="Ex: React"
          list="tech-options"
          className={inputClass}
        />
        <datalist id="tech-options">
          {availableTechnologies.map((tech) => (
            <option key={tech} value={tech} />
          ))}
        </datalist>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600 dark:text-gray-300">
          Status
        </label>
        <select
          value={filters.status ?? "all"}
          onChange={(e) =>
            handleChange("status", e.target.value as JobFilters["status"])
          }
          className={inputClass}
        >
          <option value="all">Todos</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-600 dark:text-gray-300">Data</label>
        <input
          type="date"
          value={filters.date ?? ""}
          onChange={(e) => handleChange("date", e.target.value)}
          className={inputClass}
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 dark:text-gray-400 underline hover:text-gray-700 dark:hover:text-gray-200 transition"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
