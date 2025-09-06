import {Link} from "react-router";
import {useUser} from "../../context/UserContext";

export default function ScheduleCard({ scheduleData }) {

  const { user } = useUser();

  const shiftColors = {
    P: {
      bg: "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-500/60 dark:to-sky-900/20",
      border: "border-sky-200 dark:border-sky-500/30",
      text: "text-sky-500 dark:text-sky-100",
      accent: "bg-sky-500 dark:bg-sky-500",
      name: "Shift Pagi",
    },
    O: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-50 dark:from-blue-500/60 to-blue-900/20",
      border: "border-blue-200 dark:border-blue-500/30",
      text: "text-blue-500 dark:text-blue-100",
      accent: "bg-blue-500 dark:bg-blue-500",
      name: "Shift Office",
    },
    S: {
      bg: "bg-gradient-to-br from-purple-100 to-pink-50 dark:from-purple-500/60 dark:to-pink-900/20",
      border: "border-purple-200 dark:border-pink-200/30",
      text: "text-purple-700 dark:text-purple-100",
      accent: "bg-purple-500",
      name: "Shift Siang",
    },
    S1: {
      bg: "bg-gradient-to-br from-purple-100 to-pink-50 dark:from-purple-500/60 dark:to-pink-900/20",
      border: "border-purple-200 dark:border-purple-200/30",
      text: "text-purple-700 dark:text-purple-100",
      accent: "bg-purple-500",
      name: "Shift Siang Pertama",    
    },
    S2: {
      bg: "bg-gradient-to-br from-pink-100 to-red-50 dark:from-pink-500/60 dark:to-red-900/20",
      border: "border-pink-200 dark:border-red-200/30",
      text: "text-pink-700 dark:text-pink-100",
      accent: "bg-pink-500",
      name: "Shift Siang Kedua",
    },
    L: {
      bg: "bg-gradient-to-br from-red-50 to-red-50 dark:from-red-500/50 dark:to-red-900/20 ",
      border: "border-red-200 dark:border-red-200/15",
      text: "text-red-500 dark:text-red-100",
      accent: "bg-red-500",
      name: "Libur",
    },
  };

  const colors = shiftColors[scheduleData.shift];
  return (
    <div
      key={scheduleData.shift}
      className={`group relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      {/* Header */}
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-lg font-semibold ${colors.text}`}>
                {colors.name}
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {scheduleData.schedules.length} staff
            </p>
          </div>
          <div
            className={`h-12 w-12 rounded-xl ${colors.accent} flex items-center justify-center text-xl font-bold text-white shadow-lg`}
          >
            {scheduleData.shift}
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="px-6 pb-6">
        <div className="space-y-3">
          {scheduleData.schedules.map((schedule) => (
            <Link
                to={`/emp/profile/${schedule.employee.id}`}
              key={schedule.id}
              className={`group/item flex items-center gap-3 rounded-xl ${schedule.employee.id === user.id ? "dark:bg-white/80 bg-white" : "bg-white/30"} px-3 py-2 transition-all duration-200 hover:bg-white hover:shadow-sm group`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-semibold text-gray-700">
                {schedule.employee.number}
              </div>
              <span className={`font-medium ${schedule.employee.id === user.id ? "text-gray-800" : "text-gray-800 dark:text-gray-100"} `}>
                {schedule.employee.nickname.includes("KOSONG") ? "" : schedule.employee.nickname.replace("AIC", "").replace("PORTER", "")}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className={`absolute -top-8 -right-8 h-24 w-24 rounded-full ${colors.accent} opacity-10 blur-2xl transition-colors duration-1000`}
      ></div>
      <div
        className={`absolute -bottom-8 -left-8 h-20 w-20 rounded-full ${colors.accent} opacity-10 blur-2xl transition-colors duration-1000`}
      ></div>
    </div>
  );
}
