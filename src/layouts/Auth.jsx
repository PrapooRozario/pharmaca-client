import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="font-montserrat container w-4/5 mx-auto">
      <Outlet></Outlet>
      <Toaster></Toaster>
    </div>
  );
};

export default Auth;
