export default function ProfileSummaryCard({ employee }) {
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-md">
        <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xl font-bold text-white shadow-lg">
              {!employee.nickname.includes("KOSONG") ? employee.nickname.charAt(0)?.toUpperCase() : "U"}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {employee.nickname.includes("KOSONG") ? "User" : employee.nickname.replace("AIC", "").replace("PORTER", "")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.division || "Role"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
