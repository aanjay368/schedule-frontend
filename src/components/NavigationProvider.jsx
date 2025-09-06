import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setNavigate } from '../service/navigationService';

/**
 * NavigationProvider component that sets up the navigation service
 * This should be used at the top level of the app to provide navigation capabilities
 * to services that can't use React hooks directly
 */
export default function NavigationProvider({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Set the navigate function in the navigation service
    setNavigate(navigate);
    
    // Cleanup function to remove the navigate reference
    return () => {
      setNavigate(null);
    };
  }, [navigate]);

  return children;
}
