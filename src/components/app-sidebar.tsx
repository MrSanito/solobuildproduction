"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Package,
  Factory,
  Cpu,
  Truck,
  Bell,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Production",
      url: "/production",
      icon: Factory,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: Package,
    },
    {
      title: "Machines",
      url: "/machines",
      icon: Cpu,
    },
    {
      title: "Labour",
      url: "/labour",
      icon: Users,
    },
    {
      title: "Vendors",
      url: "/vendors",
      icon: Truck,
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: Bell,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-border/40">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden">
          <div className="size-8 min-w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 truncate">Manufacture</span>
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex size-8 rounded-lg bg-blue-600 items-center justify-center">
             <span className="text-white font-bold">M</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-4 gap-1">
          {data.navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={`transition-all duration-200 h-10 px-3 ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Link href={item.url} className="flex items-center gap-3 w-full h-full">
                    {item.icon && (
                      <item.icon 
                        className={`size-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} 
                      />
                    )}
                    <span className="font-medium whitespace-nowrap overflow-hidden truncate">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/40">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center overflow-hidden">
          <div className="avatar placeholder shrink-0">
            <div className="bg-blue-100 text-blue-600 rounded-full w-9 h-9 text-sm font-bold flex items-center justify-center">
              SJ
            </div>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden min-w-0">
            <span className="text-sm font-bold text-slate-800 leading-tight truncate">Sarah Johnson</span>
            <span className="text-xs text-slate-400 truncate">Production Manager</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
