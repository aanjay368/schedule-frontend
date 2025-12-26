import { Monitor, Moon, Palette, Sun } from "lucide-react";
import CustomSelectInput from "../../../components/forms/CustomSelectInput";
import { useTheme } from "../../../contexts/ThemeProvider";
import BackButton from "../../../components/common/BackButton";

const ThemeSetting = () => {
  const { themeSetting, setThemeSetting } = useTheme();

  const themeOptions = [
    { value: "light", label: "Mode Terang", icon: <Sun size={18} /> },
    { value: "dark", label: "Mode Gelap", icon: <Moon size={18} /> },
    { value: "auto", label: "Ikuti Sistem", icon: <Monitor size={18} /> },
  ];

  const handleChange = (e) => {
    const { value } = e.target;
    setThemeSetting(e.target.value);
    localStorage.setItem("user-theme", value);
  };

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="space-y-6">
        <BackButton/>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white pb-2 border-b border-slate-300 dark:border-slate-800">
          Tampilan
        </h2>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-100 text-pink-600 shadow-inner dark:bg-pink-900/30">
            <Palette size={40} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Personalisasi
          </h3>
          <p className="max-w-[250px] text-xs text-slate-500">
            Sesuaikan kenyamanan mata Anda saat menggunakan aplikasi di
            lapangan.
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="ml-1 block text-xs font-black tracking-widest text-slate-500 uppercase dark:text-slate-400">
            Pilih Tema
          </label>
          <CustomSelectInput
            name="theme"
            label="Tema"
            icon={<Palette size={18} />}
            options={themeOptions}
            value={themeSetting}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSetting;
