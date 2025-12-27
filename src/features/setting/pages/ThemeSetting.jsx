import { Monitor, Moon, Palette, Sun } from "lucide-react";
import CustomSelectInput from "../../../components/forms/CustomSelectInput";
import { useTheme } from "../../../contexts/ThemeProvider";
import SettingDetailLayout from "../components/layouts/SettingDetailLayout";

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
    <SettingDetailLayout
      title="Tampilan"
      icon={Palette}
      iconColorClass="text-pink-600"
      iconBgClass="bg-purple-100 dark:bg-pink-900/30"
      subtitle="Personalisasi"
      description="Sesuaikan kenyamanan mata Anda saat menggunakan aplikasi di lapangan."
    >
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
    </SettingDetailLayout>
  );
};

export default ThemeSetting;
