// React
import { useCallback, useState } from "react";

// React Router
import { useNavigate } from "react-router";

// Lucide Icons
import { KeyRound, ShieldAlert, Lock } from "lucide-react";

// Components
import CustomFormComponent from "../../../components/forms/CustomFormComponent";

// Contexts
import { useAuth } from "../../../contexts/AuthProvider";
import { useToast } from "../../../contexts/ToastProvider";

// Services
import { updateUserService } from "../../../services/userService";
import SettingDetailLayout from "../components/layouts/SettingDetailLayout";

const PasswordSetting = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { showToast } = useToast();
  const [updatePasswordForm, setUpdatePasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const fields = [
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
  ];

  const handleChange = useCallback(
    (e) =>
      setUpdatePasswordForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    [updatePasswordForm],
  );

  const handleSubmit = useCallback(
    async (payload) => {
      try {
        const { data } = await updateUserService(payload);
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
    <SettingDetailLayout
      title="Password"
      icon={ShieldAlert}
      iconColorClass="text-orange-600"
      iconBgClass="bg-orange-100 dark:bg-orange-900/30"
      subtitle="Keamanan Sandi"
      description="Ganti password secara berkala untuk menjaga keamanan data."
      showInfoTip={true}
      infoMessage="Semua perubahan keamanan akan dicatat untuk melindungi akun Anda."
    >
      <CustomFormComponent
        fields={fields}
        buttonName="Ganti"
        formData={updatePasswordForm}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </SettingDetailLayout>
  );
};

export default PasswordSetting;
