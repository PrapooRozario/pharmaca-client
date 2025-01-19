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
      console.log(res.data);
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

  const handelRemove = (_id) => {
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

  const handelRemoveAll = () => {
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
          <DialogContent>
            <h1 className="text-center font-semibold text-2xl">
              Do You Want to Remove All Carts?
            </h1>
            <p className="text-center text-sm text-neutral-600">
              This action cannot be undone. Please confirm.
            </p>
            <div className="flex justify-between mt-6">
              <DialogClose>
                <Button
                  onClick={() => handelRemoveAll()}
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
      {!products?.length && !isLoading ? (
        <div className="absolute top-[45%] z-10 right-[20%] left-[20%] flex justify-center items-center">
          <h1 className="md:text-2xl text-center text-lg font-medium">
            Oops! You don&apos;t have any products in your cart.
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
      <Table className="w-full overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product?._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product?.itemName}</TableCell>
              <TableCell>{product?.company}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    disabled={product?.quantity === 1}
                    onClick={() =>
                      product?.quantity > 1 && decQuantity(product?._id)
                    }
                  >
                    <Minus className="w-4 cursor-pointer text-neutral-600 hover:text-black transition duration-200"></Minus>
                  </button>
                  {product?.quantity}

                  <button
                    onClick={() =>
                      product?.quantity <= 100 && incQuantity(product?._id)
                    }
                    disabled={product?.quantity === 100}
                  >
                    <Plus className="w-4 cursor-pointer text-neutral-600 hover:text-black transition duration-200"></Plus>
                  </button>
                </div>
              </TableCell>
              <TableCell>${product?.totalPrice}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3 justify-end">
                  {/* Flex container for buttons */}
                  <Button
                    onClick={() => handelRemove(product?._id)}
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

export default Cart;
