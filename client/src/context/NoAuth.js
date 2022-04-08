import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NoAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return !auth?.access ? (
    <Outlet />
  ) : (
    <Navigate to="/main" state={{ from: location }} replace />
  );
};

export default NoAuth;
