import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { PiMoneyLight } from "react-icons/pi";
import { MdOutlinePending } from "react-icons/md";
import { Helmet } from "react-helmet";
import PiCharts from "@/components/ui/PiChart";
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

  const { data: admin } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/${user?.email}`);
      return res.data;
    },
  });

  console.log(adminStatistics);

  return (
    <section className="p-6 my-6  dark:text-gray-100 text-gray-800">
      <Helmet>
        <title> Pharmaca | Dashboard</title>
      </Helmet>
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-neutral-900/50 bg-yellow-100 dark:text-gray-100">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600 bg-yellow-200">
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
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-neutral-900/50 bg-green-100 dark:text-gray-100">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600 bg-green-200">
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
      <div className="mt-6">
        <PiCharts
          data={admin?.admin ? adminStatistics : sellerStatistics}
        ></PiCharts>
      </div>
    </section>
  );
};

export default DashboardHome;
