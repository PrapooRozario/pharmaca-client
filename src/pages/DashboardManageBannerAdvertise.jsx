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

const DashboardManageBannerAdvertise = () => {
  const [axiosSecure] = useAxios();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/banners/admin`);
      return res.data;
    },
  });

  const handleAddBanner = async (id) => {
    const banner = banners.find((banner) => banner._id === id);
    const status = banner?.status === "active" ? "inactive" : "active";
    await axiosSecure
      .patch("/products/banners", { id, status })
      .then(() => {
         toast({
           title: "Success",
           description: `Banner ${status === 'active' ? 'added' : 'removed'} in slider successfully!`,
           action: (
             <ToastAction altText="Banner added complete.">Ok</ToastAction>
           ),
         });
        refetch();
      })
      .catch((err) =>  toast({
          title: "Error",
          variant: "destructive",
          description: err?.code,
          action: <ToastAction altText="Error">Ok</ToastAction>,
        }));
  };

  return (
    <div className="p-6">
      <Table className="w-full overflow-x-auto min-h-[calc(100vh-500px)]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Banner Image</TableHead>
            <TableHead className="text-left">Banner Name</TableHead>
            <TableHead className="text-left">Description</TableHead>
            <TableHead className="text-right">Seller Email</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.map((banner) => (
            <TableRow key={banner?._id}>
              <TableCell className="font-medium text-left">
                <div className="rounded-xl p-2">
                  <img
                    src={banner?.bannerImage}
                    alt={banner?.bannerName}
                    className="object-cover w-14 h-14 mx-auto"
                  />
                </div>
              </TableCell>
              <TableCell className="text-left max-w-[160px] truncate">
                {banner?.bannerName}
              </TableCell>
              <TableCell className="text-left truncate max-w-[160px]">
                {banner?.description}
              </TableCell>
              <TableCell className="text-right">{banner?.email}</TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => handleAddBanner(banner?._id)}
                  className={
                    banner?.status === "inactive"
                      ? buttonVariants({ variant: "primary" })
                      : buttonVariants({ variant: "destructive" })
                  }
                >
                  {banner?.status === "active" ? "Remove" : "Add"} In Slider
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardManageBannerAdvertise;
