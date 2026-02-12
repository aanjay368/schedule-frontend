import { useMemo, useEffect, useRef } from "react";
import CustomSelectInput from "../../../../components/forms/CustomSelectInput";
import { useDivision } from "../../contexts/DivisionsProvider";

function DivisionPositionSelect({ filters, setFilters, showAllOption = false }) {
  const divisions = useDivision();
  const isInitialMount = useRef(true);

  // 1. Sinkronisasi Otomatis
  useEffect(() => {
    if (!divisions || divisions.length === 0) return;

    // Jika showAllOption TRUE dan ini render pertama, biarkan default null
    if (showAllOption && isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const activeDiv = divisions.find((d) => d.id === filters.divisionId);

    if (!activeDiv && !showAllOption) {
      // Kasus: Render Pertama (Wajib Pilih)
      const firstDiv = divisions[0];
      setFilters((prev) => ({
        ...prev,
        divisionId: firstDiv.id,
        positionId: firstDiv.positions?.[0]?.id || null,
      }));
    } else if (activeDiv) {
      // Kasus: Perpindahan Divisi, cek apakah posisi masih relevan
      const isPosInNewDiv = activeDiv.positions.some(p => p.id === filters.positionId);
      
      if (!isPosInNewDiv) {
        setFilters((prev) => ({
          ...prev,
          positionId: activeDiv.positions?.[0]?.id || null,
        }));
      }
    }
    
    isInitialMount.current = false;
  }, [filters.divisionId, divisions, showAllOption]);

  // 2. Options untuk Divisi
  const divisionOptions = useMemo(() => {
    const baseOptions = divisions.map((d) => ({ label: d.name, value: d.id }));
    return showAllOption 
      ? [{ label: "Semua Divisi", value: "" }, ...baseOptions] // Value kosong string untuk null handling
      : baseOptions;
  }, [divisions, showAllOption]);

  // 3. Options untuk Posisi
  const positionOptions = useMemo(() => {
    if (showAllOption && (filters.divisionId === null || filters.divisionId === "")) {
      return [{ label: "Semua Posisi", value: "" }];
    }

    const activeDiv = divisions.find((d) => d.id === filters.divisionId);
    const basePositions = activeDiv?.positions?.map((p) => ({ label: p.name, value: p.id })) || [];
    
    return showAllOption 
      ? [{ label: "Semua Posisi", value: "" }, ...basePositions] 
      : basePositions;
  }, [divisions, filters.divisionId, showAllOption]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Jika value kosong string "", kita set sebagai null, jika tidak convert ke Number
    const finalValue = value === "" ? null : Number(value);

    setFilters((prev) => {
      const newState = { ...prev, [name]: finalValue };

      if (name === "divisionId") {
        if (finalValue === null && showAllOption) {
          newState.positionId = null;
        } else {
          const targetDiv = divisions.find((d) => d.id === finalValue);
          newState.positionId = targetDiv?.positions?.[0]?.id || null;
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
          // Mapping null kembali ke "" agar sinkron dengan <select> value
          value={filters.divisionId === null ? "" : filters.divisionId}
          onChange={handleChange}
        />
      </div>
      <div className="w-48">
        <CustomSelectInput
          name="positionId"
          options={positionOptions}
          value={filters.positionId === null ? "" : filters.positionId}
          onChange={handleChange}
          disabled={showAllOption && (filters.divisionId === null || filters.divisionId === "")}
        />
      </div>
    </div>
  );
}

export default DivisionPositionSelect;