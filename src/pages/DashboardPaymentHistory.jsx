import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const DashboardPaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxios();
  const { data: payments = [], isError, isLoading} = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/payments/seller/${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div className="p-6">
      {!payments.length && !isLoading ? (
        <div className="absolute top-[56%] z-10 right-[20%] left-[20%] flex justify-center items-center">
          <h1 className="md:text-2xl text-center text-lg font-medium">
            Oops! We couldn’t find what you’re looking for.
          </h1>
        </div>
      ) : (
        ""
      )}
      {isError && (
        <div className="absolute top-[56%] z-10 right-[20%] left-[20%] flex justify-center items-center">
          <h1 className="md:text-2xl text-center text-lg font-medium">
            Oops! Something went wrong.
          </h1>
        </div>
      )}
      {isLoading && (
        <div className="h-[calc(100vh-100px)] absolute right-[20%] left-[20%] flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      )}
      <Table className="w-full overflow-x-auto min-h-[calc(100vh-500px)]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment, idx) => (
            <TableRow key={payment?._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{payment?.buyer[0]?.username}</TableCell>
              <TableCell>{payment?.buyer[0]?.email}</TableCell>
              <TableCell>${payment?.totalAmount}</TableCell>
              <TableCell>
                <div
                  className={
                    payment?._id === "pending"
                      ? "text-yellow-600 bg-yellow-100 text-xs rounded-lg w-fit py-1 px-2"
                      : "text-green-600 bg-green-100 text-xs rounded-lg w-fit py-1 px-2"
                  }
                >
                  {payment?._id?.charAt(0)?.toUpperCase() +
                    payment?._id?.slice(1)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardPaymentHistory;
