// React
import { useCallback } from "react";
import { useNavigate } from "react-router";

// Lucide Icons
import { Lock, User } from "lucide-react";

// Components
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";
import Card from "../../../../components/ui/Card";

// Contexts
import { useAuth } from "../../../../contexts/AuthProvider";

const FORM_NAME = "Login";
const BUTTON_NAME = "Login";
const fields = [
    {
    label: "Username",
    name: "username",
    icon: <User />,
      type: "text",
      errors: [],
    },
    {
      label: "Password",
      name: "password",
    icon: <Lock />,
      type: "password",
      errors: [],
    },
];

const LoginFormComponent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const userPosition = await login(formData);
        if (userPosition.name === "Developer") {
          navigate("/dev/schedules");
        } else if (userPosition.name === "Staff") {
          navigate("/staff/schedules");
      }
      } catch (err) {
        throw err;
      }
    },
    [login, navigate],
  );

  return (
    <Card className="z-10 w-full max-w-md p-6 sm:p-8">
      <CustomFormComponent
        formIcon={<User />}
        formName={FORM_NAME}
        buttonName={BUTTON_NAME}
        fields={fields}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default LoginFormComponent;
