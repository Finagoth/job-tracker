import { useAuth } from "../../hooks/useAuth";
import { useJobsMetrics } from "../../hooks/useJobsMetrics";
import { usePageTitle } from "../../hooks/usePageTitle";
import { StatCard } from "../../components/StatCard";
import { StatusBreakdown } from "../../components/StatusBreakdown";

export function Dashboard() {
  const { user } = useAuth();
  const metrics = useJobsMetrics();
  usePageTitle("Dashboard");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bem-vindo, {user?.name}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Aqui está um resumo das suas candidaturas.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de candidaturas"
          value={metrics.total}
          accentColor="border-blue-500"
        />
        <StatCard
          title="Entrevistas agendadas"
          value={metrics.interviews}
          accentColor="border-yellow-500"
        />
        <StatCard
          title="Aprovações"
          value={metrics.approved}
          accentColor="border-green-500"
        />
        <StatCard
          title="Reprovações"
          value={metrics.rejected}
          accentColor="border-red-500"
        />
      </div>

      <StatusBreakdown byStatus={metrics.byStatus} total={metrics.total} />
    </div>
  );
}
