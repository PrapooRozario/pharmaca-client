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
import useAuth from "@/hooks/useAuth";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Helmet } from "react-helmet";
const DashboardManageMedicines = () => {
  const [axiosSecure] = useAxios();
  const { user } = useAuth();
  const [photoURL, setPhotoURL] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/dashboard/${user?.email}`);
      return res.data;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/categories`);
      return res.data;
    },
  });

  const handleAddMedicine = async (data) => {
    const image = data?.itemImage[0];
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
      itemImage: photoURL,
      itemName: data?.itemName,
      itemGenericName: data?.itemGenericName,
      shortDescription: data?.shortDescription,
      category: category.toLowerCase(),
      company,
      itemMassUnit: parseInt(data?.itemMassUnit),
      perUnitPrice: parseInt(data?.perUnitPrice),
      discountPercentage: parseInt(data?.discountPercentage) || 0,
      email: user?.email,
    };
    axiosSecure
      .post(`/products`, { newData })
      .then(() => {
        refetch();
        toast({
          title: "Success",
          description: `Item added successfully!`,
          action: <ToastAction altText="Item added complete.">Ok</ToastAction>,
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
    <div className="my-6">
      <Helmet>
        <title> Pharmaca | Manage Medicine</title>
      </Helmet>
      <div className="mb-6">
        <Dialog>
          <DialogTrigger>
            <Button className={buttonVariants({ variant: "primary" })}>
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Add Medicine
              </DialogTitle>
              <DialogDescription>
                Add new medicine to your shop here. Click add when you're done.
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid grid-cols-3 gap-6"
              onSubmit={handleSubmit(handleAddMedicine)}
            >
              <div>
                <label>
                  <p className="font-medium text-sm">Item Name</p>
                  <Input
                    {...register("itemName")}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Input>
                </label>
              </div>
              <div>
                <label>
                  <p className="font-medium text-sm">Item Generic Name</p>
                  <Input
                    {...register("itemGenericName")}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Input>
                </label>
              </div>
              <div>
                <label>
                  <p className="font-medium text-sm">Short Description</p>
                  <Textarea
                    {...register("shortDescription")}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Textarea>
                </label>
              </div>
              <div>
                <p className="font-medium text-sm">Item Image</p>
                <label className="block">
                  <span className="sr-only">Choose Item Photo</span>
                  <input
                    {...register("itemImage")}
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
              <div>
                <p className="font-medium text-sm mb-2">Category</p>
                <Select required onValueChange={(e) => setCategory(e)}>
                  <SelectTrigger className="w-full font-montserrat">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="font-montserrat">
                      {categories?.map((category) => (
                        <SelectItem
                          key={category?._id}
                          value={category?.categoryName}
                        >
                          {category?.categoryName?.charAt(0).toUpperCase() +
                            category?.categoryName?.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="font-medium text-sm mb-2">Company</p>
                <Select required onValueChange={(e) => setCompany(e)}>
                  <SelectTrigger className="w-full font-montserrat">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="font-montserrat">
                      <SelectItem value="Square Pharmaceuticals Ltd">
                        Square Pharmaceuticals Ltd
                      </SelectItem>
                      <SelectItem value="Beximco Pharmaceuticals Ltd">
                        Beximco Pharmaceuticals Ltd
                      </SelectItem>
                      <SelectItem value="Renata Limited">
                        Renata Limited
                      </SelectItem>
                      <SelectItem value="Incepta Pharmaceuticals Ltd">
                        Incepta Pharmaceuticals Ltd
                      </SelectItem>
                      <SelectItem value="ACI Limited">ACI Limited </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>
                  <p className="font-medium text-sm">Item Mass Unit</p>
                  <Input
                    type="number"
                    {...register("itemMassUnit")}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Input>
                </label>
              </div>
              <div>
                <label>
                  <p className="font-medium text-sm">Per Unit Price</p>
                  <Input
                    type="number"
                    {...register("perUnitPrice")}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Input>
                </label>
              </div>
              <div>
                <label>
                  <p className="font-medium text-sm">Discount Percentage</p>
                  <Input
                    type="number"
                    {...register("discountPercentage")}
                    className={clsx(
                      "mt-2 block w-full rounded-lg",
                      "placeholder-neutral-400 outline-none"
                    )}
                  ></Input>
                </label>
              </div>
              <div className="col-span-2 flex items-center gap-4 justify-end">
                <Button className={buttonVariants({ variant: "primary" })}>
                  Add Medicine
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
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-nowrap">#</TableHead>
              <TableHead className="text-nowrap">Item Image</TableHead>
              <TableHead className="text-nowrap">Item Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-nowrap">Item Unit Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, idx) => (
              <TableRow key={product?._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  <div className="rounded-xl p-2 w-fit">
                    <img
                      src={product?.itemImage}
                      alt={product?.itemName}
                      className="object-cover w-14 h-14 mx-auto"
                    />
                  </div>
                </TableCell>
                <TableCell>{product?.itemName}</TableCell>
                <TableCell className="max-w-[160px] truncate">
                  {product?.shortDescription}
                </TableCell>
                <TableCell>
                  {product?.category?.charAt(0)?.toUpperCase() +
                    product?.category.slice(1)}
                </TableCell>
                <TableCell>{product?.company}</TableCell>
                <TableCell>${product?.perUnitPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardManageMedicines;
