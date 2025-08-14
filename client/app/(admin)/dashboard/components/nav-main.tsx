"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  // Helper to check if an item or any subitem matches the current URL
  const isActive = (item: (typeof items)[number]) => {
    if (item.url === pathname) return true;
    if (item.items) {
      return item.items.some((sub) => sub.url === pathname);
    }
    return false;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Deshora Management</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isActive(item)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {!item.items ? (
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-2  ${
                    isActive(item)
                      ? "bg-primary hover:bg-primary text-white hover:text-white"
                      : "hover:border hover:border-red-500"
                  }`}
                >
                  {item.icon && <item.icon />}
                  <Link href={item.url} className="  w-full">
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`flex items-center gap-2`}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`${
                              pathname === subItem.url
                                ? "bg-primary hover:bg-primary text-white hover:text-white"
                                : "hover:border hover:border-red-500"
                            }`}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
