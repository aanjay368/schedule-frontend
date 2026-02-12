import { useMemo, useState } from "react";
import CustomFormComponent from "../../../../components/forms/CustomFormComponent";
import { useNavigate } from "react-router";

export default function FilterSubmissions({ filters, onClose }) {
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
        name: "type",
        label: "Jenis Permintaan",
        type: "select",
        options: [
          { label: "Semua Tipe", value: null },
          { label: "Tukar Shift", value: "SHIFT_SWAP" },
          { label: "Tukar Libur", value: "OFF_SWAP" },
          { label: "Full", value: "BACKUP" },
          { label: "Pembatalan", value: "CANCELLATION" },
        ],
      },
      {
        name: "status",
        label: "Status Pengajuan",
        type: "select",
        options: [
          { label: "Semua Status", value: null },
          { label: "Pending", value: "PENDING" },
          { label: "Disetujui", value: "APPROVED" },
          { label: "Ditolak", value: "REJECTED" },
          { label: "Dibatalkan", value: "CANCELLED" },
          { label: "Kadaluarsa", value: "EXPIRED" },
        ],
      },
    ],
    [],
  );

  // 2. Update state filters saat input berubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltersState((prev) => ({
      ...prev,
      [name]: value === "" ? null : value, // Ubah string kosong jadi null untuk API
    }));
  };

  // 3. Eksekusi saat tombol ditekan
  const handleApplyFilter = () => {
    // 1. Buat instance URLSearchParams
    const params = new URLSearchParams();

    // 2. Masukkan filter yang memiliki nilai (tidak null/empty)
    Object.entries(filtersState).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    // 3. Navigasi ke URL yang sudah rapi
    navigate({
      search: params.toString() ? `${params.toString()}` : "",
    });

    onClose?.();
  };

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
