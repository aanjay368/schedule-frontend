// React
import { useCallback } from "react";

// Lucide Icons
import { User } from "lucide-react";

// Components
// Components
import CustomFormComponent from "../../../components/forms/CustomFormComponent";
import BackButton from "../../../components/common/BackButton";
import InfoTip from "../../../components/ui/InfoTip";


// Contexts
import { useAuth } from "../../../contexts/AuthProvider";
import { useToast } from "../../../contexts/ToastProvider";

// Services
import {updateUserService} from "../../../services/userService";
import Container from "../../../components/ui/Container";

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
    <Container className="mx-auto max-w-4xl px-4">
      <div className="space-y-6">
        <BackButton />
        <h2 className="flex items-center gap-2 border-b border-slate-300 pb-2 text-xl font-bold text-gray-800 dark:border-slate-800 dark:text-white">
          Username
        </h2>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-100 text-blue-600 shadow-inner dark:bg-blue-900/30">
            <User size={40} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Keamanan Username
          </h3>
          <p className="max-w-[250px] text-xs text-slate-500">
            Username digunakan untuk masuk ke sistem. Pastikan username baru
            mudah diingat.
          </p>
        </div>
        <InfoTip
          type="alert"
          message="Semua perubahan keamanan akan dicatat untuk melindungi akun Anda."
        />
        <div className="ml-1 space-y-1">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Username Saat Ini
          </p>
          <p className="ml-1 text-sm dark:text-white">@{user.username}</p>
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
      </div>
    </Container>
  );
};

export default UsernameSetting;
