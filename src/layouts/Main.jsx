import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="pt-6 mx-auto container w-4/5 font-montserrat">
      <Navbar></Navbar>
      <main className="min-h-[calc(100vh-257px)]">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Main;
