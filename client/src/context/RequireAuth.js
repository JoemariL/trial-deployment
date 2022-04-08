import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { getRefreshToken } from "../actions/userActions";

const refresh = async () => {
  await getRefreshToken();
};

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  refresh();

  return auth?.access ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
