// React
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

// Lucide Icons
import { Lock, User } from "lucide-react";

// Components
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";
import Card from "../../../../components/ui/Card";

// Contexts
import { useAuth } from "../../../../contexts/AuthProvider";

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
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e) => {      
      setLoginForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [loginForm],
  );

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
    <Card className="z-10 w-full max-w-md space-y-4 p-6 sm:p-8">
      <div className="flex flex-col items-center">
        <div
          className={`mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-xl shadow-purple-200 dark:shadow-none`}
        >
          <User />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          Login
        </h2>
      </div>
      <CustomFormComponent
        fields={fields}
        formData={loginForm}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonName={"Login"}
      />
    </Card>
  );
};

export default LoginFormComponent;
