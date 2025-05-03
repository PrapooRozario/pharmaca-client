import PaymentForm from "@/components/PaymentForm";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);

const Checkout = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxios();

  const { data: totalCartPrice = 0 } = useQuery({
    queryKey: ["totalCartPrice"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/carts?email=${user?.email}`);
      return res.data?.totalCartPrice;
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/carts?email=${user?.email}`);
      return res.data?.allProducts;
    },
  });

  return (
    <div className="flex md:flex-row flex-col-reverse items-start justify-center my-10 px-4 dark:text-white min-h-screen">
      <Helmet>
        <title>Pharmaca | Checkout</title>
      </Helmet>

      <div className="flex-1 md:mt-0 mt-6">
        <h1 className="text-3xl font-semibold mb-6 dark:text-white">
          {products?.length} Products
        </h1>

        <div className="space-y-6">
          {products?.map((product) => (
            <div
              key={product?._id}
              className="flex items-center w-full bg-[#FEF5EC] dark:bg-neutral-900/50 rounded-xl p-4"
            >
              <div className="w-1/4 shrink-0">
                <img
                  src={product?.itemImage}
                  alt={product?.itemName}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>

              <div className="flex-1 ml-4">
                <h1 className="text-xl font-medium mb-3 dark:text-white">
                  {product?.itemName}
                </h1>
                <span className="text-2xl font-semibold text-[#1E6BFF] dark:text-blue-400">
                  ${product?.perUnitPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-6 md:mt-0">
        <Elements stripe={stripePromise}>
          <PaymentForm
            totalCartPrice={totalCartPrice}
            user_email={user?.email}
            user_name={user?.displayName}
            products={products}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
