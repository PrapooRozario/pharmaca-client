import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router";

const CategoryDetails = () => {
  const { category } = useParams();
  const [axiosSecure] = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0); // State to track discount
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/category/${category}`);
      return res.data;
    },
  });

  const handleSelect = (_id) => {
    const cart = {
      username: user?.displayName,
      email: user?.email,
      quantity: 1,
      productId: _id,
    };
    if (user && user?.email) {
      axiosSecure
        .post("/products/carts", cart)
        .then(() =>
          toast({
            title: "Success",
            description: "Product added to your cart.",
            action: <ToastAction altText="Sign up complete.">Ok</ToastAction>,
          })
        )
        .catch((err) => {
          toast({
            title: "Error",
            variant: "destructive",
            description:
              err?.response?.data?.message || "Something went wrong.",
            action: <ToastAction altText="Error">Ok</ToastAction>,
          });
        });
    } else {
      navigate("/auth/signup");
    }
  };
  return (
    <div className="my-10 px-2 md:px-6 lg:px-8">
      <Helmet>
        <title>Pharmaca | Category</title>
      </Helmet>
      {!products?.length && !isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <h1 className="text-lg md:text-2xl font-medium text-center px-4">
            Oops! We couldn't find what you're looking for.
          </h1>
        </div>
      ) : null}
      {isError && (
        <div className="fixed inset-0 flex items-center justify-center">
          <h1 className="text-lg md:text-2xl font-medium text-center px-4">
            Oops! Something went wrong.
          </h1>
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table className="w-full min-h-[calc(100vh-500px)]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead className="w-24 md:w-32">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={product?._id}>
                <TableCell className="text-sm">{index + 1}</TableCell>
                <TableCell>
                  <div className="rounded-xl p-1">
                    <img
                      src={product?.itemImage}
                      alt={product?.itemName}
                      className="w-12 h-12 md:w-14 md:h-14 object-cover mx-auto"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-sm">{product?.itemName}</TableCell>
                <TableCell className="hidden md:table-cell text-sm">
                  {product?.category?.charAt(0).toUpperCase() +
                    product?.category?.slice(1)}
                </TableCell>
                <TableCell className="text-sm">
                  ${product?.perUnitPrice}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      onClick={() => handleSelect(product?._id)}
                      className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                      })}
                    >
                      Select
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            setDiscount(product?.discountPercentage)
                          }
                          className={buttonVariants({
                            variant: "primary",
                            size: "sm",
                          })}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95%] max-w-[425px] p-4">
                        <div className="space-y-4">
                          <div className="w-full rounded-xl">
                            <img
                              src={product?.itemImage}
                              alt={product?.itemName}
                              className="w-full max-w-[200px] h-auto mx-auto object-cover"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs bg-blue-200 w-fit rounded-lg px-2 py-1 font-medium">
                              {product?.category?.charAt(0).toUpperCase() +
                                product?.category?.slice(1)}
                            </div>
                            <h1 className="text-xl font-medium">
                              {product?.itemName}
                            </h1>
                            <p className="text-sm text-neutral-600">
                              {product?.shortDescription}
                            </p>
                            {product?.discountPercentage > 0 && (
                              <div className="text-sm bg-green-100 w-fit rounded-lg px-4 py-2 font-medium">
                                {product?.discountPercentage}% OFF
                              </div>
                            )}
                            <div className="space-y-1">
                              <h1 className="text-2xl font-semibold text-[#1E6BFF]">
                                {product?.itemMassUnit}
                                <span className="text-xs text-neutral-500 font-normal ml-2">
                                  Mass Unit
                                </span>
                              </h1>
                              <h1 className="text-2xl font-semibold text-[#1E6BFF]">
                                $
                                {product?.discountPercentage === 0
                                  ? product?.perUnitPrice
                                  : (
                                      product?.perUnitPrice -
                                      (product?.perUnitPrice * discount) / 100
                                    ).toFixed(2)}
                                <span className="text-xs text-neutral-500 font-normal ml-2">
                                  Per Unit
                                </span>
                              </h1>
                            </div>
                            <div className="text-xs text-neutral-500">
                              Product By
                              <span className="block text-lg font-medium">
                                {product?.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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

export default CategoryDetails;
