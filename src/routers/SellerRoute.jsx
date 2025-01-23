import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const SellerRoute = ({ children }) => {
  const [axiosSecure] = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: seller } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/${user?.email}`);
      return res.data;
    },
  });
  if (seller?.seller === true) {
    return children;
  } else {
    return navigate("/");
  }
};

export default SellerRoute;
