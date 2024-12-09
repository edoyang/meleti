import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
