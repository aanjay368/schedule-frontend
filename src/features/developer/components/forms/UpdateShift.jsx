// React
import { useCallback, memo } from "react";

// Lucide Icons
import { Clock, Palette, Tag, TextIcon } from "lucide-react";

// Components
import  CustomFormComponent  from "../../../../components/forms/CustomFormComponent";

// Developer Feature Services
import { updateShiftService } from "../../services/shiftService";

// Contexts
import { useToast } from "../../../../contexts/ToastProvider";
import { useShiftColorOptions } from "../../contexts/ShiftColorOptionsProvider";

const UpdateShift = ({ shift, filters, onSuccess }) => {
  const { showToast } = useToast();

  // Inisialisasi data lama ke dalam form
  const initialData = {
    name: shift.name,
    label: shift.label,
    start: shift.start,
    end: shift.end,
    colorId: shift.color?.id, // Gunakan optional chaining untuk keamanan
    divisionId: filters.divisionId,
    positionId: filters.positionId,
  };

  const colorOptions = useShiftColorOptions();

  const field = [
    { label: "Nama", name: "name", icon: <TextIcon size={18} />, type: "text" },
    { label: "Label", name: "label", icon: <Tag size={18} />, type: "text" },
    {
      label: "Warna",
      name: "colorId",
      icon: <Palette size={18} />,
      type: "select",
      options: colorOptions,
    },
    { label: "Masuk", name: "start", icon: <Clock size={18} />, type: "time" },
    { label: "Pulang", name: "end", icon: <Clock size={18} />, type: "time" },
  ];

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const data = await updateShiftService(shift.id, formData);
        onSuccess(data);
      } catch (err) {
        throw err;
      }
    },
    [shift.id, onSuccess, showToast],
  );

  return (
    <CustomFormComponent
      fields={field}
      onSubmit={handleSubmit}
      initialData={initialData}
      buttonName="Simpan Perubahan"
    />
  );
};

export default memo(UpdateShift);
