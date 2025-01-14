import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className="pt-6 mx-auto container w-4/5 font-montserrat">
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Main;
