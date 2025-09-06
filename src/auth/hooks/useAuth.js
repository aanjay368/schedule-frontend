import { useUser } from "../../context/UserContext";

export const useAuth = () => {
  const { user, hasRole, loading, logout } = useUser();

  const isAuthenticated = !!user;
  const isDeveloper = hasRole('DEVELOPER');
  const isEmployee = hasRole('EMPLOYEE');

  return {
    user,
    isAuthenticated,
    isDeveloper,
    isEmployee,
    hasRole,
    loading,
    logout,
  };
};
