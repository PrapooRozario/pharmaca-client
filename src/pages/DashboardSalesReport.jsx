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
import { Helmet } from "react-helmet";
const DashboardSalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [axiosSecure] = useAxios();
  const {
    data: sales = [],
    isError,
    isLoading,
  } = useQuery({
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
      <Helmet>
        <title> Pharmaca | Sales Report</title>
      </Helmet>
      {!sales.length && !isLoading ? (
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
      <div className="mb-6 flex flex-wrap items-center gap-4 sm:gap-6">
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2 border px-3 sm:px-4 rounded-xl py-2 sm:py-3">
              <Calendar className="text-neutral-600 h-4 w-4 sm:h-5 sm:w-5" />
              {startDate || endDate ? (
                <p className="text-xs sm:text-sm text-neutral-600">
                  {`${moment(startDate).format("L")} - ${moment(endDate).format(
                    "L"
                  )}`}
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-neutral-600">
                  Pick a date
                </p>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </PopoverContent>
        </Popover>
        <CSVLink data={csvData}>
          <Button className={buttonVariants({ variant: "primary" })}>
            <Download name="Sales Report" className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </CSVLink>
      </div>
      <div className="w-full overflow-x-auto"></div>
      <Table className="min-w-full min-h-[calc(100vh-500px)]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
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
              <TableCell className="w-16">{idx + 1}</TableCell>
              <TableCell className="font-medium">
                {sale?.product?.itemName}
              </TableCell>
              <TableCell>{sale?.product?.email}</TableCell>
              <TableCell>{sale?.email}</TableCell>
              <TableCell className="text-right">
                ${sale?.productPrice}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-lg ${
                    sale?.status === "pending"
                      ? "text-yellow-600 bg-yellow-100"
                      : "text-green-600 bg-green-100"
                  }`}
                >
                  {sale?.status?.charAt(0)?.toUpperCase() +
                    sale?.status?.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardSalesReport;
