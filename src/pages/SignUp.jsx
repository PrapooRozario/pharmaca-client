import { Button, buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { Field, Input, Label } from "@headlessui/react";
import axios from "axios";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
const SignUp = () => {
  const { signup, google, setUser, updateUser } = useAuth();
  const { register, handleSubmit, formState } = useForm(); // Initialize form handling
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState(null);
  const handleSignUp = (data) => {
    const image = data?.photo[0];
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=8e369a2647315bf7a367154ce8609b1f",
        { image },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => setPhotoURL(res?.data?.data?.display_url))
      .catch((err) => console.log(err));
    if (!photoURL) return;
    signup(data?.email, data?.password)
      .then((user) => {
        setUser(user.user),
          updateUser(data?.username, photoURL),
          toast({
            title: "Success",
            description: "Signup successful! Welcome to pharmaca.",
            action: <ToastAction altText="Sign up complete.">Ok</ToastAction>,
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
          onSubmit={handleSubmit(handleSignUp)} // Handle form submit
        >
          {/* Username Field */}
          <Field>
            <Label className="font-medium">Username</Label>
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
                  bg-neutral-200 py-3 px-4 text-sm/6 text-black`,
                `focus:outline-none data-[focus]:outline-1 placeholder-neutral-400 data-[focus]:-outline-offset-2`
              )}
            />
            <p className="text-sm text-[#F72B2B] mt-2">
              {formState?.errors?.username?.message}{" "}
              {/* Display username error message */}
            </p>
          </Field>
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
          {/* Photo Field */}
          <Field>
            <Label className="font-medium">Photo</Label>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                {...register("photo", {
                  required: "Please upload your photo.", // Photo is required
                })}
                type="file"
                accept="image/*" // Accept only image files
                className="block mt-2 w-full text-sm text-neutral-400
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-[#1E6BFF] file:text-white
        hover:file:bg-[#1158db]
        file:cursor-pointer
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400"
              />
            </label>
            {
              <p className="text-sm text-[#F72B2B] mt-2">
                {formState?.errors?.photo?.message}{" "}
                {/* Display photo error message */}
              </p>
            }
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
          {/* Role Selection (Radio Buttons) */}
          <div className="grid sm:grid-cols-2 gap-2">
            <label
              htmlFor="user"
              className="flex items-center gap-2 border py-3 pl-4 rounded-lg cursor-pointer hover:border-[#1e6dff3a] transition duration-200"
            >
              <input
                id="user"
                type="radio"
                value="user"
                {...register("role")} // Role selection (user)
                defaultChecked
              />
              <p>User</p>
            </label>
            <label
              htmlFor="seller"
              className="flex items-center gap-2 border py-3 pl-4 rounded-lg cursor-pointer hover:border-[#1e6dff3a] transition duration-200"
            >
              <input
                id="seller"
                type="radio"
                value="seller"
                {...register("role")} // Role selection (seller)
              />
              <p>Seller</p>
            </label>
          </div>
          {/* Submit Button */}
          <Button className={buttonVariants({ variant: "form" })}>
            Sign Up
          </Button>
          <hr /> {/* Horizontal Line */}
          {/* Google Sign-Up Button */}
          <button
            onClick={() =>
              google()
                .then((user) => {
                  setUser(user?.user),
                    toast({
                      title: "Success",
                      description:
                        "Signup successful! Welcome to pharmaca.",
                      action: (
                        <ToastAction altText="Signup complete.">Ok</ToastAction>
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
            type="button"
            className="flex items-center gap-4 border rounded-lg px-6 py-2 font-medium w-full justify-center"
          >
            <FcGoogle className="text-3xl"></FcGoogle>Sign Up with Google
          </button>
          <div className="text-center">
            <p>
              Already Have an Account?{" "}
              <Link to="/auth/login" className="text-[#1158DB]">
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
