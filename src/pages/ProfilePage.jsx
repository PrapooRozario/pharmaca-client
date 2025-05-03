import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { Field, Input, Label } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
const UpdateProfile = () => {
  const { user, updateUser } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      username: user?.displayName,
      email: user?.email,
    },
  });
  const [loading, setLoading] = useState(false);
  const [axiosPublic] = useAxios();
  const { data: dbUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  const handleUpdateProfile = async (data) => {
    try {
      setLoading(true);
      let photoURL = user?.photoURL;

      if (data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_UPLOAD_KEY
          }`,
          formData
        );
        photoURL = imgbbResponse.data.data.display_url;
      }

      await updateUser(data.username, photoURL);

      await axiosPublic.patch(`/users/${user.email}`, {
        username: data.username,
        photo: photoURL,
      });

      toast({
        title: "Success",
        description: "Profile updated successfully!",
        action: <ToastAction altText="Profile updated">Ok</ToastAction>,
      });
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error?.message || "Failed to update profile",
        action: <ToastAction altText="Error">Ok</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 min-h-screen">
      <Helmet>
        <title>Pharmaca | Update Profile</title>
      </Helmet>
      <div>
        <h1 className="text-4xl mb-10 font-semibold text-center dark:text-white">
          Update Your Profile
        </h1>
      </div>
      <div>
        <form
          className="lg:w-2/5 md:w-3/5 sm:w-2/3 space-y-6 mx-auto"
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div className="flex justify-center mb-6">
            <Avatar className="cursor-pointer w-20 h-20">
              <AvatarImage
                src={user?.photoURL}
                alt={user?.displayName}
                className="dark:border dark:border-neutral-700"
              />
              <AvatarFallback className="dark:bg-neutral-800 dark:text-white">
                {user?.displayName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <Field>
            <Label className="font-medium dark:text-neutral-200">Photo</Label>
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="block mt-2 w-full text-sm text-neutral-400 dark:text-neutral-500
          file:me-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-[#1E6BFF] dark:file:bg-blue-600 file:text-white
          hover:file:bg-[#1158db] dark:hover:file:bg-blue-700
          dark:file:hover:bg-blue-700"
            />
          </Field>

          <Field>
            <Label className="font-medium dark:text-neutral-200">
              Username
            </Label>
            <Input
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 30, message: "Maximum 30 characters" },
              })}
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-neutral-200 dark:bg-neutral-800 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600",
                {
                  "outline-red-500 dark:outline-red-400":
                    formState.errors.username,
                }
              )}
            />
            {formState.errors.username && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                {formState.errors.username.message}
              </p>
            )}
          </Field>

          <Field>
            <Label className="font-medium dark:text-neutral-200">Email</Label>
            <Input
              {...register("email")}
              disabled
              className="mt-2 block w-full rounded-lg border-none bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-3 px-4 opacity-60 cursor-not-allowed"
            />
          </Field>

          <Field>
            <Label className="font-medium dark:text-neutral-200">Role</Label>
            <Input
              {...register("role")}
              disabled
              value={
                dbUser?.role?.charAt(0).toUpperCase() +
                  dbUser?.role?.slice(1) || "N/A"
              }
              className="mt-2 block w-full rounded-lg border-none bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 py-3 px-4 opacity-60 cursor-not-allowed"
            />
          </Field>

          <Button
            type="submit"
            className={`${buttonVariants({
              variant: "primary",
            })} dark:bg-blue-600 dark:hover:bg-blue-700 w-full`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </span>
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
