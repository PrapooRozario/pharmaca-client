import { Button, buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { Field, Input, Label } from "@headlessui/react";
import axios from "axios";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
const SignUp = () => {
  const { signup, google, setUser, updateUser } = useAuth();
  const { register, handleSubmit, formState } = useForm(); // Initialize form handling
  const navigate = useNavigate();
  const { state } = useLocation();
  const [photoURL, setPhotoURL] = useState(null);
  const [axiosPublic] = useAxios();
  const handleSignUp = (data) => {
    const image = data?.photo[0];
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD_KEY
        }`,
        { image },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => setPhotoURL(res?.data?.data?.display_url));
    if (!photoURL) return;
    signup(data?.email, data?.password)
      .then((user) => {
        setUser(user.user),
          updateUser(data?.username, photoURL),
          axiosPublic.post("/users", {
            username: data?.username,
            email: data?.email,
            photo: photoURL,
            role: data?.role,
          });
        toast({
          title: "Success",
          description: "Signup successful! Welcome to pharmaca.",
          action: <ToastAction altText="Sign up complete.">Ok</ToastAction>,
        });
        navigate(state ? state : "/");
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
        <title> Pharmaca | Sign Up</title>
      </Helmet>
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
          onSubmit={handleSubmit(handleSignUp)} // Handle form submit
        >
          {/* Username Field */}
          <Field>
            <Label className="font-medium dark:text-neutral-200">
              Username
            </Label>
            <Input
              placeholder="Username"
              {...register("username", {
                required: "Please enter your username.",
                maxLength: {
                  value: 30,
                  message: "Username cannot exceed 30 characters.",
                },
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long.",
                },
              })}
              className={clsx(
                `mt-2 block w-full rounded-lg border-none
               ${
                 formState?.errors?.username
                   ? "data-[focus]:outline-[#F72B2B]"
                   : "data-[focus]:outline-neutral-300"
               }
                bg-neutral-200 dark:bg-neutral-800 py-3 px-4 text-sm/6 text-black dark:text-white`,
                `focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 dark:placeholder-neutral-500 data-[focus]:-outline-offset-2`
              )}
            />
            <p className="text-sm text-[#F72B2B] dark:text-red-400 mt-2">
              {formState?.errors?.username?.message}{" "}
              {/* Display username error message */}
            </p>
          </Field>
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
          {/* Photo Field */}
          <Field>
            <Label className="font-medium dark:text-neutral-200">Photo</Label>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                {...register("photo", {
                  required: "Please upload your photo.", // Photo is required
                })}
                type="file"
                accept="image/*" // Accept only image files
                className="block mt-2 w-full text-sm text-neutral-400 dark:text-neutral-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-[#1E6BFF] dark:file:bg-blue-600 file:text-white
        hover:file:bg-[#1158db] dark:hover:file:bg-blue-700
        file:cursor-pointer
        file:disabled:opacity-50 file:disabled:pointer-events-none"
              />
            </label>
            {
              <p className="text-sm text-[#F72B2B] dark:text-red-400 mt-2">
                {formState?.errors?.photo?.message}{" "}
                {/* Display photo error message */}
              </p>
            }
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
          {/* Role Selection (Radio Buttons) */}
          <div className="grid sm:grid-cols-2 gap-2">
            <label
              htmlFor="user"
              className="flex items-center gap-2 border py-3 pl-4 rounded-lg cursor-pointer hover:border-[#1e6dff3a] dark:hover:border-blue-800 transition duration-200 dark:border-neutral-700"
            >
              <input
                id="user"
                type="radio"
                value="user"
                {...register("role")} // Role selection (user)
                defaultChecked
                className="dark:accent-blue-500"
              />
              <p className="dark:text-neutral-300">User</p>
            </label>
            <label
              htmlFor="seller"
              className="flex items-center gap-2 border py-3 pl-4 rounded-lg cursor-pointer hover:border-[#1e6dff3a] dark:hover:border-blue-800 transition duration-200 dark:border-neutral-700"
            >
              <input
                id="seller"
                type="radio"
                value="seller"
                {...register("role")} // Role selection (seller)
                className="dark:accent-blue-500"
              />
              <p className="dark:text-neutral-300">Seller</p>
            </label>
          </div>
          {/* Submit Button */}
          <Button
            className={`${buttonVariants({
              variant: "form",
            })} dark:bg-blue-600 dark:hover:bg-blue-700`}
          >
            Sign Up
          </Button>
          <hr className="dark:border-neutral-700" /> {/* Horizontal Line */}
          {/* Google Sign-Up Button */}
          <button
            onClick={() =>
              google()
                .then((user) => {
                  setUser(user?.user),
                    axiosPublic.post("/users", {
                      username: user?.user?.displayName,
                      email: user?.user?.email,
                      photo: user?.user?.photoURL,
                      role: "user",
                    });
                  toast({
                    title: "Success",
                    description: "Signup successful! Welcome to pharmaca.",
                    action: (
                      <ToastAction altText="Signup complete.">Ok</ToastAction>
                    ),
                  });
                  navigate(state ? state : "/");
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
            type="button"
            className="flex items-center gap-4 border rounded-lg px-6 py-2 font-medium w-full justify-center dark:border-neutral-700"
          >
            <FcGoogle className="text-3xl"></FcGoogle>
            <span className="dark:text-neutral-300">Sign Up with Google</span>
          </button>
          <div className="text-center">
            <p className="dark:text-neutral-400">
              Already Have an Account?{" "}
              <Link
                to="/auth/login"
                className="text-[#1158DB] dark:text-blue-500"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
