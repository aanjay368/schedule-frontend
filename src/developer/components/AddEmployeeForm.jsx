import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import { Plus, X } from "lucide-react";

export default function AddEmployeeForm({ handleAddEmployee }) {
  const [addEmployeeForm, setAddEmployeeForm] = useState({
    nickname: "",
    fullname: "",
    division: "",
  });

  const [fields, setFields] = useState([
    {
      label: "Divisi",
      name: "division",
      type: "select",
      inputs: [
        {
          label: "AIC",
          value: "AIC",
        },
        {
          label: "Porter",
          value: "PORTER",
        },
      ],
      errors: [],
    },
    {
      label: "Nama Panggilan",
      name: "nickname",
      type: "text",
      value: addEmployeeForm["nickname"],
      errors: [],
    },
    {
      label: "Nama Lengkap",
      name: "fullname",
      type: "text",
      value: addEmployeeForm["fullname"],
      errors: [],
    },
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleAddEmployee(addEmployeeForm);
      setAddEmployeeForm({
        nickname: "",
        fullname: "",
        division: "",
      });
      setFields(
        fields.map((field) => {
          return {
            ...field,
            value: "",
          };
        }),
      );
      setIsOpen(false);
    } catch (err) {      
      handleAddError(err);
    }
  };

  const handleAddError = (err) => {    
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

  const handleChange = (e) => {
    setAddEmployeeForm({
      ...addEmployeeForm,
      [e.target.name]: e.target.value,
    });

    setFields(
      fields.map((field) =>
        field.name != [e.target.name]
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

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex h-11 items-center gap-2 self-end rounded-xl bg-purple-700 px-12 font-extrabold text-gray-200 hover:cursor-pointer"
      >
        <Plus height={22} width={22} />
        <p className="text-base">Tambah</p>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800/15 backdrop-blur-sm">
          <div className="relative flex w-full max-w-md transform flex-col rounded-lg bg-white dark:bg-slate-800 p-6 shadow-xl sm:p-8">
            <button
              onClick={handleOpen}
              className="relative z-30 self-end rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
            <FormComponent
              errorMessage={errorMessage}
              fields={fields}
              onSubmit={handleSubmit}
              onChange={handleChange}
              buttonName={"Tambahkan"}
            />
          </div>
        </div>  
      )}
    </>
  );
}
