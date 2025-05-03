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
    <div className="my-10 px-4 md:px-6 lg:px-8 min-h-screen">
      <Helmet>
        <title> Pharmaca | Shop</title>
      </Helmet>

      {/* Empty State */}
      {!products.length && !isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md">
          <h1 className="text-lg md:text-2xl text-center font-medium text-gray-700 dark:text-gray-300">
            Oops! We couldn&apos;t find what you&apos;re looking for.
          </h1>
        </div>
      ) : null}

      {/* Error State */}
      {isError && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md">
          <h1 className="text-lg md:text-2xl text-center font-medium text-red-600 dark:text-red-400">
            Oops! Something went wrong.
          </h1>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="spinner border-t-blue-500 dark:border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent"></div>
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Button
          disabled={!products?.length}
          onClick={() => {
            if (sort === "") setSort("desc");
            else if (sort === "desc") setSort("asc");
            else setSort("");
          }}
          className={`${buttonVariants({
            variant: "primary",
          })} dark:bg-blue-600 dark:hover:bg-blue-700`}
        >
          {sort === "desc" || sort === "asc" ? "Sorted" : "Sort"} By Price
        </Button>

        <div className="relative flex-1 md:max-w-md">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pr-4 pl-9 py-2 outline-none bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            placeholder="Search products..."
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 text-neutral-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <Table className="w-full min-h-[calc(100vh-300px)]">
          <TableHeader className="bg-neutral-100 dark:bg-neutral-800">
            <TableRow>
              <TableHead className="w-16 text-neutral-700 dark:text-gray-300">
                #
              </TableHead>
              <TableHead className="w-24 text-neutral-700 dark:text-gray-300">
                Image
              </TableHead>
              <TableHead className="text-neutral-700 dark:text-gray-300">
                Name
              </TableHead>
              <TableHead className="text-neutral-700 dark:text-gray-300">
                Category
              </TableHead>
              <TableHead className="text-neutral-700 dark:text-gray-300">
                Price
              </TableHead>
              <TableHead className="text-right text-neutral-700 dark:text-gray-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {products?.map((product, index) => (
              <TableRow
                key={product?._id}
                className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <TableCell className="font-medium text-neutral-700 dark:text-gray-200">
                  {currentPage * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>
                  <div className="rounded-xl p-2 bg-neutral-100 dark:bg-neutral-700">
                    <img
                      src={product?.itemImage}
                      alt={product?.itemName}
                      className="object-cover w-14 h-14 rounded-lg"
                    />
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-neutral-700 dark:text-gray-200">
                  {product?.itemName}
                </TableCell>
                <TableCell className="text-neutral-700 dark:text-gray-200">
                  {product?.category?.charAt(0).toUpperCase() +
                    product?.category?.slice(1)}
                </TableCell>
                <TableCell className="text-neutral-700 dark:text-gray-200">
                  ${product?.perUnitPrice}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => handleSelect(product?._id)}
                      className={`${buttonVariants({
                        variant: "primary",
                      })} dark:bg-blue-600 dark:hover:bg-blue-700`}
                    >
                      Select
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            setDiscount(product?.discountPercentage)
                          }
                          className={`${buttonVariants({
                            variant: "primary",
                          })} dark:bg-blue-600 dark:hover:bg-blue-700`}
                        >
                          <Eye/>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full sm:max-w-[425px] bg-white dark:bg-neutral-800 dark:border-neutral-700">
                        <div>
                          <div className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-700 p-4">
                            <img
                              src={product?.itemImage}
                              alt={product?.itemName}
                              className="object-cover w-[200px] mx-auto rounded-lg"
                            />
                          </div>
                          <div className="text-xs bg-blue-200 dark:bg-blue-800 w-fit rounded-lg px-2 py-1 mt-2 font-medium">
                            {product?.category?.charAt(0).toUpperCase() +
                              product?.category?.slice(1)}
                          </div>
                          <h1 className="text-xl font-medium mt-2 text-neutral-800 dark:text-gray-100">
                            {product?.itemName}
                          </h1>
                          <div className="text-sm text-neutral-600 font-medium mt-1 dark:text-gray-400">
                            {product?.shortDescription}
                          </div>
                          {product?.discountPercentage > 0 && (
                            <div className="text-sm bg-green-100 dark:bg-green-800 w-fit rounded-lg px-4 py-2 mt-3 font-medium">
                              {product?.discountPercentage}% OFF
                            </div>
                          )}
                          <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-3">
                            {product?.itemMassUnit}{" "}
                            <span className="text-xs text-neutral-500 font-normal dark:text-gray-500">
                              Mass Unit
                            </span>
                          </h1>
                          <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-1">
                            $
                            {product?.discountPercentage === 0
                              ? product?.perUnitPrice
                              : (
                                  product?.perUnitPrice -
                                  (product?.perUnitPrice * discount) / 100
                                ).toFixed(2)}{" "}
                            <span className="text-xs text-neutral-500 font-normal dark:text-gray-500">
                              Per Unit
                            </span>
                          </h1>
                          <h1 className="text-xs flex flex-col text-neutral-500 mt-3 dark:text-gray-500">
                            Product By{" "}
                            <span className="text-lg text-neutral-700 font-medium dark:text-gray-300">
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

      {/* Pagination */}
      {products.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 px-4 py-2 disabled:cursor-not-allowed disabled:bg-neutral-400 dark:disabled:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages || 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-4 py-2 text-white rounded-xl font-medium transition-colors ${
                currentPage === index
                  ? "bg-neutral-600 dark:bg-neutral-600"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 px-4 py-2 disabled:bg-neutral-400 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
