import { Navigate, useLocation } from "react-router";
import { useUser } from "../../context/UserContext";
import LoadingAnimation from "../../components/LoadingAnimation";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
        <LoadingAnimation />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on actual role
    if (user.role === "DEVELOPER") {
      return <Navigate to="/dev/schedule" replace />;
    } else if (user.role === "EMPLOYEE") {
      return <Navigate to="/emp/schedule" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
