import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children, requiredPosition }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredPosition) {
    const positionName = user?.position?.name?.toUpperCase();

    if (positionName !== requiredPosition.toUpperCase()) {
      if (positionName === "DEVELOPER") {
        return <Navigate to="/dev/schedule" replace />;
      }

      if (positionName === "STAFF") {
        return <Navigate to="/staff/schedule" replace />;
      }

      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
