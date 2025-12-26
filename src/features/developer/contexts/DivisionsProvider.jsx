import { useState, useEffect, createContext, useContext } from "react";
import { getDivisionsService } from "../services/divisionService";
const DivisionsContext = createContext([]);

export const useDivision = () => useContext(DivisionsContext);

export default function DivisionsProvider({ children }) {
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    getDivisionsService().then((data) => {
      setDivisions(data);
    });
  }, []);

  return (
    <DivisionsContext.Provider value={divisions}>
      {children}
    </DivisionsContext.Provider>
  );
}
