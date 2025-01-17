import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/auth/signup" state={pathname}></Navigate>;
};
export default PrivateRoute;
