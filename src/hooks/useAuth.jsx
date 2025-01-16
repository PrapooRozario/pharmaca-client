import { authContext } from "@/contexts/AuthProvider";
import { useContext } from "react";
const useAuth = () => {
  const auths = useContext(authContext);
  return auths;
};

export default useAuth;
