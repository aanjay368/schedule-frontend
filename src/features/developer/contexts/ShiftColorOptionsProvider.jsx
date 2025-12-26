import { useState, useEffect, createContext, useContext } from "react";
import { getColorsService } from "../services/shiftService";
import { icons } from "lucide-react";
const ShiftColorOptionsContext = createContext([]);

export const useShiftColorOptions = () => useContext(ShiftColorOptionsContext);

const COLOR_TRANSLATIONS = {
  purple: "Ungu",
  pink: "Pink",
  indigo: "Biru",
  red: "Merah",
  // Tambahkan warna lain sesuai API Anda
};

const COLOR_ICONS = {
  purple: <div className="h-4 w-4 rounded-full bg-purple-600" />,
  pink: <div className="h-4 w-4 rounded-full bg-pink-600" />,
  indigo: <div className="h-4 w-4 rounded-full bg-indigo-600" />,
  red: <div className="h-4 w-4 rounded-full bg-red-600" />,
  // Tambahkan warna lain sesuai API Anda
};

export default function ShiftColorOptionsProvider({ children }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    getColorsService().then((data) => {     
      setColors(
        data.map((c) => ({
          label: COLOR_TRANSLATIONS[c.name],
          value: c.id,
          icon: COLOR_ICONS[c.name],
        })),
      );
    });
  }, []);  

  return (
    <ShiftColorOptionsContext.Provider value={colors}>
      {children}
    </ShiftColorOptionsContext.Provider>
  );
}
