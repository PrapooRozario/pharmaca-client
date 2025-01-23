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
      <Table className="w-full overflow-x-auto min-h-[calc(100vh-500px)]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment, idx) => (
            <TableRow key={payment?._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{payment?.username}</TableCell>
              <TableCell>{payment?.email}</TableCell>
              <TableCell>${payment?.totalAmount}</TableCell>
              <TableCell>
                <div
                  className={
                    payment?.status === "pending"
                      ? "text-yellow-600 bg-yellow-100 text-xs rounded-lg w-fit py-1 px-2"
                      : "text-green-600 bg-green-100 text-xs rounded-lg w-fit py-1 px-2"
                  }
                >
                  {payment?.status?.charAt(0)?.toUpperCase() +
                    payment?.status?.slice(1)}
                </div>
              </TableCell>
              <TableCell>
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
  );
};

export default DashboardPaymentManagement;
