// React
import { useCallback } from "react";

// Lucide Icons
import { User } from "lucide-react";

// Components
import CustomFormComponent from "../../../components/forms/CustomFormComponent";

// Contexts
import { useAuth } from "../../../contexts/AuthProvider";
import { useToast } from "../../../contexts/ToastProvider";

// Services
import { updateUserService } from "../../../services/userService";
import SettingDetailLayout from "../components/layouts/SettingDetailLayout";

const UsernameSetting = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = useCallback(async (payload) => {
    try {
      const data = await updateUserService(payload);
      updateUser(data);
      showToast("Username berhasil diperbarui");
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <SettingDetailLayout
      title="Username"
      icon={User}
      iconColorClass="text-blue-600"
      iconBgClass="bg-blue-100 dark:bg-blue-900/30"
      subtitle="Keamanan Username"
      description="Username digunakan untuk masuk ke sistem. Pastikan username baru mudah diingat."
      showInfoTip={true}
      infoMessage="Semua perubahan keamanan akan dicatat untuk melindungi akun Anda."
    >
      {/* Konten Tambahan Khusus Username */}
      <div className="mb-6 ml-1 space-y-1">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Username Saat Ini
        </p>
        <p className="ml-1 text-sm font-medium italic dark:text-white">
          @{user.username}
        </p>
      </div>

      <CustomFormComponent
        fields={[
          {
            name: "username",
            label: "Username Baru",
            type: "text",
            placeholder: "Contoh: budi.perkasa",
            icon: <User size={18} />,
          },
        ]}
        buttonName="Ganti"
        initialData={{
          username: user.username,
        }}
        onSubmit={handleSubmit}
      />
    </SettingDetailLayout>
  );
};

export default UsernameSetting;
