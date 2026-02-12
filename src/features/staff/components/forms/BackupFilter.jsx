import { useCallback, useMemo, useState } from "react";
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";
import { useNavigate } from "react-router";
import { format } from "date-fns";

export default function BackupFilter({ filters, onClose }) {
  const [filtersState, setFiltersState] = useState(filters);
  const navigate = useNavigate();

  const fields = useMemo(
    () => [
      {
        name: "name",
        label: "Nama",
        type: "text",
        placeholder: "Cari nama rekan ...",
      },
      {
        name: "startDate",
        label: "Tanggal dimulai",
        type: "date",
      },
      {
        name: "endDate",
        label: "Tanggal berakhir",
        type: "date",
      },
    ],
    [],
  );

  // 2. Update state filters saat input berubah
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFiltersState((prev) => ({
      ...prev,
      [name]: value === "" ? null : value, // Ubah string kosong jadi null untuk API
    }));
  }, [filtersState]);

  // 3. Eksekusi saat tombol ditekan
  const handleApplyFilter = useCallback((payload) => {
    // 1. Buat instance URLSearchParams
    const params = new URLSearchParams();
    
    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value && (value instanceof Date || !isNaN(Date.parse(value)))) {
        const dateObject = new Date(value);

        payload[key] = format(dateObject, "dd-MM-yyyy");
      }
    });

    // 2. Masukkan filter yang memiliki nilai (tidak null/empty)
    Object.entries(payload).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    // 3. Navigasi ke URL yang sudah rapi
    navigate({
      search: params.toString() ? `${params.toString()}` : "",
    });

    onClose?.();
  });

  return (
    <div className="p-1">
      <CustomFormComponent
        fields={fields}
        formData={filtersState}
        onChange={handleChange}
        onSubmit={handleApplyFilter}
        buttonName="Terapkan Filter"
      />
      {/* Opsi Reset cepat */}
      <button
        type="button"
        onClick={() => {
          setFiltersState((prev) => ({
            ...prev,
            name: "",
            type: null,
            status: null,
          }));
          console.log(filtersState)
        }}
        className="mt-4 w-full text-center text-xs font-bold text-rose-500 transition-colors hover:text-rose-600"
      >
        Reset Filter
      </button>
    </div>
  );
}
