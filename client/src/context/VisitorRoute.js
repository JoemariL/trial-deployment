import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const Visitor = () => {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cookie = Cookies.get("visitorToken")
    ? Cookies.get("visitorToken")
    : null;
  return userInfo || cookie ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default Visitor;
