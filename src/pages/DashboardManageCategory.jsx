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
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@headlessui/react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
const DashboardManageCategory = () => {
  const [axiosSecure] = useAxios();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const [photoURL, setPhotoURL] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/categories?email=${user?.email}`
      );
      return res.data;
    },
  });
  const handleRemove = (_id) => {
    axiosSecure
      .delete(`/products/categories/${_id}`)
      .then((res) => {
        refetch();
        if (res?.data?.deletedCount > 0) {
          toast({
            title: "Success",
            description: `Category remove successfully!`,
            action: (
              <ToastAction altText="Category remove complete.">Ok</ToastAction>
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

  const handleUpdate = async (data) => {
    const image = data?.categoryImage[0];
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
    const updatedData = {
      categoryImage: photoURL,
      categoryName: data?.categoryName?.toLowerCase(),
    };
    axiosSecure
      .patch(`/products/categories/${categoryId}`, { updatedData })
      .then(() => {
        refetch();
        toast({
          title: "Success",
          description: `Category update successfully!`,
          action: (
            <ToastAction altText="Category update complete.">Ok</ToastAction>
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

  const handleAddCategory = async (data) => {
    const image = data?.categoryImage[0];
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
    const newData = {
      categoryImage: photoURL,
      categoryName: data?.categoryName?.toLowerCase(),
    };
    axiosSecure
      .post(`/products/categories`, { newData })
      .then(() => {
        refetch();
        toast({
          title: "Success",
          description: `Category added successfully!`,
          action: (
            <ToastAction altText="Category added complete.">Ok</ToastAction>
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
    <div>
      <div className="my-6">
        <Dialog>
          <DialogTrigger>
            <Button className={buttonVariants({ variant: "primary" })}>
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Add new category here. Click add when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleAddCategory)}>
              <label>
                <p className="font-medium text-sm">Category Name</p>
                <Input
                  {...register("categoryName")}
                  className={clsx(
                    "mt-2 block w-full rounded-lg",
                    "focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-300"
                  )}
                ></Input>
              </label>
              <p className="font-medium text-sm mt-4">Category Image</p>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  {...register("categoryImage")}
                  type="file"
                  accept="image/*" // Accept only image files
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
              <DialogFooter>
                <Button
                  type="submit"
                  className={buttonVariants({
                    variant: "primary",
                  })}
                >
                  Add
                </Button>
                <DialogClose>
                  <Button
                    className={buttonVariants({
                      variant: "destructive",
                    })}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table className="w-full overflow-x-auto min-h-[calc(100vh-500px)]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Category Image</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category, idx) => (
            <TableRow key={category?._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>
                <div className="bg-blue-100 rounded-xl p-2 w-fit">
                  <img
                    src={category?.categoryImage}
                    alt={`Image of ${category?.categoryName}`}
                    className="object-cover w-14 h-14 mx-auto"
                  />
                </div>
              </TableCell>
              <TableCell>
                {category?.categoryName?.charAt(0).toUpperCase() +
                  category?.categoryName?.slice(1)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        onClick={() => {
                          setCategoryId(category?._id);
                          reset();
                        }}
                        className={buttonVariants({ variant: "primary" })}
                      >
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Category</DialogTitle>
                        <DialogDescription>
                          Make changes to category here. Click update when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(handleUpdate)}>
                        <label>
                          <p className="font-medium text-sm">Category Name</p>
                          <Input
                            defaultValue={
                              category?.categoryName
                                ?.toLowerCase()
                                .charAt(0)
                                .toUpperCase() +
                              category?.categoryName?.slice(1)
                            }
                            {...register("categoryName")}
                            className={clsx(
                              "mt-2 block w-full rounded-lg",
                              "focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-300"
                            )}
                          ></Input>
                        </label>
                        <p className="font-medium text-sm mt-4">
                          Category Image
                        </p>
                        <label className="block">
                          <span className="sr-only">Choose profile photo</span>
                          <input
                            {...register("categoryImage")}
                            type="file"
                            accept="image/*" // Accept only image files
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
                        <DialogFooter>
                          <Button
                            type="submit"
                            className={buttonVariants({
                              variant: "primary",
                            })}
                          >
                            Update
                          </Button>
                          <DialogClose>
                            <Button
                              className={buttonVariants({
                                variant: "destructive",
                              })}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => handleRemove(category?._id)}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Remove
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardManageCategory;
