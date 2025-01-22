import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AdminRoute = ({ children }) => {
  const [axiosSecure] = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: admin } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/${user?.email}`);
      return res.data;
    },
  });
  if (admin?.admin === true) {
    return children;
  } else {
    return navigate("/");
  }
};

export default AdminRoute;
