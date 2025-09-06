import { useState } from "react";
import {
  X,
  Edit3,
  Save,
  User,
  MapPin,
  Briefcase,
  Trash2Icon,
} from "lucide-react";

export default function EmployeeDetailModal({
  employee,
  onUpdate,
  handleDelete,
  setSelectedEmployee,
}) {
  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800/15 backdrop-blur-sm">
      <div className="relative w-full max-w-md transform rounded-lg bg-white dark:bg-slate-900 shadow-xl transition-all">
        {/* Dynamic height container with fixed width */}
        <div className="max-h-[90vh] w-full max-w-md overflow-y-auto">
          <div className="flex flex-col rounded-lg bg-white p-6 sm:p-8 dark:bg-slate-800">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="self-end rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-600">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {employee.nickname}
                  </h4>
                  <p className="text-sm text-gray-400 ">{employee.id}</p>
                </div>
              </div>

              {/* Employee Details */}
              <div className="space-y-4">
                <Field
                  onUpdate={onUpdate}
                  icon={User}
                  label="Nickname"
                  employee={employee}
                  fieldName="nickname"
                />

                <Field
                  onUpdate={onUpdate}
                  icon={User}
                  label="Full Name"
                  employee={employee}
                  fieldName="fullname"
                />

                <Field
                  onUpdate={onUpdate}
                  icon={Briefcase}
                  label="Position"
                  employee={employee}
                  fieldName="position"
                  type="select"
                  options={[
                    { value: "WORKER", label: "Worker" },
                    { value: "LEADER", label: "Leader" },
                  ]}
                />

                <Field
                  onUpdate={onUpdate}
                  icon={MapPin}
                  label="Division"
                  employee={employee}
                  fieldName="division"
                  type="select"
                  options={[
                    { value: "AIC", label: "AIC" },
                    { value: "PORTER", label: "Porter" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end bg-gray-50 dark:bg-slate-900 px-6 py-4">
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:w-auto sm:text-sm"
                onClick={() => handleDelete(employee)}
              >
                <Trash2Icon className="mr-2 h-4 w-4" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  employee,
  fieldName,
  type = "text",
  options,
  onUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editedField, setEditedField] = useState({
    id: employee.id,
    [fieldName]: employee[fieldName],
  });

  const handleSave = async () => {
    setLoading(true);
    try {      
      await onUpdate(editedField);      
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (e) => {    
    setEditedField({
      ...editedField,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  const handleCancel = () => {
    setEditedField({
      id: employee.id,
      [fieldName]: employee[fieldName],
    });
    setErrorMessage("");
    setIsEditing(false);
    setEditedEmployee(employee);
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <Icon className="mt-0.5 h-5 w-5 text-gray-400" />
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <p className="text-sm text-red-600">{errorMessage}</p>
        {isEditing ? (
          <div className="flex">
            {type === "select" ? (
              <select
                name={fieldName}
                value={editedField[fieldName]}
                onChange={handleFieldChange}
                className="mt-1 block w-full rounded-md border dark:text-white border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >                
                {options.map((option) => (
                  <option key={option.value} value={option.value} className="dark:text-black">
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={fieldName}
                name={fieldName}
                type={type}
                value={editedField[fieldName]}
                onChange={handleFieldChange}
                className="mt-1 block w-full dark:text-white rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
            <div className="mt-1 flex flex-col-reverse sm:flex-row sm:justify-end">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-pink-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-pink-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleSave}
                disabled={loading}
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <p className="text-gray-90 mt-1 flex-1 text-sm dark:text-white">
              {employee[fieldName] || "-"}
            </p>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md px-1 py-1 text-sm font-medium text-gray-300 hover:text-gray-500 sm:w-auto sm:text-sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="mr-2 h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
