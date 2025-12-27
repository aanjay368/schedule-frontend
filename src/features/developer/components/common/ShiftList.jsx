import { useEffect, useReducer, useState, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";
import AddShift from "../forms/AddShift";
import {
  getShiftsService,
  deleteShiftsService,
} from "../../services/shiftService";
import { useModalOverlay } from "../../../../contexts/ModalOverlayProvider";
import UpdateShift from "../forms/UpdateShift";
import { useToast } from "../../../../contexts/ToastProvider";
import { ACTIONS, dataReducer } from "../../../../utils/dataReducer";


// Memetakan warna agar tetap bisa dibaca Tailwind JIT namun sesuai gaya lama Anda
import {shiftStyles } from "../../../../constants/shiftStyleConstants"

const formatShiftTime = (time) => {
  if (!time) return "-";
  const [hour] = time.split(":").map(Number);
  return hour >= 23 ? "LAST FLIGHT" : time;
};

export default function ShiftList({ filters }) {
  const [shifts, dispatch] = useReducer(dataReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { openModalOverlay, closeModalOverlay } = useModalOverlay();

  useEffect(() => {
    if (!filters.divisionId || !filters.positionId) return;

    setIsLoading(true);
    getShiftsService(filters.divisionId, filters.positionId)
      .then((data) => {
        dispatch({ type: ACTIONS.SET, payload: data });
      })
      .catch(({ message }) => {
        showToast(message, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters.divisionId, filters.positionId]);

  const handleAddShift = useCallback(() => {
    openModalOverlay(
      <AddShift
        filters={filters}
        onSuccess={(newShift) => {
          dispatch({ type: ACTIONS.ADD, payload: newShift });
          closeModalOverlay();
          showToast("Perubahan shift berhasil di simpan", "success");
        }}
      />,
      "Tambah Shift Baru",
      "Daftarkan jam kerja baru ke dalam sistem.",
      "sm",
    );
  }, [openModalOverlay, filters, dispatch]);

  const handleUpdateShift = useCallback(
    (shift) => {
      openModalOverlay(
        <UpdateShift
          shift={shift}
          filters={filters}
          onSuccess={(updatedShift) => {
            dispatch({ type: ACTIONS.UPDATE, payload: updatedShift });
            closeModalOverlay();
            showToast("Data shift baru berhasil di simpan", "success");
          }}
        />,
        `Sesuaikan Shift ${shift.name}`,
        `Perbarui informasi waktu kerja untuk shift ${shift.name}.`,
        "sm",
      );
    },
    [openModalOverlay, filters, dispatch],
  );

  const handleDeleteShift = useCallback(async (shift) => {
    try {
      const deletedShift = await deleteShiftsService(shift.id);
      dispatch({ type: ACTIONS.DELETE, payload: deletedShift.id });
      showToast(
        `Data shift dengan nama ${shift.name} berhasil di hapus`,
        "success",
      );
    } catch (err) {
      showToast(err.message || "Gagal menghapus", "error");
    }
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[180px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
          <span className="animate-pulse text-sm text-slate-500">
            Memuat data shift...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6">
      {shifts.map((shift) => {
        const style = shiftStyles[shift.color?.name] || shiftStyles.purple;

        return (
          <div
            key={shift.id}
            className={`flex min-h-[180px] w-full flex-col gap-3 rounded-xl border p-5 shadow-2xl backdrop-blur-sm transition-all hover:scale-105 sm:w-[220px] ${style.card}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold shadow-inner ${style.label}`}
            >
              {shift.label}
            </div>

            <div className="flex-1">
              <h5 className="text-lg leading-tight font-bold text-white">
                {shift.name}
              </h5>
              <div className="mt-2 space-y-1 text-sm font-medium opacity-80">
                <div className="flex justify-between">
                  <span>Masuk:</span>
                  <span className="font-mono">{shift.start || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pulang:</span>
                  <span className="font-mono">
                    {formatShiftTime(shift.end)}
                  </span>
                </div>
              </div>
            </div>

            {shift.label !== "L" && (
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => handleUpdateShift(shift)}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${style.button}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteShift(shift)}
                  className="rounded-md bg-red-500/80 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-500/40 dark:bg-red-500/20 dark:text-red-400"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Tombol Add Shift */}
      <button
        onClick={handleAddShift}
        className="group flex min-h-[180px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-400/5 text-slate-400 transition-all hover:border-purple-400 hover:bg-purple-500/5 hover:text-purple-500 sm:w-[220px] dark:border-slate-700"
      >
        <Plus
          size={32}
          className="transition-transform group-hover:scale-110"
        />
        <p className="text-[10px] font-black tracking-[0.2em] uppercase">
          Add Shift
        </p>
      </button>
    </div>
  );
}
