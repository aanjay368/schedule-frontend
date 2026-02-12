import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { User, LayoutGrid, UserCog } from "lucide-react";
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";
import { addEmployeeService } from "../../../../services/employeeService";
import { useDivision } from "../../contexts/DivisionsProvider";
import { useToast } from "../../../../contexts/ToastProvider";

function AddEmployee({ onSuccess }) {
  const divisions = useDivision();
  const [addEmployeeForm, setAddEmployeeForm] = useState({
    nickname: "",
    fullname: "",
    divisionId: "",
    positionId: "",
  });

  // 2. Kumpulkan SEMUA posisi dari semua divisi (Flat Array)
  const allPositionOptions = useMemo(() => {
    if (!divisions) return [];

    const positionMap = new Map();

    divisions.forEach((div) => {
      div.positions.forEach((pos) => {
        if (positionMap.has(pos.id)) {
          // Jika ID Posisi sudah ada, tambahkan nama divisi ke label yang sudah ada
          const existing = positionMap.get(pos.id);
          existing.divisions.push(div.name);
        } else {
          // Jika ID Posisi baru, buat entri baru
          positionMap.set(pos.id, {
            id: pos.id,
            name: pos.name,
            divisions: [div.name],
          });
        }
      });
    });

    // Ubah Map kembali menjadi array format options untuk Select
    return Array.from(positionMap.values()).map((item) => ({
      label: `${item.name} (${item.divisions.join(", ")})`,
      value: item.id,
    }));
  }, [divisions]);

  // 3. Opsi untuk Divisi
  const divisionOptions = useMemo(
    () => divisions.map((d) => ({ label: d.name, value: d.id })),
    [divisions],
  );

  const fields = [
    {
      label: "Nama Panggilan",
      name: "nickname",
      icon: <User size={18} />,
      type: "text",
      placeholder: "Nama Panggilan Karyawan",
    },
    {
      label: "Nama Lengkap",
      name: "fullname",
      icon: <User size={18} />,
      type: "text",
      placeholder: "Nama Lengkap Karyawan",
    },
    {
      label: "Divisi",
      name: "divisionId",
      type: "select",
      icon: <LayoutGrid size={18} />,
      options: divisionOptions,
    },
    {
      label: "Posisi",
      name: "positionId",
      type: "select",
      icon: <UserCog size={18} />,
      options: allPositionOptions, // Gunakan semua posisi yang sudah digabung
    },
  ];

  const handleChange = useCallback(
    (e) => {
      setAddEmployeeForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [addEmployeeForm],
  );

  const handleSubmit = useCallback(async (formData) => {
    try {
      const { data } = await addEmployeeService(formData);
      onSuccess(data);
    } catch (err) {
      throw err;
    }
  });

  return (
    <CustomFormComponent
      fields={fields}
      formData={addEmployeeForm}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonName={"Tambahkan"}
    />
  );
}

export default memo(AddEmployee);
