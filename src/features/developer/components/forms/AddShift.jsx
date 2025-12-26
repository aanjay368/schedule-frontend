// React
import { memo, useCallback } from "react";

// Lucide Icons
import { Clock, Palette, Tag, TextIcon } from "lucide-react";

// Components
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";

// Developer Feature
import { addShiftService } from "../../services/shiftService";

// Contexts
import { useToast } from "../../../../contexts/ToastProvider";
import { useShiftColorOptions } from "../../contexts/ShiftColorOptionsProvider";

function AddShift({ filters, onSuccess }) {
  const { showToast } = useToast();

  const colorOptions = useShiftColorOptions();

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
    },
    {
      label: "Warna",
      name: "colorId",
      icon: <Palette />,
      type: "select",
      options: colorOptions,
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

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const payload = {
          ...formData,
          divisionId: filters.divisionId,
          positionId: filters.positionId,
        };

        const data = await addShiftService(payload);
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
      onSubmit={handleSubmit}
      initialData={{
        divisionId: filters.divisionId,
        positionId: filters.positionId,
      }}
      buttonName={"Tambahkan"}
    />
  );
}

export default memo(AddShift);
