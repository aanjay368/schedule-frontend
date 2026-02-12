import { useEffect, useState, useCallback, useReducer } from "react";
import { Ban, Edit, PlusIcon, Trash2Icon } from "lucide-react";

// UI Components
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import DataStateWrapper from "../../../components/ui/DataStateWrapper";

// Business Components
import Header from "../components/ui/Header";
import EmployeeTable from "../components/common/EmployeeTable";
import AddEmployeeForm from "../components/forms/AddEmployee";
import FilterEmployee from "../components/forms/FilterEmployee";

// Hooks / Services
import {
  deleteEmployeeService,
  searchEmployeesService,
} from "../../../services/employeeService";
import { useModalOverlay } from "../../../contexts/ModalOverlayProvider";
import EmployeeDetail from "../../../components/common/EmployeeDetail";
import UpdateEmployee from "../components/forms/UpdateEmployee";
import { useToast } from "../../../contexts/ToastProvider";
import { ACTIONS, dataReducer } from "../../../utils/dataReducer";

export default function EmployeeManagement() {
  const [employees, dispatch] = useReducer(dataReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openModalOverlay, closeModalOverlay } = useModalOverlay();
  const { showToast } = useToast();
  const [filters, setFilters] = useState({
    name: "",
    divisionId: null,
    positionId: null,
  });

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    searchEmployeesService(filters)
      .then(({ data }) => {
        dispatch({ type: ACTIONS.SET, payload: data });
      })
      .catch((err) => {
        dispatch({
          type: ACTIONS.SET,
          payload: [],
        });
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters]);

  const handleAddEmployee = useCallback(() => {
    openModalOverlay(
      <AddEmployeeForm
        onSuccess={(newEmployee) => {
          dispatch({ type: ACTIONS.ADD, payload: newEmployee });
          closeModalOverlay();
          showToast(
            `Data Karyawan dengan nama ${newEmployee.nickname} berhasil di tambahkan`,
            "success",
          );
        }}
      />,
      "Tambah Karyawan Baru",
      "Lengkapi identitas karyawan, pilih divisi, dan tentukan posisi untuk mendaftarkan anggota tim baru ke dalam data operasional.",
      "md",
    );
  }, [openModalOverlay, closeModalOverlay, showToast, dispatch]);

  const handleDeleteEmployee = useCallback(
    async (employee) => {
      try {
        const { data } = await deleteEmployeeService(employee.id);
        dispatch({ type: ACTIONS.DELETE, payload: data.id });
        showToast(
          `karyawan dengan nama ${employee.nickname} berhasil di hapus`,
          "success",
        );
        closeModalOverlay();
      } catch ({ message }) {
        showToast(message, "error");
      }
    },
    [showToast, dispatch, closeModalOverlay],
  );

  const handleUpdateEmployee = useCallback(
    (employee) => {
      openModalOverlay(
        <div className="space-y-6">
          {/* 1. Konten Detail */}
          <UpdateEmployee
            employee={employee}
            onSuccess={(updatedEmployee) => {
              dispatch({ type: ACTIONS.UPDATE, payload: updatedEmployee });
              closeModalOverlay();
              showToast("Data karyawan berhasil di perbarui", "success");
            }}
          />

          {/* 2. Area Tombol Aksi */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
            <button
              onClick={() => {
                closeModalOverlay();
              }}
              className="flex h-11 items-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-red-700 active:scale-95 dark:shadow-none"
            >
              <Ban size={18} />
              <span>Batal</span>
            </button>
          </div>
        </div>,
        "Detail Karyawan",
        "Lakukan perubahan pada informasi personal atau penempatan kerja untuk memastikan data karyawan tetap akurat dan terkini.",
        "md",
      );
    },
    [openModalOverlay, closeModalOverlay, showToast, dispatch],
  ); // Tambahkan dependency di sini

  const handleSelectEmployee = useCallback(
    (employee) => {
      openModalOverlay(
        <div className="space-y-6">
          {/* 1. Konten Detail */}
          <EmployeeDetail employee={employee} />

          {/* 2. Area Tombol Aksi */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
            <button
              onClick={() => handleDeleteEmployee(employee)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2Icon size={18} />
              <span>Hapus</span>
            </button>

            <button
              onClick={() => {
                closeModalOverlay();
                handleUpdateEmployee(employee);
              }}
              className="flex h-11 items-center gap-2 rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95 dark:shadow-none"
            >
              <Edit size={18} />
              <span>Edit Karyawan</span>
            </button>
          </div>
        </div>,
        "Detail Karyawan",
        `Informasi lengkap mengenai ${employee.nickname || employee.name}`,
        "md",
      );
    },
    [
      openModalOverlay,
      closeModalOverlay,
      handleDeleteEmployee,
      handleUpdateEmployee,
    ],
  );

  return (
    <Container className="space-y-6">
      <Header
        headerName="Management Karyawan"
        headerDescription="Kelola basis data identitas dan struktur penempatan karyawan untuk mendukung akurasi informasi operasional perusahaan."
      />

      {/* Tabel Data dengan Filter di dalamnya */}
      <Card className="p-6">
        {/* Header Tabel yang Menyatu dengan Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-4 dark:border-slate-800">
          {/* Kiri: Judul */}
          <div className="min-w-fit">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Daftar Karyawan
            </h3>
            <p className="text-xs text-slate-500">
              {employees.length} orang ditemukan
            </p>
          </div>

          {/* Tengah: EmployeeFilter (Search & Dropdowns) */}
          <FilterEmployee filters={filters} onFilters={setFilters} />

          {/* Kanan: Tombol Tambah */}
          <button
            onClick={handleAddEmployee}
            className="flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-100 transition-all hover:bg-pink-700 active:scale-95 dark:shadow-none"
          >
            <PlusIcon size={18} />
            <span>Karyawan</span>
          </button>
        </div>

        {/* Area Data / Loading */}
        <div className="min-h-[50vh]">
          <DataStateWrapper
            isLoading={isLoading}
            error={error}
            loadingMessage="Memuat data karyawan..."
          >
            <div className="overflow-hidden rounded-2xl">
              <EmployeeTable
                employees={employees}
                onSelect={handleSelectEmployee}
              />
            </div>
          </DataStateWrapper>
        </div>
      </Card>
    </Container>
  );
}
