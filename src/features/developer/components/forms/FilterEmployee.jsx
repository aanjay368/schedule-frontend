import { Search } from "lucide-react";
import CustomTextInput from "../../../../components/forms/CustomTextInput";
import DivisionPositionSelect from "./DivisionPositionSelect";

const FilterEmployee = ({ filters, onFilters }) => {
  const handleChange = (e) => {
    onFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex max-w-4xl flex-1 space-x-4">
      <CustomTextInput
        name={"name"}
        icon={<Search />}
        value={filters["name"]}
        placeHolder="Cari Nama Karyawan..."
        onChange={handleChange}
      />
      <DivisionPositionSelect
        filters={filters}
        setFilters={onFilters}
        showAllOption="yes"
      />
    </div>
  );
};

export default FilterEmployee;
