// React
import { useCallback, useState } from "react";

// Lucide Icons
import { Flag, User } from "lucide-react";

// Components
import CustomFormComponent from "../../../components/forms/CustomFormComponent";

// Contexts
import { useAuth } from "../../../contexts/AuthProvider";
import { useToast } from "../../../contexts/ToastProvider";

// Services
import { updateUserService } from "../../../services/userService";
import SettingDetailLayout from "../components/layouts/SettingDetailLayout";

const Report = () => {  
  const { showToast } = useToast();
  const [createReport, setCreateReport] = useState({
    name: "",
    description: ""
  });

  const fields = [
    {
      name: "name",
      label: "Nama Laporan",
      type: "text",
      placeholder: "Contoh: Error pada schedule",      
    },
    {
      name: "description",
      label: "Deskripsi Laporan",
      type: "textarea",
      placeholder: "Contoh: Saya mengalami error pada saat mencari schedule di tanggal 12 Februari 2026.\nSchedule yang saya dapatkan tidak sesuai dengan yang di berikan oleh Admin",      
    },
  ];

  const handleChange = useCallback(
    (e) =>
      setCreateReport((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    [createReport],
  );

  const handleSubmit = useCallback(async (payload) => {
    try {      
    
      showToast("Username berhasil diperbarui");
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <SettingDetailLayout
      title="Laporan"
      icon={Flag}
      iconColorClass="text-red-600"
      iconBgClass="bg-red-100 dark:bg-red-900/30"
      subtitle="Buat Laporan"
      description="Buat Laporan ketika kamu mengalami kendala. Laporan akan di kirim ke pihak pengembang"
    >
      <CustomFormComponent
        fields={fields}
        buttonName="Kirim"
        onChange={handleChange}
        formData={createReport}
        onSubmit={handleSubmit}
      />      
    </SettingDetailLayout>
  );
};

export default Report;
