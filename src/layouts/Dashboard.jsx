import DashboardNavbar from "@/components/DashboardNavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="font-montserrat">
      <SidebarProvider>
        <DashboardNavbar></DashboardNavbar>
        <SidebarTrigger></SidebarTrigger>
        <main className="container mx-auto">
          <Outlet></Outlet>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
