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
  useSidebar,
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
      badge: 5,
      badgeColor: "bg-red-500",
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
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-[#1a1d2e] border-r border-white/5"
    >
      {/* ── Header ── */}
      <SidebarHeader className="h-16 flex items-center px-5 border-b border-white/5">
        {/* Expanded */}
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden">
          <div className="size-9 min-w-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-900/40 shrink-0">
            <span className="text-white font-extrabold text-base tracking-tight">M</span>
          </div>
          <span className="font-extrabold text-sm tracking-widest uppercase text-white truncate">
            Manufacture
          </span>
        </div>
        {/* Collapsed */}
        <div className="hidden group-data-[collapsible=icon]:flex size-9 rounded-xl bg-orange-500 items-center justify-center shadow-lg shadow-orange-900/40">
          <span className="text-white font-extrabold text-base">M</span>
        </div>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="bg-[#1a1d2e]">
        <SidebarMenu className="px-3 py-4 gap-0.5">
          {data.navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => setOpenMobile(false)}
                  className={`
                    group/btn relative flex items-center gap-3
                    h-11 px-3 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? "!bg-blue-600 !text-white shadow-lg shadow-blue-900/40"
                      : "text-slate-400 hover:bg-blue-600/15 hover:text-white hover:pl-4"
                    }
                  `}
                >
                  {item.icon && (
                    <item.icon
                      className={`size-[18px] shrink-0 transition-colors duration-150 ${
                        isActive ? "text-white" : "text-slate-400 group-hover/btn:text-white"
                      }`}
                    />
                  )}
                  <span className="font-medium text-sm whitespace-nowrap overflow-hidden truncate flex-1">
                    {item.title}
                  </span>
                  {/* Badge */}
                  {"badge" in item && item.badge && (
                    <span
                      className={`
                        group-data-[collapsible=icon]:hidden
                        ml-auto min-w-5 h-5 px-1.5 rounded-full
                        text-[11px] font-bold text-white
                        flex items-center justify-center
                        ${(item as any).badgeColor ?? "bg-blue-500"}
                      `}
                    >
                      {item.badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="p-4 border-t border-white/5 bg-[#1a1d2e]">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center overflow-hidden">
          <div className="shrink-0 size-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <span className="text-blue-400 text-xs font-bold">SJ</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden min-w-0">
            <span className="text-sm font-semibold text-white leading-tight truncate">
              Sarah Johnson
            </span>
            <span className="text-xs text-slate-500 truncate">Production Manager</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}