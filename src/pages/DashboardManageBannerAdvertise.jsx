import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import Slide1 from "@/assets/Slide1.webp";
import { useQuery } from "@tanstack/react-query";

const DashboardManageBannerAdvertise = () => {
  const [axiosSecure] = useAxios();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/banners`);
      return res.data;
    },
  });

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
                <div className="bg-blue-100 rounded-xl p-2">
                  <img
                    src={Slide1}
                    alt="Slide1"
                    className="object-cover w-14 h-14 mx-auto"
                  />
                </div>
              </TableCell>
              <TableCell className="text-left">{banner?.bannerName}</TableCell>
              <TableCell className="text-left w-[150px]">
                {banner?.description}
              </TableCell>
              <TableCell className="text-right">{banner?.email}</TableCell>
              <TableCell className="text-center">
                <Button className={buttonVariants({ variant: "primary" })}>
                  Add In Slider
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
