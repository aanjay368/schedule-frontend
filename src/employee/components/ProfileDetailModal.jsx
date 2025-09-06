import {User} from "lucide-react";

export default function ProfilDetailModal({ employee }) {
  const profileColors = {
    personal: {
      bg: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/60 dark:to-purple-500/60",
      border: "border-indigo-200 dark:border-purple-500/30",
      text: "text-sky-500 dark:text-sky-50",
      accent: "bg-sky-500 dark:bg-sky-500",
    },
  };

  const profileSection = {
    id: "personal",
    title: "Informasi Pribadi",
    icon: <User className="text-blue-500 dark:text-gray-100"/>,
    color: profileColors.personal,
    fields: [
      { label: "ID", value: employee?.id || "N/A" },
      { label: "Nama Panggilan", value: employee?.nickname.includes("KOSONG") ? "-" : employee?.nickname.replace("PORTER", "").replace("AIC", "").toUpperCase()},
      { label: "Nama Lengkap", value: employee?.fullname.includes("KOSONG") ? "-" : employee?.fullname},
      // { label: "Whatsapp", value: employee?.whatsapp || "N/A" },
      { label: "Divisi", value: employee?.division || "N/A" },
      { label: "Posisi", value: employee?.position || "N/A" },
      { label: "Nomor Absen", value: employee?.number || "N/A" },
    ],
  };

  return (
    <div className="flex justify-center">
      <div
        className={`group relative overflow-hidden rounded-2xl border ${profileSection.color.border} ${profileSection.color.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
      >
        {/* Header */}
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{profileSection.icon}</span>
              <h3
                className={`text-xl font-semibold ${profileSection.color.text}`}
              >
                {profileSection.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {profileSection.fields.map((field) => (
              <div
                key={field.label}
                className="group/tem flex items-start justify-between overflow-scroll rounded-xl bg-white/30 px-4 py-3 transition-all duration-200 "
              >
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {field.label}
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    {field.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          className={`absolute -top-8 -right-8 h-24 w-24 rounded-full ${profileSection.color.accent} opacity-10 blur-2xl`}
        ></div>
        <div
          className={`absolute -bottom-8 -left-8 h-20 w-20 rounded-full ${profileSection.color.accent} opacity-10 blur-2xl`}
        ></div>
      </div>
    </div>
  );
}
