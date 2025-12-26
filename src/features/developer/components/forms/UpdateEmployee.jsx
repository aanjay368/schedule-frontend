// React
import { memo, useMemo } from "react";

// Lucide Icons
import { User, LayoutGrid, UserCog } from "lucide-react";

// Components
import  CustomFormComponent from "../../../../components/forms/CustomFormComponent";

// Services
import { addEmployeeService } from "../../../../services/employeeService";

// Developer Feature Contexts
import { useDivision } from "../../contexts/DivisionsProvider";

// Contexts
import { useToast } from "../../../../contexts/ToastProvider";

function UpdateEmployee({ employee, onSuccess }) {
  const divisions = useDivision();
  const { showToast } = useToast();

  const initialData = {
    nickname: employee.nickname,
    fullname: employee.fullname,
    divisionId: employee.division.id,
    positionId: employee.position.id,
  };
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
    },
    {
      label: "Nama Lengkap",
      name: "fullname",
      icon: <User size={18} />,
      type: "text",
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

  const handleSubmit = async (formData) => {
    try {
      const data = await addEmployeeService(formData);
      onSuccess(data);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="w-full">
      <CustomFormComponent
        fields={fields}
        onSubmit={handleSubmit}
        buttonName="Simpan Perubahan"
        initialData={initialData}
      />
    </div>
  );
}

export default memo(UpdateEmployee);
