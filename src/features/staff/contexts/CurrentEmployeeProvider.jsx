import { useState, useEffect, createContext, useContext } from "react";
import { getCurrentEmployeeService } from "../../../services/employeeService";
const CurrentEmployeeContext = createContext({});

export const useCurrentEmployee = () => useContext(CurrentEmployeeContext);

export default function CurrentEmployeeProvider({ children }) {
  const [currentEmployee, setCurrentEmployee] = useState({});

  useEffect(() => {
    getCurrentEmployeeService().then(({data}) => {         
      setCurrentEmployee(data);      
    });
  }, []);

  return (
    <CurrentEmployeeContext.Provider value={currentEmployee}>
      {children}
    </CurrentEmployeeContext.Provider>
  );
}
