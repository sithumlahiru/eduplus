import React from "react";

import { HeaderUserMenu, MobileSidebar, Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  headerRight?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, description, headerRight }) => {
  return (
    <div className="min-h-screen bg-muted/40">
      <Sidebar />
      <div className="flex min-h-screen flex-col md:pl-72">
        {title && (
          <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
              <div className="flex items-start gap-3">
                <MobileSidebar />
                <div>
                  <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {headerRight}
                <HeaderUserMenu />
              </div>
            </div>
          </header>
        )}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};
