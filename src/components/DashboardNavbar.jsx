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
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import {
  Boxes,
  ChartNoAxesCombined,
  CreditCard,
  GalleryThumbnails,
  Home,
  Hospital,
  Users,
} from "lucide-react";
import { Link, NavLink } from "react-router";

export default function DashboardNavbar() {
  const [axiosSecure] = useAxios();
  const { user } = useAuth();
  const { data: admin } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/${user?.email}`);
      return res.data;
    },
  });
  const { data: seller } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/${user?.email}`);
      return res.data;
    },
  });

  const adminItems = [
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

  const sellerItems = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Manage Medicines",
      url: "/dashboard/manage-medicines",
      icon: Hospital,
    },
    {
      title: "Payment History",
      url: "/dashboard/payment-history",
      icon: CreditCard,
    },
    {
      title: "Ask For Advertisement",
      url: "/dashboard/advertisement",
      icon: GalleryThumbnails,
    },
  ];

  const userItems = [
    {
      title: "Payment History",
      url: "/dashboard/payment-history",
      icon: CreditCard,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <Link to="/">
              <img src="/pharmaca.svg" alt="pharmaca" className="w-4/5" />
            </Link>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {(admin?.admin
                ? adminItems
                : seller?.seller
                ? sellerItems
                : userItems
              ).map((item) => (
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
