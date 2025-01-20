import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { PiMoneyLight } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
const DashboardHome = () => {
  const [axiosSecure] = useAxios();
  const { user } = useAuth();
  const { data: statistics = 0 } = useQuery({
    queryKey: ["totalOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/statistics?email=${user?.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 bg-blue-100 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <IoCartOutline className="text-3xl" />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              {statistics?.totalOrders}
            </p>
            <p className="capitalize">Orders</p>
          </div>
        </div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 bg-yellow-100 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <MdOutlinePending className="text-3xl"></MdOutlinePending>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              {statistics?.totalPending}
            </p>
            <p className="capitalize">Pending</p>
          </div>
        </div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 bg-green-100 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <PiMoneyLight  className="text-3xl"/>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              {statistics?.totalPaid}
            </p>
            <p className="capitalize">Paid</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
