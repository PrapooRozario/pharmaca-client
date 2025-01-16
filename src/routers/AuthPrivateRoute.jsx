import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const AuthPrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  } else {
    return children;
  }
};

export default AuthPrivateRoute;
