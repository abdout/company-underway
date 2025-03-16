'use client';
import { DocsSidebar } from "@/components/template/sidebar/docs-sidebar";
import { SidebarProvider } from "@/components/template/sidebar/sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;  
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <div className="h-full pt-16">
          <DocsSidebar variant="sidebar" collapsible="icon" />
        </div>
        <main className="flex-1 p-6 pt-16 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;