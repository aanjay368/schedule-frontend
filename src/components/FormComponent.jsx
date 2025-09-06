import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Briefcase, MapPin } from "lucide-react";

export default function FormComponent({
  errorMessage,
  fields,
  onSubmit,
  onChange,
  buttonName,
}) {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePasswordVisibility = (fieldName) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const getIconForField = (fieldName, type) => {
    if (type === "email") return Mail;
    if (type === "password") return Lock;
    if (fieldName?.toLowerCase().includes("name")) return User;
    if (fieldName?.toLowerCase().includes("position")) return Briefcase;
    if (fieldName?.toLowerCase().includes("division")) return MapPin;
    return User;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600">
          <User className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-3 text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {buttonName || "Form"}
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {errorMessage && (
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        {fields.map(
          ({
            name,
            label,
            errors,
            type = "text",
            placeholder,
            value,
            ...rest
          }) => {
            const isPassword = type === "password";
            const isSelect = type === "select";
            const inputType =
              isPassword && visiblePasswords[name] ? "text" : type;

            const Icon = getIconForField(name, type);

            if (isSelect) {
              const { inputs } = rest;
              return (
                <div key={name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    {label}
                  </label>
                  {errors?.map((error) => (
                    <p key={error} className="text-sm text-red-600">
                      {error}
                    </p>
                  ))}
                  <select
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border border-purple-500 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:text-white"
                  >
                    <option value="" className="dark:text-black">
                      Select {label}
                    </option>
                    {inputs.map(({ value, label }) => (
                      <option
                        key={value}
                        value={value}
                        className="dark:text-black"
                      >
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={name} className="space-y-1">
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  {label}
                </label>
                {errors?.map((error) => (
                  <p key={error} className="text-sm text-red-600">
                    {error}
                  </p>
                ))}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id={name}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    className="block w-full rounded-md border border-purple-300 py-2 pr-3 pl-10 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-purple-500 sm:text-sm dark:text-white"
                    {...rest}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(name)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    >
                      {visiblePasswords[name] ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          },
        )}

        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {buttonName || "Submit"}
        </button>
      </form>
    </div>
  );
}
