import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const DashboardManageUsers = () => {
  const [axiosSecure] = useAxios();
  const { user } = useAuth();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const handleChangeRole = (role, email) => {
    axiosSecure
      .patch(`/users/${user?.email}`, { role: role, email: email })
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          toast({
            title: "Success",
            description: `User role updated to ${role} successfully!`,
            action: (
              <ToastAction altText="Role change complete.">Ok</ToastAction>
            ),
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",

          variant: "destructive",
          description: err?.code,
          action: <ToastAction altText="Error">Ok</ToastAction>,
        });
      });
  };
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead className="min-w-[150px]">Username</TableHead>
            <TableHead className="min-w-[200px]">Email</TableHead>
            <TableHead className="min-w-[150px]">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, idx) => (
            <TableRow key={user?._id}>
              <TableCell className="font-medium text-center">{idx + 1}</TableCell>
              <TableCell className="break-words">{user?.username}</TableCell>
              <TableCell className="break-words">{user?.email}</TableCell>
              <TableCell>
                <Select onValueChange={(e) => handleChangeRole(e, user?.email)}>
                  <SelectTrigger className="w-full max-w-[180px]">
                    <SelectValue
                      placeholder={
                        user?.role?.charAt(0).toUpperCase() +
                        user?.role?.slice(1)
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardManageUsers;
