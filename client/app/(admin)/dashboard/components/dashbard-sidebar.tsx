"use client";

import * as React from "react";

import { NavMain } from "@/app/(admin)/dashboard/components/nav-main";
import { NavUser } from "@/app/(admin)/dashboard/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Image,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  ChartBar,
  Users,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },

  navMain: [
    {
      title: "Anlytics",
      url: "/dashboard",
      icon: ChartBar, // 📦 Products
    },
    {
      title: "Product",
      url: "#",
      icon: Package, // 📦 Products
      items: [
        {
          title: "All Products",
          url: "/dashboard/all-products",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: Tags, // 🏷 Categories
      items: [
        {
          title: "All Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart, // 🛒 Orders
      items: [
        {
          title: "Order List",
          url: "#",
        },
      ],
    },
    {
      title: "Banners",
      url: "#",
      icon: Image, // 🖼 Promotional banners
      items: [
        {
          title: "Manage Banners",
          url: "#",
        },
      ],
    },
    {
      title: "User",
      url: "#",
      icon: Users, // 👥 Customers/Users
      items: [
        {
          title: "User List",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings, // ⚙ General settings
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
};
export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
