import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  if (user) {
    return children;
  } else {
    <Navigate to="/auth/signup" state={pathname}></Navigate>;
  }
};

export default PrivateRoute;
