import CustomSelectInput from "../../../../components/forms/CustomSelectInput";
import Card from "../../../../components/ui/Card";

const MONTHS = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
];

export default function MonthAndYearInput({
 filters,
  setFilters
}) {

const handleChange = (e) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    [e.target.name]: e.target.value
  }))
}

  return (
    <div className="flex flex-nowrap items-center gap-4">
      <div className="flex items-center gap-3">        
        <div className="w-48">
          <CustomSelectInput
            name="month"
            options={MONTHS}
            value={filters.month}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">       
        <div className="w-48">
          <CustomSelectInput
            name="year"
            label="Tahun"
            options={Array.from(
              { length: 5 },
              (_, i) => filters.year - 2 + i,
            ).map((year) => ({
              label: year,
              value: year,
            }))}
            value={filters.year}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
