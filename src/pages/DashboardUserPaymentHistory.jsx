import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Helmet } from "react-helmet";

const DashboardUserPaymentHistory = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxios();
    const {
      data: payments = [],
      isError,
      isLoading,
    } = useQuery({
      queryKey: ["payments"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/products/payments/me/${user?.email}`
        );
        return res.data
      },
    });
    return (
      <div className="p-6 w-full overflow-x-auto">
        <Helmet>
          <title> Pharmaca | Payment History</title>
        </Helmet>
        {!payments.length && !isLoading ? (
          <div className="fixed inset-0 flex justify-center items-center">
            <h1 className="text-lg md:text-2xl font-medium text-center px-4">
              Oops! We couldn&lsquo;t find what you&apos;re looking for.
            </h1>
          </div>
        ) : null}
        {isError && (
          <div className="fixed inset-0 flex justify-center items-center">
            <h1 className="text-lg md:text-2xl font-medium text-center px-4">
              Oops! Something went wrong.
            </h1>
          </div>
        )}
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        )}
        <div className="min-h-[calc(100vh-500px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead className="min-w-[100px]">Date</TableHead>
                <TableHead className="min-w-[150px]">Transaction Id</TableHead>
                <TableHead className="min-w-[100px]">Amount</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments?.map((payment, idx) => (
                <TableRow key={payment?._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    {moment(payment?.createdAt).format("L")}
                  </TableCell>
                  <TableCell className="break-all">
                    {payment?.transactionId}
                  </TableCell>
                  <TableCell>${payment?.totalAmount}</TableCell>
                  <TableCell>
                    <div
                      className={`text-xs rounded-lg w-fit py-1 px-2 ${
                        payment?.status === "pending"
                          ? "text-yellow-600 bg-yellow-100"
                          : "text-green-600 bg-green-100"
                      }`}
                    >
                      {payment?.status?.charAt(0)?.toUpperCase() +
                        payment?.status?.slice(1)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
};

export default DashboardUserPaymentHistory;
