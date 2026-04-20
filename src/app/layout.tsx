import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50">
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
