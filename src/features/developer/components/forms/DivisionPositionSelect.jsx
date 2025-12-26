import { useMemo, useEffect, useRef } from "react";
import CustomSelectInput from "../../../../components/forms/CustomSelectInput";
import { useDivision } from "../../contexts/DivisionsProvider";

function DivisionPositionSelect({ filters, setFilters, showAllOption = false }) {
  const divisions = useDivision();
  const isInitialMount = useRef(true);

  // 1. Sinkronisasi Otomatis saat Pertama Kali Render & Saat DivisionId Berubah
  useEffect(() => {
    if (!divisions || divisions.length === 0) return;

    // Jika showAllOption TRUE dan ini render pertama, biarkan default 0 (Semua)
    if (showAllOption && isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Cari divisi yang aktif sekarang berdasarkan state
    const activeDiv = divisions.find((d) => d.id === filters.divisionId);

    if (!activeDiv && !showAllOption) {
      // Kasus: Render Pertama di Schedule (Wajib Pilih)
      const firstDiv = divisions[0];
      setFilters((prev) => ({
        ...prev,
        divisionId: firstDiv.id,
        positionId: firstDiv.positions?.[0]?.id || 0,
      }));
    } else if (activeDiv) {
      // Kasus: Perpindahan Divisi
      // Jika showAllOption aktif, kita bisa pilih apakah mau reset ke 0 atau item pertama.
      // Sesuai permintaan Anda "Option pertama select otomatis":
      const firstPosId = activeDiv.positions?.[0]?.id || 0;
      
      // Hanya update jika positionId saat ini tidak ada di dalam divisi yang baru
      const isPosInNewDiv = activeDiv.positions.some(p => p.id === filters.positionId);
      
      if (!isPosInNewDiv) {
        setFilters((prev) => ({
          ...prev,
          positionId: firstPosId,
        }));
      }
    }
    
    isInitialMount.current = false;
  }, [filters.divisionId, divisions, showAllOption]);

  // 2. Options untuk Divisi
  const divisionOptions = useMemo(() => {
    const baseOptions = divisions.map((d) => ({ label: d.name, value: d.id }));
    return showAllOption 
      ? [{ label: "Semua Divisi", value: 0 }, ...baseOptions] 
      : baseOptions;
  }, [divisions, showAllOption]);

  // 3. Options untuk Posisi
  const positionOptions = useMemo(() => {
    if (showAllOption && filters.divisionId === 0) {
      return [{ label: "Semua Posisi", value: 0 }];
    }

    const activeDiv = divisions.find((d) => d.id === filters.divisionId);
    const basePositions = activeDiv?.positions?.map((p) => ({ label: p.name, value: p.id })) || [];
    
    return showAllOption 
      ? [{ label: "Semua Posisi", value: 0 }, ...basePositions] 
      : basePositions;
  }, [divisions, filters.divisionId, showAllOption]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    setFilters((prev) => {
      const newState = { ...prev, [name]: numericValue };

      // Jika yang diubah adalah Divisi, kita siapkan perpindahan posisi otomatis
      if (name === "divisionId") {
        if (numericValue === 0 && showAllOption) {
          newState.positionId = 0;
        } else {
          const targetDiv = divisions.find((d) => d.id === numericValue);
          // Otomatis pilih posisi pertama dari divisi yang baru dipilih
          newState.positionId = targetDiv?.positions?.[0]?.id || 0;
        }
      }
      return newState;
    });
  };

  return (
    <div className="flex flex-nowrap items-center gap-4">
      <div className="w-48">
        <CustomSelectInput
          name="divisionId"
          options={divisionOptions}
          value={filters.divisionId}
          onChange={handleChange}
        />
      </div>
      <div className="w-48">
        <CustomSelectInput
          name="positionId"
          options={positionOptions}
          value={filters.positionId}
          onChange={handleChange}
          disabled={showAllOption && filters.divisionId === 0}
        />
      </div>
    </div>
  );
}

export default DivisionPositionSelect;