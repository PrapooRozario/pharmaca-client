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
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
const DashboardAddBanner = () => {
  const [axiosSecure] = useAxios();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [photoURL, setPhotoURL] = useState("");
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/banners/seller/${user?.email}`
      );
      return res.data;
    },
  });
  const handleAddBanner = async (data) => {
    const image = data?.bannerImage[0];
    await axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD_KEY
        }`,
        { image },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => setPhotoURL(res?.data?.data?.display_url));
    if (!photoURL) return;
    const banner = {
      bannerImage: photoURL,
      bannerName: data?.bannerName,
      description: data?.description,
      email: user?.email,
      status: "inactive",
    };
    axiosSecure
      .post("/products/banners", banner)
      .then(() => {
        refetch();
        toast({
          title: "Success",
          description: `Banner added successfully!`,
          action: (
            <ToastAction altText="Banner added complete.">Ok</ToastAction>
          ),
        });
        reset();
      })
      .catch((err) => {
        reset();
        toast({
          title: "Error",
          variant: "destructive",
          description: err?.code,
          action: <ToastAction altText="Error">Ok</ToastAction>,
        });
      });
  };
  return (
    <div className="p-6">
      <div className="mb-6">
        <Dialog>
          <DialogTrigger>
            <Button className={buttonVariants({ variant: "primary" })}>
              Add Advertise
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Add Banner
              </DialogTitle>
              <DialogDescription>
                Add new banner to your shop here. Click add when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleAddBanner)}>
              <div className="mb-4">
                <label>
                  <p className="font-medium text-sm">Banner Name</p>
                  <Input
                    {...register("bannerName", {
                      required: true,
                      maxLength: 30,
                    })}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Input>
                </label>
              </div>
              <div className="mb-4">
                <label>
                  <p className="font-medium text-sm">Description</p>
                  <Textarea
                    {...register("description", {
                      required: true,
                      maxLength: 120,
                    })}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Textarea>
                </label>
              </div>
              <div className="mb-4">
                <p className="font-medium text-sm">Banner Image</p>
                <label className="block">
                  <span className="sr-only">Choose Banner Photo</span>
                  <input
                    {...register("bannerImage")}
                    type="file"
                    accept="image/*"
                    className="block mt-2 w-full text-sm text-neutral-400
                                        file:me-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-[#1E6BFF] file:text-white
                                        hover:file:bg-[#1158db]
                                        file:cursor-pointer
                                        file:disabled:opacity-50 file:disabled:pointer-events-none
                                        dark:text-neutral-500
                                        dark:file:bg-blue-500
                                        dark:hover:file:bg-blue-400"
                  />
                </label>
              </div>
              <div className="col-span-2 flex items-center gap-4 justify-end">
                <Button className={buttonVariants({ variant: "primary" })}>
                  Add Advertise
                </Button>
                <DialogClose>
                  <Button
                    type="button"
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
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
              <TableCell className="text-left truncate max-w-[160px]">
                {banner?.bannerName}
              </TableCell>
              <TableCell className="text-left max-w-[160px] truncate">
                {banner?.description}
              </TableCell>
              <TableCell className="text-right">{banner?.email}</TableCell>
              <TableCell className="text-center">
                <div
                  className={
                    banner?.status === "inactive"
                      ? "text-yellow-600 bg-yellow-100 text-xs rounded-lg w-fit py-1 px-2"
                      : "text-green-600 bg-green-100 text-xs rounded-lg w-fit py-1 px-2"
                  }
                >
                  {banner?.status?.charAt(0)?.toUpperCase() +
                    banner?.status?.slice(1)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardAddBanner;
