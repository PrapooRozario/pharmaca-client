import { Button, buttonVariants } from "@/components/ui/button";
import Slide1 from "@/assets/Slide1.webp";
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
import { Eye, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@headlessui/react";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const Shop = () => {
  const [axiosSecure] = useAxios(); // Custom hook for secure axios instance
  const { user } = useAuth();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0); // State to track discount
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (totalProducts <= 10) {
      setCurrentPage(0);
    }
  }, [totalProducts]);
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", currentPage, sort, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?limit=${itemsPerPage}&skip=${
          currentPage * itemsPerPage
        }&sort=${sort}&search=${search}`
      );
      setTotalProducts(res.data?.productsCount);
      return res.data.products; // Return fetched product data
    },
  });
  const itemsPerPage = 10;
  const totalPages = totalProducts
    ? Math.ceil(totalProducts / itemsPerPage)
    : 0;

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
    <div className="my-10 px-4 md:px-6 lg:px-8">
      <Helmet>
        <title> Pharmaca | Shop</title>
      </Helmet>
      {!products.length && !isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md">
          <h1 className="text-lg md:text-2xl text-center font-medium">
            Oops! We couldn't find what you're looking for.
          </h1>
        </div>
      ) : null}
      {isError && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md">
          <h1 className="text-lg md:text-2xl text-center font-medium">
            Oops! Something went wrong.
          </h1>
        </div>
      )}
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="spinner"></div>
        </div>
      )}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Button
          disabled={!products?.length}
          onClick={() => {
            if (sort === "") {
              setSort("desc");
            } else if (sort === "desc") {
              setSort("asc");
            } else {
              setSort("");
            }
          }}
          className={buttonVariants({ variant: "primary" })}
        >
          {sort === "desc" || sort === "asc" ? "Sorted" : "Sort"} By Price
        </Button>
        <div className="relative flex-1 md:max-w-md">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pr-4 pl-9 py-2 outline-none"
            placeholder="Search products..."
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 text-neutral-600" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full min-h-[calc(100vh-300px)]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead className="w-24">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={product?._id}>
                <TableCell>{currentPage * itemsPerPage + index + 1}</TableCell>
                <TableCell>
                  <div className="rounded-xl p-2">
                    <img
                      src={product?.itemImage}
                      alt={product?.itemName}
                      className="object-cover w-14 h-14"
                    />
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {product?.itemName}
                </TableCell>
                <TableCell>
                  {product?.category?.charAt(0).toUpperCase() +
                    product?.category?.slice(1)}
                </TableCell>
                <TableCell>${product?.perUnitPrice}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => handleSelect(product?._id)}
                      className={buttonVariants({ variant: "primary" })}
                    >
                      Select
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            setDiscount(product?.discountPercentage)
                          }
                          className={buttonVariants({ variant: "primary" })}
                        >
                          <Eye></Eye>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full sm:max-w-[425px]">
                        <div>
                          <div className="w-full rounded-xl">
                            <img
                              src={product?.itemImage}
                              alt={product?.itemName}
                              className="object-cover w-[200px] mx-auto"
                            />
                          </div>
                          <div className="text-xs bg-blue-200 w-fit rounded-lg px-2 py-1 mt-2 font-medium">
                            {product?.category?.charAt(0).toUpperCase() +
                              product?.category?.slice(1)}
                          </div>
                          <h1 className="text-xl font-medium mt-2">
                            {product?.itemName}
                          </h1>
                          <div className="text-sm text-neutral-600 font-medium mt-1">
                            {product?.shortDescription}{" "}
                          </div>
                          {product?.discountPercentage > 0 && (
                            <div className="text-sm bg-green-100 w-fit rounded-lg px-4 py-2 mt-3 font-medium">
                              {product?.discountPercentage}% OFF
                            </div>
                          )}
                          <h1 className="text-2xl font-semibold text-[#1E6BFF] mt-3">
                            {product?.itemMassUnit}{" "}
                            <span className="text-xs text-neutral-500 font-normal">
                              Mass Unit
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
                              Per Unit
                            </span>
                          </h1>
                          <h1 className="text-xs flex flex-col text-neutral-500 mt-3">
                            Product By{" "}
                            <span className="text-lg text-neutral-500 font-medium">
                              {product?.company}
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
      {products.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="bg-[#1158dbe7] px-4 py-2 disabled:cursor-not-allowed disabled:bg-neutral-400 text-white rounded-xl font-medium cursor-pointer"
          >
            Previous
          </button>
          {Array.from({ length: totalPages || 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`bg-[#1158dbe7] px-4 py-2 text-white rounded-xl font-medium cursor-pointer ${
                currentPage === index ? "bg-neutral-600" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="bg-[#1158dbe7] px-4 py-2 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-xl font-medium cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
