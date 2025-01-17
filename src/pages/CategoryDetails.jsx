import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Slide1 from "@/assets/Slide1.webp";
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
          console.log(err);
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
    <div className="my-10 px-4 md:px-6 lg:px-8">
      {!products?.length && !isLoading ? (
        <div className="absolute top-[45%] z-10 right-[20%] left-[20%] flex justify-center items-center">
          <h1 className="md:text-2xl text-center text-lg font-medium">
            Oops! We couldn’t find what you’re looking for.
          </h1>
        </div>
      ) : (
        ""
      )}
      {isError && (
        <div className="absolute top-[45%] z-10 right-[20%] left-[20%] flex justify-center items-center">
          <h1 className="md:text-2xl text-center text-lg font-medium">
            Oops! Something went wrong.
          </h1>
        </div>
      )}
      {isLoading && (
        <div className="h-[calc(100vh-100px)] absolute right-[20%] left-[20%] flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      )}
      <Table className="w-full overflow-x-auto min-h-[calc(100vh-300px)]">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">Image</TableHead>{" "}
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product?._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">
                <div className="bg-blue-100 rounded-xl p-2">
                  <img
                    src={Slide1}
                    alt="Slide1"
                    className="object-cover w-14 h-14 mx-auto"
                  />
                </div>
              </TableCell>
              <TableCell>{product?.itemName}</TableCell> {/* Product name */}
              <TableCell>{product?.category}</TableCell>{" "}
              {/* Product category */}
              <TableCell>${product?.perUnitPrice}</TableCell>{" "}
              {/* Product price */}
              <TableCell>
                <div className="flex items-center gap-3 justify-end">
                  {" "}
                  {/* Flex container for buttons */}
                  <Button
                    onClick={() => handleSelect(product?._id)}
                    className={buttonVariants({ variant: "primary" })}
                  >
                    Select {/* Select button */}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={
                          () => setDiscount(product?.discountPercentage) // Set discount percentage on click
                        }
                        className={buttonVariants({ variant: "primary" })}
                      >
                        <Eye></Eye> {/* Eye icon */}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full sm:max-w-[425px]">
                      {" "}
                      {/* Dialog content */}
                      <div>
                        <div className="bg-blue-100 w-full rounded-xl">
                          <img
                            src={Slide1}
                            alt="Slide1"
                            className="object-cover w-[200px] mx-auto" // Responsive image in modal
                          />
                        </div>
                        <div className="text-xs bg-blue-200 w-fit rounded-lg px-2 py-1 mt-2 font-medium">
                          {product?.category} {/* Product category */}
                        </div>
                        <h1 className="text-xl font-medium mt-2">
                          {product?.itemName} {/* Product name */}
                        </h1>
                        <div className="text-sm text-neutral-600 font-medium mt-1">
                          {product?.shortDescription}{" "}
                          {/* Product description */}
                        </div>
                        {product?.discountPercentage > 0 && (
                          <div className="text-sm bg-green-100 w-fit rounded-lg px-4 py-2 mt-3 font-medium">
                            {product?.discountPercentage}% OFF{" "}
                            {/* Discount percentage */}
                          </div>
                        )}
                        <h1 className="text-2xl font-semibold text-[#1E6BFF] mt-3">
                          {product?.itemMassUnit}{" "}
                          <span className="text-xs text-neutral-500 font-normal">
                            Mass Unit {/* Product mass unit */}
                          </span>
                        </h1>
                        <h1 className="text-2xl font-semibold text-[#1E6BFF] mt-1">
                          $
                          {product?.discountPercentage === 0
                            ? product?.perUnitPrice
                            : product?.perUnitPrice -
                              (
                                (product?.perUnitPrice * discount) /
                                100
                              ).toFixed(2)}{" "}
                          <span className="text-xs text-neutral-500 font-normal">
                            Per Unit {/* Price after discount */}
                          </span>
                        </h1>
                        <h1 className="text-xs flex flex-col text-neutral-500 mt-3">
                          Product By{" "}
                          <span className="text-lg text-neutral-500 font-medium">
                            {product?.company} {/* Product company */}
                          </span>
                        </h1>
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
  );
};

export default CategoryDetails;
