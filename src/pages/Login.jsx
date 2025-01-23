import { Button, buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { Field, Input } from "@headlessui/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { login, setUser, google } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (data) => {
    login(data?.email, data?.password)
      .then((user) => {
        setUser(user?.user),
          toast({
            title: "Success",
            description: "Login successful! Welcome back to pharmaca.",
            action: <ToastAction altText="Login complete.">Ok</ToastAction>,
          });
      })
      .catch((err) => {
        toast({
          title: "Error",

          variant: "destructive",
          description: err?.code,
          action: <ToastAction altText="Error">Ok</ToastAction>,
        });
      });
  };
  return (
    <div>
      <Helmet>
        <title> Pharmaca | Login</title>
      </Helmet>
      <div>
        {/* Back Button */}
        <Button
          className={`${buttonVariants({ variant: "primary" })} fixed top-6 `}
          onClick={() => navigate("/")} // Navigate back
        >
          <ArrowLeft></ArrowLeft> Go Back
        </Button>
        <div>
          {/* Form */}
          <form
            className="lg:w-2/5 md:w-3/5 sm:w-2/3 mx-auto space-y-6 my-20"
            onSubmit={handleSubmit(handleLogin)} // Handle form submit
          >
            {/* Email Field */}
            <Field>
              <Label className="font-medium">Email</Label>
              <Input
                placeholder="Email"
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                className={clsx(
                  `mt-2 block w-full rounded-lg ${
                    formState?.errors?.email
                      ? "data-[focus]:outline-[#F72B2B]"
                      : "data-[focus]:outline-neutral-300"
                  } border-none bg-neutral-200 py-3 px-4 text-sm/6 text-black`,
                  "focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-300"
                )}
              />
              <p className="text-sm text-[#F72B2B] mt-2">
                {formState?.errors?.email?.message}{" "}
                {/* Display email error message */}
              </p>
            </Field>
            {/* Password Field */}
            <Field>
              <Label className="font-medium">Password</Label>
              <Input
                placeholder="Password"
                {...register("password", {
                  required: "Please enter your password.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
                  },
                })}
                className={clsx(
                  `mt-2 block w-full rounded-lg ${
                    formState?.errors?.password
                      ? "data-[focus]:outline-[#F72B2B]"
                      : "data-[focus]:outline-neutral-300"
                  } border-none bg-neutral-200 py-3 px-4 text-sm/6 text-black`,
                  "focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-300"
                )}
              />
              <p className="text-sm text-[#F72B2B] mt-2">
                {formState?.errors?.password?.message}{" "}
                {/* Display password error message */}
              </p>
            </Field>
            {/* Submit Button */}
            <Button className={buttonVariants({ variant: "form" })}>
              Login
            </Button>
            <hr /> {/* Horizontal Line */}
            {/* Google Login Button */}
            <button
              type="button"
              onClick={() =>
                google()
                  .then((user) => {
                    setUser(user?.user),
                      toast({
                        title: "Success",
                        description:
                          "Login successful! Welcome back to pharmaca.",
                        action: (
                          <ToastAction altText="Login complete.">
                            Ok
                          </ToastAction>
                        ),
                      });
                  })
                  .catch((err) => {
                    toast({
                      title: "Error",

                      variant: "destructive",
                      description: err?.code,
                      action: <ToastAction altText="Error">Ok</ToastAction>,
                    });
                  })
              }
              className="flex items-center gap-4 border rounded-lg px-6 py-2 font-medium w-full justify-center"
            >
              <FcGoogle className="text-3xl"></FcGoogle>Login with Google
            </button>
            <div className="text-center">
              <p>
                Don't Have an Account?{" "}
                <Link to="/auth/signup" className="text-[#1158DB]">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
