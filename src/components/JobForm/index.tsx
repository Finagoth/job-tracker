import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../../schemas/jobSchema";
import type { JobFormData } from "../../schemas/jobSchema";
import type { Job } from "../../types/job";
import { statusOptions, statusLabels } from "../../utils/jobStatus";

interface JobFormProps {
  defaultValues?: Job;
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
}

export function JobForm({ defaultValues, onSubmit, onCancel }: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: defaultValues
      ? {
          company: defaultValues.company,
          position: defaultValues.position,
          technologies: defaultValues.technologies.join(", "),
          status: defaultValues.status,
          appliedDate: defaultValues.appliedDate,
          notes: defaultValues.notes ?? "",
          link: defaultValues.link ?? "",
        }
      : {
          company: "",
          position: "",
          technologies: "",
          status: "wishlist",
          appliedDate: new Date().toISOString().split("T")[0], // hoje, no formato YYYY-MM-DD
          notes: "",
          link: "",
        },
  });

  const inputClass =
    "border rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {defaultValues ? "Editar vaga" : "Nova vaga"}
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Empresa
          </label>
          <input {...register("company")} className={inputClass} />
          {errors.company && (
            <span className="text-xs text-red-500">
              {errors.company.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Cargo
          </label>
          <input {...register("position")} className={inputClass} />
          {errors.position && (
            <span className="text-xs text-red-500">
              {errors.position.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Tecnologias (separadas por vírgula)
          </label>
          <input
            {...register("technologies")}
            placeholder="React, TypeScript, Tailwind"
            className={inputClass}
          />
          {errors.technologies && (
            <span className="text-xs text-red-500">
              {errors.technologies.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Status
          </label>
          <select {...register("status")} className={inputClass}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Data da candidatura
          </label>
          <input
            type="date"
            {...register("appliedDate")}
            className={inputClass}
          />
          {errors.appliedDate && (
            <span className="text-xs text-red-500">
              {errors.appliedDate.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Link da vaga (opcional)
          </label>
          <input
            {...register("link")}
            placeholder="https://..."
            className={inputClass}
          />
          {errors.link && (
            <span className="text-xs text-red-500">{errors.link.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Observações (opcional)
          </label>
          <textarea {...register("notes")} rows={2} className={inputClass} />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
