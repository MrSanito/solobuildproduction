import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Premium CRM Dashboard",
  description: "A premium Next.js dashboard with Shadcn and DaisyUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8F8F8] text-[#333333] text-[13px] font-sans">
        <SidebarProvider>
          <TooltipProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col">
              <Navbar />
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </SidebarInset>
          </TooltipProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
