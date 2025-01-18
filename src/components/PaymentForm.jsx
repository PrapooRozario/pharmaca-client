import useAxios from "@/hooks/useAxios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const PaymentForm = ({ totalCartPrice, user_email, user_name, products }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxios();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    setLoading(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: parseInt(totalCartPrice * 100),
      });

      const clientSecret = data?.clientSecret;
      if (!clientSecret) return;
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user_email,
            name: user_name,
          },
        },
      });

      console.log(paymentResult);
      if (paymentResult.paymentIntent.status === "succeeded") {
        axiosSecure
          .post("/products/payments", {
            username: user_name,
            email: user_email,
            transactionId: paymentResult?.paymentIntent?.id,
            productIds: products?.map((product) => product?.productId),
            totalAmount: totalCartPrice,
            status: "pending",
          })
          .then(() => {
            toast({
              title: "Success",
              description: "Payment successfully! Thanks for purchasing.",
              action: <ToastAction altText="Payment complete.">Ok</ToastAction>,
            });
          });
        navigate("/payment/invoice", {
          state: {
            transactionId: paymentResult?.paymentIntent?.id,
            totalAmount: totalCartPrice,
            products: products,
            user_email,
            user_name,
            createdAt: paymentResult?.paymentIntent?.created,
          },
        });
      }
    } catch {
      toast({
        title: "Error",

        variant: "destructive",
        description: "Something went wrong! Please try again.",
        action: <ToastAction altText="Error">Ok</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-200 mx-auto p-8 rounded-xl"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          type="submit"
          disabled={!stripe || loading}
          className={`${buttonVariants({ variant: "primary" })} w-full mt-4`}
        >
          {loading ? "Processing..." : `Pay  $${totalCartPrice}`}
        </Button>
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
  totalCartPrice: PropTypes.number,
  user_email: PropTypes.string,
  user_name: PropTypes.string,
  products: PropTypes.object,
};

export default PaymentForm;
