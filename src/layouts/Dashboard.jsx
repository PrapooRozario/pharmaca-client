import DashboardNavbar from "@/components/DashboardNavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router";

const Dashboard = () => {
  const { loader } = useAuth();
  return (
    <div className="font-montserrat">
      {loader ? (
        <div className="h-screen absolute right-[20%] left-[20%] flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <SidebarProvider>
          <DashboardNavbar></DashboardNavbar>
          <SidebarTrigger></SidebarTrigger>
          <main className="container py-4 md:px-14 mx-auto">
            <Outlet></Outlet>
            <Toaster></Toaster>
          </main>
        </SidebarProvider>
      )}
    </div>
  );
};

export default Dashboard;
