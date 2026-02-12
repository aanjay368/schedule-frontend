// React
import { useCallback, useState, memo } from "react";

// Components
import CustomSelectInput from "./CustomSelectInput";
import CustomTimeInput from "./CustomTimeInput";
import CustomTextInput from "./CustomTextInput";
import CustomDateInput from "./CustomDateInput";
import CustomTextAreaInput from "./CustomTextAreaInput";

const CustomFormComponent = memo(
  ({ fields, formData, onChange, onSubmit, buttonName }) => {
    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback(
      (e) => {
        if (fieldErrors[e.target.name]) {
          setFieldErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[e.target.name];
            return newErrors;
          });
        }
        if (onChange) onChange(e);
      },
      [fieldErrors, formData],
    );

    const handleSubmit = useCallback(
      async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGeneralError("");

        try {
          await onSubmit(formData);
        } catch (error) {
          if (typeof error.message === "object") {
            setFieldErrors(error.message);
          } else {
            setGeneralError(error.message || "Terjadi kesalahan");
          }
        } finally {
          setIsLoading(false);
        }
      },
      [onSubmit, formData],
    );

    const renderInput = (field) => {
      const { name, type } = field;

      switch (type) {
        case "date":
          return (
            <CustomDateInput
              value={formData[name]}
              onChange={handleChange}
              hasError={fieldErrors[name]}
              {...field}
            />
          );
        case "select":
          return (
            <CustomSelectInput
              value={formData[name]}
              onChange={handleChange}
              hasError={fieldErrors[name]}
              {...field}
            />
          );
        case "time":
          return (
            <CustomTimeInput
              value={formData[name]}
              onChange={handleChange}
              hasError={fieldErrors[name]}
              {...field}
            />
          );
        case "textarea":
          return (
            <CustomTextAreaInput
              value={formData[name]}
              onChange={handleChange}
              hasError={fieldErrors[name]}
              {...field}
            />
          );
        default:
          return (
            <CustomTextInput
              value={formData[name]}
              onChange={handleChange}
              hasError={fieldErrors[name]}
              {...field}
            />
          );
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        {generalError && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/20">
            <p className="text-sm font-medium text-red-600 dark:text-red-500">
              {generalError}
            </p>
          </div>
        )}

        {fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <label className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {field.label}
            </label>
            {/* Error Messages per Field */}
            {fieldErrors[field.name]?.map((err, idx) => (
              <p
                key={idx}
                className="mt-1 ml-1 text-xs font-medium text-red-500 italic"
              >
                * {err}
              </p>
            ))}
            {renderInput(field)}
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700 active:scale-[0.98] disabled:opacity-70 dark:shadow-none`}
        >
          {isLoading ? "Mohon Tunggu..." : buttonName}
        </button>
      </form>
    );
  },
);

export default CustomFormComponent;
