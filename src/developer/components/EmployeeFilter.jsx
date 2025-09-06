import { useRef, useState } from "react";
import { Search, Settings2, X } from "lucide-react";

export default function EmployeeFilter({ handleFilter }) {
  const [openFilter, setOpenFilter] = useState(false);
  const filter = useRef({
    name: "",
    division: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    filter.current[name] = value; // name bisa 'division', 'name', atau 'position'
    handleFilter(filter.current);
  };

  const handleOpen = () => {
    setOpenFilter(!openFilter);
  };

  return (    
      <div className="flex  gap-2 self-end">        
        <Search className="sticky h-5 w-5 translate-x-10 translate-y-2.5 text-gray-400" />
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Cari nama karyawan..."
          className="rounded-lg border border-gray-300 dark:text-gray-100 py-2 pr-4 pl-10 transition-all focus:border-transparent focus:ring-0"
        />
        <button
          onClick={handleOpen}
          className="flex items-center gap-2 bg-blue-700 rounded-xl  px-4 font-extrabold text-gray-200  hover:cursor-pointer "
        >
          <Settings2 height={16} width={16} />
          <p className="text-base">Filter</p>
        </button>    
      {openFilter && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800/15 backdrop-blur-sm">
          <div className="flex w-72 flex-col gap-4 rounded-lg bg-white p-8 shadow-md dark:bg-slate-800">
          <button
              onClick={handleOpen}
              className="top-4 right-4 self-end rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          <p className="font-semibold dark:text-gray-100">Divisi</p>
          <select
            name="division"
            value={filter.current.division}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:text-gray-100"
          >
            <option value="" className="dark:text-black">Semua</option>
            <option value="PORTER" className="dark:text-black">Porter</option>
            <option value="AIC" className="dark:text-black">AIC</option>
          </select>
          <p className="font-semibold dark:text-gray-100">Posisi</p>
          <select
            name="position"
            value={filter.current.position}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2  dark:text-gray-100"
          >
            <option value="" className="dark:text-black">Semua</option>
            <option value="WORKER" className="dark:text-black">Pekerja</option>
            <option value="LEADER" className="dark:text-black">Leader</option>
          </select>
        </div>
        </div>
      )}
    </div>
  );
}
