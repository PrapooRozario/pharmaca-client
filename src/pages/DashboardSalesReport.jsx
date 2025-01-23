import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRangePicker } from "react-date-range";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CSVLink } from "react-csv";
import moment from "moment";
const DashboardSalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [axiosSecure] = useAxios();
  const { data: sales = [] , isError, isLoading} = useQuery({
    queryKey: ["sales", startDate, endDate],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/sales?startDate=${startDate}&endDate=${endDate}`
      );
      return res.data;
    },
  });

  const csvData = sales.map((sale) => ({
    "Medicine Name": sale?.product?.itemName || "",
    "Seller Email": sale?.product?.email || "",
    "Buyer Email": sale?.email || "",
    "Total Price": sale?.productPrice || "",
    Status: sale?.status || "",
  }));

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const handleSelect = (date) => {
    setStartDate(date?.selection?.startDate);
    setEndDate(date?.selection?.endDate);
  };

  return (
    <div className="py-6">
      {!sales.length && !isLoading ? (
        <div className="absolute top-[56%] z-10 right-[20%] left-[20%] flex justify-center items-center">
          <h1 className="md:text-2xl text-center text-lg font-medium">
            Oops! We couldn’t find what you’re looking for.
          </h1>
        </div>
      ) : (
        ""
      )}
      {isError && (
        <div className="absolute top-[56%] z-10 right-[20%] left-[20%] flex justify-center items-center">
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
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2 border px-4 rounded-xl py-3">
              <Calendar className="text-neutral-600"></Calendar>
              {startDate || endDate ? (
                <p className="text-sm text-neutral-600">
                  {`${moment(startDate).format("L")} - ${moment(endDate).format(
                    "L"
                  )}`}
                </p>
              ) : (
                <p className="text-sm text-neutral-600">Pick a date</p>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </PopoverContent>
        </Popover>
        <CSVLink data={csvData}>
          <Button className={buttonVariants({ variant: "primary" })}>
            <Download></Download> Export CSV
          </Button>
        </CSVLink>
      </div>
      <Table className="w-full overflow-x-auto min-h-[calc(100vh-500px)]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">#</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Seller Email</TableHead>
            <TableHead>Buyer Email</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales?.map((sale, idx) => (
            <TableRow key={sale?._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-medium">
                {sale?.product?.itemName}
              </TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>{sale?.email}</TableCell>
              <TableCell className="text-right">
                ${sale?.productPrice}
              </TableCell>
              <TableCell className="flex justify-end">
                <div
                  className={
                    sale?.status === "pending"
                      ? "text-yellow-600 bg-yellow-100 text-xs rounded-lg w-fit py-1 px-2"
                      : "text-green-600 bg-green-100 text-xs rounded-lg w-fit py-1 px-2"
                  }
                >
                  {sale?.status?.charAt(0)?.toUpperCase() +
                    sale?.status?.slice(1)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardSalesReport;
