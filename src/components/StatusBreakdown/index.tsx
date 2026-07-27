import type { JobStatus } from "../../types/job";
import { statusLabels, statusOptions } from "../../utils/jobStatus";

interface StatusBreakdownProps {
  byStatus: Record<JobStatus, number>;
  total: number;
}

// Mapeia cada status para uma cor de barra (versões "sólidas" do Tailwind).
const barColors: Record<JobStatus, string> = {
  wishlist: "bg-gray-400",
  applied: "bg-blue-500",
  interview: "bg-yellow-500",
  technical: "bg-purple-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
};

export function StatusBreakdown({ byStatus, total }: StatusBreakdownProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Candidaturas por status
      </h3>

      <div className="flex flex-col gap-3">
        {statusOptions.map((status) => {
          const count = byStatus[status];
          // Evita divisão por zero quando não há nenhuma vaga ainda.
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return (
            <div key={status}>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>{statusLabels[status]}</span>
                <span>{count}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${barColors[status]} transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
