import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const DashboardPaymentManagement = () => {
  const [axiosSecure] = useAxios();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/payments`);
      return res.data;
    },
  });

  const handleAcceptPayment = (_id) => {
    axiosSecure
      .patch(`/products/payments/${_id}`)
      .then(() => {
        toast({
          title: "Success",
          description: `Payment accepted succeed!`,
          action: (
            <ToastAction altText="Payment accepted succeed!">Ok</ToastAction>
          ),
        });
        refetch();
      })
      .catch((err) =>
        toast({
          title: "Error",
          variant: "destructive",
          description: err?.code,
          action: <ToastAction altText="Error">Ok</ToastAction>,
        })
      );
  };
  return (
    <div className="p-6">
      <Helmet>
        <title> Pharmaca | Payment Management</title>
      </Helmet>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">#</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment, idx) => (
              <TableRow key={payment?._id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {payment?.username}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {payment?.email}
                </TableCell>
                <TableCell>${payment?.totalAmount}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex px-2 py-1 text-xs rounded-lg ${
                      payment?.status === "pending"
                        ? "text-yellow-600 bg-yellow-100"
                        : "text-green-600 bg-green-100"
                    }`}
                  >
                    {payment?.status?.charAt(0)?.toUpperCase() +
                      payment?.status?.slice(1)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    disabled={payment?.status === "paid"}
                    onClick={() => handleAcceptPayment(payment?._id)}
                    className={`${buttonVariants({
                      variant: "primary",
                    })} text-xs disabled:cursor-not-allowed`}
                  >
                    Accept Payment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPaymentManagement;
