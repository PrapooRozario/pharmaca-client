import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Boxes,
  ChartNoAxesCombined,
  CreditCard,
  GalleryThumbnails,
  Home,
  Users,
} from "lucide-react";
import { NavLink } from "react-router";

export default function DashboardNavbar() {
  const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Manage Users",
      url: "/dashboard/manage-users",
      icon: Users,
    },
    {
      title: "Manage Category",
      url: "/dashboard/manage-category",
      icon: Boxes,
    },
    {
      title: "Payment Management",
      url: "/dashboard/payment-management",
      icon: CreditCard,
    },
    {
      title: "Sales Report",
      url: "/dashboard/sales-report",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Manage Banner Advertise",
      url: "/dashboard/manage-banner",
      icon: GalleryThumbnails,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <img src="/pharmaca.svg" alt="pharmaca" className="w-4/5" />
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
