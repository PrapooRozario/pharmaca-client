import { Button, buttonVariants } from "@/components/ui/button";
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
import { Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";

const Cart = () => {
  const [axiosSecure] = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: products,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/carts?email=${user?.email}`);
      return res.data?.allProducts || [];
    },
  });
  const incQuantity = async (_id) => {
    await axiosSecure.put(`/products/cart/${_id}?email=${user?.email}`, {
      quantity: 1,
    });

    refetch();
  };

  const decQuantity = async (_id) => {
    await axiosSecure.put(`/products/cart/${_id}?email=${user?.email}`, {
      quantity: -1,
    });

    refetch();
  };

  const handleRemove = (_id) => {
    axiosSecure
      .delete(`/products/carts/${_id}?email=${user?.email}`)
      .then(() => {
        refetch();
        toast({
          title: "Success",
          description: "Product removed from your cart.",
          action: <ToastAction altText="Remove complete.">Ok</ToastAction>,
        });
      })
      .catch((err) =>
        toast({
          title: "Error",

          variant: "destructive",
          description: err?.code,
          action: <ToastAction altText="Error">Ok</ToastAction>,
        })
      );
  };

  const handleRemoveAll = () => {
    axiosSecure
      .delete(`/products/carts?email=${user?.email}`)
      .then(() => {
        refetch(),
          toast({
            title: "Success",
            description: "All Products removed from your cart.",
            action: <ToastAction altText="Sign up complete.">Ok</ToastAction>,
          });
      })
      .catch((err) =>
        toast({
          title: "Error",

          variant: "destructive",
          description: err?.code,
          action: <ToastAction altText="Error">Ok</ToastAction>,
        })
      );
  };
  return (
    <div className="my-10 px-4 md:px-6 lg:px-8">
      <div className="flex justify-end gap-3 mb-6">
      <Dialog>
        <DialogTrigger disabled={products?.length === 0}>
        <Button
          disabled={products?.length === 0}
          className={buttonVariants({ variant: "destructive" })}
        >
          Remove All
        </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md mx-auto p-6">
        <h1 className="text-center font-semibold text-xl md:text-2xl mb-2">
          Do You Want to Remove All Carts?
        </h1>
        <p className="text-center text-sm text-neutral-600 mb-4">
          This action cannot be undone. Please confirm.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <DialogClose>
          <Button
            onClick={() => handleRemoveAll()}
            className={buttonVariants({ variant: "destructive" })}
          >
            Remove All
          </Button>
          </DialogClose>
          <DialogClose>
          <Button className={buttonVariants({ variant: "primary" })}>
            Cancel
          </Button>
          </DialogClose>
        </div>
        </DialogContent>
      </Dialog>
      <Button
        disabled={products?.length === 0}
        onClick={() => navigate("/checkout")}
        className={buttonVariants({ variant: "success" })}
      >
        Checkout
      </Button>
      </div>
      
      <div className="relative overflow-x-auto">
      {!products?.length && !isLoading ? (
        <div className="py-16 text-center">
        <h1 className="text-lg md:text-2xl font-medium">
          Oops! You don&apos;t have any products in your cart.
        </h1>
        </div>
      ) : null}
      
      {isError && (
        <div className="py-16 text-center">
        <h1 className="text-lg md:text-2xl font-medium">
          Oops! Something went wrong.
        </h1>
        </div>
      )}
      
      {isLoading ? (
        <div className="py-16 flex justify-center">
        <div className="spinner"></div>
        </div>
      ) : (
        <Table>
        <TableHeader>
          <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="w-[120px]">Quantity</TableHead>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead className="text-right w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
          <TableRow key={product?._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="max-w-[200px] truncate">{product?.itemName}</TableCell>
            <TableCell className="max-w-[150px] truncate">{product?.company}</TableCell>
            <TableCell>
            <div className="flex items-center gap-2">
              <button
              disabled={product?.quantity === 1}
              onClick={() => product?.quantity > 1 && decQuantity(product?._id)}
              className="disabled:opacity-50"
              >
              <Minus className="w-4 cursor-pointer text-neutral-600 hover:text-black transition duration-200" />
              </button>
              <span className="min-w-[20px] text-center">{product?.quantity}</span>
              <button
              onClick={() => product?.quantity <= 100 && incQuantity(product?._id)}
              disabled={product?.quantity === 100}
              className="disabled:opacity-50"
              >
              <Plus className="w-4 cursor-pointer text-neutral-600 hover:text-black transition duration-200" />
              </button>
            </div>
            </TableCell>
            <TableCell>${product?.totalPrice}</TableCell>
            <TableCell className="text-right">
            <Button
              onClick={() => handleRemove(product?._id)}
              className={buttonVariants({ variant: "destructive" })}
            >
              Remove
            </Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
        </Table>
      )}
      </div>
    </div>
    );
};

export default Cart;
