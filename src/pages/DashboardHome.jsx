import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { PiMoneyLight } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
const DashboardHome = () => {
  const [axiosSecure] = useAxios();
  const { user } = useAuth();

  const { data: adminStatistics = 0 } = useQuery({
    queryKey: ["adminStatistics"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/admin/statistics?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { data: sellerStatistics = 0 } = useQuery({
    queryKey: ["sellerStatistics"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/seller/statistics/${user?.email}`
      );
      return res.data;
    },
  });

  console.log(sellerStatistics);

  const { data: admin } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/${user?.email}`);
      return res.data;
    },
  });
  return (
    <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 bg-yellow-100 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <MdOutlinePending className="text-3xl"></MdOutlinePending>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              $
              {admin?.admin
                ? adminStatistics?.totalPendingAmount || 0
                : sellerStatistics?.totalPendingAmount || 0}
            </p>
            <p className="capitalize">Pending</p>
          </div>
        </div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 bg-green-100 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <PiMoneyLight className="text-3xl" />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              $
              {admin?.admin
                ? adminStatistics?.totalPaidAmount || 0
                : sellerStatistics?.totalPaidAmount || 0}
            </p>
            <p className="capitalize">Paid</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
