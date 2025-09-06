import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

export default function Setting() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      schedule: true,
      updates: false,
    },
    privacy: {
      profileVisible: true,
      scheduleVisible: true,
      contactVisible: false,
    },
    display: {
      theme: "light",
      language: "id",
      timezone: "Asia/Jakarta",
    },
  });

  useEffect(() => {
    // Simulate loading settings
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    alert("Pengaturan berhasil disimpan!");
  };

  // Color scheme for settings sections
  const settingsColors = {   
    display: {
     bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      accent: "bg-emerald-500",
      name: "Tampilan",
    },
    security: {
      bg: "bg-gradient-to-br from-red-50 to-pink-50",
      border: "border-red-200",
      text: "text-red-700",
      accent: "bg-red-500",
      name: "Keamanan",
    },
  };

  const settingSections = [   
    {
      id: "display",
      title: "Pengaturan Tampilan",
      icon: "🎨",
      color: settingsColors.display,
      settings: [
        { key: "theme", label: "Tema", description: "Pilih tema aplikasi", type: "select", value: settings.display.theme, options: ["light", "dark", "auto"] },       
      ],
    },
    {
      id: "security",
      title: "Pengaturan Keamanan",
      icon: "🔐",
      color: settingsColors.security,
      settings: [
        { key: "changePassword", label: "Ubah Password", description: "Ganti password akun Anda", type: "button", action: () => alert("Fitur ubah password akan segera tersedia") },        
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Content Section */}
        <div className="mx-auto max-w-6xl mt-12">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl bg-gray-100"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {settingSections.map((section) => (
                <div
                  key={section.id}
                  className={`group relative overflow-hidden rounded-2xl border ${section.color.border} ${section.color.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  {/* Header */}
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                        
                      <div className="flex items-center gap-3">
                        <h3 className={`text-xl font-semibold ${section.color.text}`}>
                          {section.title}
                        </h3>
                      </div>                      
                    </div>
                  </div>

                  {/* Settings Content */}
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      {section.settings.map((setting) => (
                        <div
                          key={setting.key}
                          className="group/item rounded-xl bg-white/50 p-4 transition-all duration-200 hover:bg-white hover:shadow-sm"
                        >
                          {setting.type === "select" ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {setting.label}
                              </label>
                              <p className="text-xs text-gray-600 mb-2">{setting.description}</p>
                              <select
                                value={setting.value}
                                onChange={(e) => handleSettingChange(section.id, setting.key, e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              >
                                {setting.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option === "light" && "Terang"}
                                    {option === "dark" && "Gelap"}
                                    {option === "auto" && "Otomatis"}
                                    {option === "id" && "Bahasa Indonesia"}
                                    {option === "en" && "English"}
                                    {option.includes("Asia/") && option.replace("Asia/", "").replace("Jakarta", "WIB").replace("Makassar", "WITA").replace("Jayapura", "WIT")}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : setting.type === "button" ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {setting.label}
                              </label>
                              <p className="text-xs text-gray-600 mb-2">{setting.description}</p>
                              <button
                                onClick={setting.action}
                                className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg"
                              >
                                {setting.label}
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{setting.label}</p>
                                <p className="text-sm text-gray-600">{setting.description}</p>
                              </div>
                              <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                  type="checkbox"
                                  checked={setting.value}
                                  onChange={(e) => handleSettingChange(section.id, setting.key, e.target.checked)}
                                  className="peer sr-only"
                                />
                                <div className="h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                              </label>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div
                    className={`absolute -top-8 -right-8 h-24 w-24 rounded-full ${section.color.accent} opacity-10 blur-2xl`}
                  ></div>
                  <div
                    className={`absolute -bottom-8 -left-8 h-20 w-20 rounded-full ${section.color.accent} opacity-10 blur-2xl`}
                  ></div>
                </div>
              ))}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
