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
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title> Pharmaca | Payment History</title>
      </Helmet>
      {!payments.length && !isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <h1 className="text-lg md:text-2xl font-medium text-center">
            Oops! We couldn't find what you're looking for.
          </h1>
        </div>
      )}
      {isError && (
        <div className="fixed inset-0 flex items-center justify-center">
          <h1 className="text-lg md:text-2xl font-medium text-center">
            Oops! Something went wrong.
          </h1>
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      )}
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">#</TableHead>
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
                <TableCell className="max-w-[200px] truncate">
                  {payment?.buyer[0]?.username}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {payment?.buyer[0]?.email}
                </TableCell>
                <TableCell>${payment?.totalAmount}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-lg ${
                      payment?._id === "pending"
                        ? "text-yellow-600 bg-yellow-100"
                        : "text-green-600 bg-green-100"
                    }`}
                  >
                    {payment?._id?.charAt(0)?.toUpperCase() +
                      payment?._id?.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPaymentHistory;
