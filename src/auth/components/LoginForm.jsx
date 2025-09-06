import FormComponent from "../../components/FormComponent";
import { loginService } from "../service/authService";
import { useState } from "react";
import { getCurrentUserService } from "../service/authService";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

export default function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    nickname: "",
    password: "",
  });

  const [fields, setFields] = useState([
    {
      label: "Nama Panggilan",
      name: "nickname",
      type: "text",
      value: loginForm["nickname"],
      errors: [],
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      value: loginForm["password"],
      errors: [],
    },
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginService(loginForm)
      .then((data) => {
        handleNavigate();
      })
      .catch((err) => {
        handleLoginError(err);
      });
  };

  const handleLoginError = (err) => {
    if (typeof err.message === "string") {
      setErrorMessage(err.message);
      return;
    }

    if (typeof err.message === "object") {
      const updatedFields = fields.map((field) =>
        err.message.hasOwnProperty(field.name)
          ? { ...field, errors: err.message[field.name] }
          : field,
      );
      setFields(updatedFields);
    }
  };

  const handleNavigate = async () => {
    getCurrentUserService().then(({ data }) => {
      login(data);
      if (data.role === "DEVELOPER") {
        navigate("/dev/schedule");
      } else if (data.role === "EMPLOYEE") {
        navigate("/emp/schedule");
      } else {
        navigate("/");
      }
    });
  };

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });

    setFields(
      fields.map((field) =>
        field.name != [e.target.id]
          ? field
          : {
              ...field,
              errors: [],
              value: e.target.value,
            },
      ),
    );

    setErrorMessage("");
  };

  return (
    <div className="relative w-72 max-w-md transform rounded-lg bg-white p-6 shadow-xl sm:p-8 dark:bg-slate-800">
      <FormComponent
        errorMessage={errorMessage}
        fields={fields}
        onSubmit={handleSubmit}
        onChange={handleChange}
        buttonName={"Login"}
      />
    </div>
  );
}
