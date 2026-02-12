// React
import { memo, useCallback, useState } from "react";

// Lucide Icons
import { Clock, Palette, Tag, TextIcon } from "lucide-react";

// Components
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";

// Developer Feature
import { addShiftService } from "../../services/shiftService";

// Contexts
import { useToast } from "../../../../contexts/ToastProvider";

function AddShift({ filters, onSuccess }) {
  const { showToast } = useToast();
  const [addShiftForm, setAddShiftForm] = useState({
    name: "",
    label: "",
    color: "",
    start: "",
    end: "",
  });

  const fields = [
    {
      label: "Nama",
      name: "name",
      icon: <TextIcon />,
      type: "text",
    },
    {
      label: "Label",
      name: "label",
      icon: <Tag />,
      type: "text",
      maxLength: 2,
    },
    {
      label: "Warna",
      name: "color",
      icon: <Palette />,
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
    {
      label: "Masuk",
      name: "start",
      icon: <Clock />,
      type: "time",
    },
    {
      label: "Pulang",
      name: "end",
      icon: <Clock />,
      type: "time",
    },
  ];

  const handleChange = useCallback(
    (e) => {
      setAddShiftForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [addShiftForm],
  );

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const payload = {
          ...formData,
          divisionId: filters.divisionId,
          positionId: filters.positionId,
        };

        const { data } = await addShiftService(payload);
        onSuccess(data);
      } catch (err) {
        throw err;
      }
    },
    [filters, onSuccess, showToast],
  );

  return (
    <CustomFormComponent
      fields={fields}
      formData={addShiftForm}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonName={"Tambahkan"}
    />
  );
}

export default memo(AddShift);
