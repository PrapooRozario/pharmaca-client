import { Button, buttonVariants } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="tracking-widest text-gray-500 uppercase">
        404 | Not Found
      </h1>
      <Button
        onClick={() => window.history.back()}
        className={`${buttonVariants({ variant: "primary", size: "sm" })} mt-4`}
      >
        Go Back
      </Button>
    </div>
  );
};

export default ErrorPage;
