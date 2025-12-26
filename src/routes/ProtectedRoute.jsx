import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children, requiredPosition }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredPosition && user.position.name !== requiredPosition) {
    if (user.position.equalsIgnoreCase("DEVELOPER")) {
      return <Navigate to="/dev/schedule" replace />;
    } else if (user.position.name.equalsIgnoreCase("STAFF")) {
      return <Navigate to="/staff/schedule" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
