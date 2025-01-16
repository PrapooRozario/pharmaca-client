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
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const Shop = () => {
  const [axiosSecure] = useAxios(); // Custom hook for secure axios instance
  const [discount, setDiscount] = useState(0); // State to track discount
  const [currentPage, setCurrentPage] = useState(2);
  const { data: products = [] } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?limit=${itemsPerPage}&skip=${currentPage * itemsPerPage}`
      );
      return res.data; // Return fetched product data
    },
  });
  const { data: totalProducts = [] } = useQuery({
    queryKey: ["totalProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/total`);
      return res.data; // Return fetched product data
    },
  });
  const itemsPerPage = 10;
  const totalItems = totalProducts?.total || 0;
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 0;
  console.log(currentPage, totalPages, totalItems);
  return (
    <div className="my-10 px-4 md:px-6 lg:px-8">
      <Table className="w-full overflow-x-auto">
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
                  <Button className={buttonVariants({ variant: "primary" })}>
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
      <div className="flex items-center gap-2 text-sm justify-center mt-6">
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="bg-[#1158dbe7] px-4 py-2 disabled:cursor-not-allowed disabled:bg-neutral-400 text-white rounded-xl font-medium cursor-pointer"
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`bg-[#1158dbe7] px-4 py-2 text-white rounded-xl font-medium cursor-pointer ${
              currentPage === index && "bg-neutral-600"
            }`}
          >
            {index + 1}
          </div>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="bg-[#1158dbe7] px-4 py-2 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-xl font-medium cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;
