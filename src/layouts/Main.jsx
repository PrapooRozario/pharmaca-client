import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router";

const Main = () => {
  const { loader } = useAuth();
  return (
    <div className="pt-6 mx-auto container w-4/5 font-montserrat">
      {loader ? (
        <div className="h-screen absolute right-[20%] left-[20%] flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <Navbar></Navbar>
          <main className="min-h-[calc(100vh-257px)]">
            <Outlet></Outlet>
            <Toaster></Toaster>
          </main>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default Main;
