import DashboardNavbar from "@/components/DashboardNavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="font-montserrat">
      <SidebarProvider>
        <DashboardNavbar></DashboardNavbar>
        <SidebarTrigger></SidebarTrigger>
        <main className="container py-4 md:px-14 mx-auto">
          <Outlet></Outlet>
          <Toaster></Toaster>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
