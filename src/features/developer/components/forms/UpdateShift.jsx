// React
import { useCallback, memo, useState } from "react";

// Lucide Icons
import { Clock, Palette, Tag, TextIcon } from "lucide-react";

// Components
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";

// Developer Feature Services
import { updateShiftService } from "../../services/shiftService";

// Contexts
import { useToast } from "../../../../contexts/ToastProvider";

const UpdateShift = ({ shift, filters, onSuccess }) => {
  const { showToast } = useToast();

  const [updateShiftForm, setUpdateShiftForm] = useState({
    name: shift.name,
    label: shift.label,
    start: shift.start,
    end: shift.end,
    color: shift.color,
  });

  const fields = [
    { label: "Nama", name: "name", icon: <TextIcon size={18} />, type: "text" },
    { label: "Label", name: "label", icon: <Tag size={18} />, type: "text" , maxLength: 2},
    {
      label: "Warna",
      name: "color",
      icon: <Palette size={18} />,
      type: "select",
      options: [
        {
          icon: (
            <div className="inline-block h-2.5 w-2.5 rounded-full bg-purple-500" />
          ),
          label: "Ungu",
          value: "PURPLE",
        },
        {
          icon: (
            <div className="inline-block h-2.5 w-2.5 rounded-full bg-pink-500" />
          ),
          label: "Pink",
          value: "PINK",
        },
        {
          icon: (
            <div className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
          ),
          label: "Biru",
          value: "INDIGO",
        },
      ],
    },
    { label: "Masuk", name: "start", icon: <Clock size={18} />, type: "time" },
    { label: "Pulang", name: "end", icon: <Clock size={18} />, type: "time" },
  ];

  const handleChange = useCallback(
    (e) => {
      setUpdateShiftForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [updateShiftForm],
  );

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const { data } = await updateShiftService(shift.id, {
          ...formData,
          divisionId: filters.divisionId,
          positionId: filters.positionId,
        });
        onSuccess(data);
      } catch (err) {
        throw err;
      }
    },
    [shift.id, onSuccess, showToast],
  );

  return (
    <CustomFormComponent
      fields={fields}
      formData={updateShiftForm}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonName={"Tambahkan"}
    />
  );
};

export default memo(UpdateShift);
