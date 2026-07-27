interface StatCardProps {
  title: string;
  value: number;
  accentColor: string; // classe Tailwind, ex: "border-blue-500"
}

export function StatCard({ title, value, accentColor }: StatCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border-l-4 ${accentColor}`}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
        {value}
      </p>
    </div>
  );
}
