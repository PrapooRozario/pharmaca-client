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
    <div className=" dark:text-white min-h-screen">
      <Helmet>
        <title> Pharmaca | Login</title>
      </Helmet>
      <div>
        {/* Back Button */}
        <Button
          className={`${buttonVariants({
            variant: "primary",
          })} fixed top-6 dark:bg-blue-600 dark:hover:bg-blue-700`}
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
              <Label className="font-medium dark:text-neutral-200">Email</Label>
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
                  } border-none bg-neutral-200 dark:bg-neutral-800 py-3 px-4 text-sm/6 text-black dark:text-white`,
                  "focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 dark:placeholder-neutral-500 data-[focus]:-outline-offset-2"
                )}
              />
              <p className="text-sm text-[#F72B2B] dark:text-red-400 mt-2">
                {formState?.errors?.email?.message}{" "}
                {/* Display email error message */}
              </p>
            </Field>
            {/* Password Field */}
            <Field>
              <Label className="font-medium dark:text-neutral-200">
                Password
              </Label>
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
                  } border-none bg-neutral-200 dark:bg-neutral-800 py-3 px-4 text-sm/6 text-black dark:text-white`,
                  "focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 dark:placeholder-neutral-500 data-[focus]:-outline-offset-2"
                )}
              />
              <p className="text-sm text-[#F72B2B] dark:text-red-400 mt-2">
                {formState?.errors?.password?.message}{" "}
                {/* Display password error message */}
              </p>
            </Field>
            {/* Submit Button */}
            <Button
              className={`${buttonVariants({
                variant: "form",
              })} dark:bg-blue-600 dark:hover:bg-blue-700`}
            >
              Login
            </Button>
            <hr className="dark:border-neutral-700" /> {/* Horizontal Line */}
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
              className="flex items-center gap-4 border rounded-lg px-6 py-2 font-medium w-full justify-center dark:border-neutral-700"
            >
              <FcGoogle className="text-3xl"></FcGoogle>
              <span className="dark:text-neutral-300">Login with Google</span>
            </button>
            <div className="text-center">
              <p className="dark:text-neutral-400">
                Don't Have an Account?{" "}
                <Link
                  to="/auth/signup"
                  className="text-[#1158DB] dark:text-blue-500"
                >
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
