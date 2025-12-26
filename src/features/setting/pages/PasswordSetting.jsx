// React
import { useCallback } from "react";

// React Router
import { useNavigate } from "react-router";

// Lucide Icons
import { KeyRound, ShieldAlert, Lock } from "lucide-react";

// Components
import CustomFormComponent from "../../../components/forms/CustomFormComponent";
import BackButton from "../../../components/common/BackButton";
import InfoTip from "../../../components/ui/InfoTip";


// Contexts
import { useAuth } from "../../../contexts/AuthProvider";
import { useToast } from "../../../contexts/ToastProvider";

// Services
import { updateUserService } from "../../../services/userService";

const PasswordSetting = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = useCallback(
    async (payload) => {
      try {
        const data = await updateUserService(payload);
        updateUser(data);
        navigate(-1);
        showToast("Password berhasil diperbarui");
      } catch (err) {
        throw err;
      }
    },
    [updateUser, navigate, showToast],
  );

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="space-y-6">
        <BackButton />
        <h2 className="flex items-center gap-2 border-b border-slate-300 pb-2 text-xl font-bold text-gray-800 dark:border-slate-800 dark:text-white">
          Password
        </h2>
      </div>
      <div className="space-y-4">
        {/* ... Header Visual ... */}
        <div className="flex flex-col items-center py-6 text-center">
          {/* Ikon besar tetap ShieldAlert sesuai keinginan Anda */}
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-100 text-orange-600 shadow-inner dark:bg-orange-900/30">
            <ShieldAlert size={40} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Keamanan Sandi
          </h3>
          <p className="max-w-[250px] text-xs text-slate-500">
            Ganti password secara berkala untuk menjaga keamanan data.
          </p>
        </div>

        {/* ... Security Warning Box ... */}
        <InfoTip
          type="alert"
          message="Semua perubahan keamanan akan dicatat untuk melindungi akun Anda."
        />

        <CustomFormComponent
          fields={[
            {
              name: "oldPassword",
              label: "Password Lama",
              type: "password",
              icon: <Lock size={18} />,
            },
            {
              name: "newPassword",
              label: "Password Baru",
              type: "password",
              icon: <KeyRound size={18} />,
            },
            {
              name: "confirmPassword",
              label: "Konfirmasi",
              type: "password",
              icon: <KeyRound size={18} />,
            },
          ]}
          buttonName="Ganti"
          color="orange"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PasswordSetting;
