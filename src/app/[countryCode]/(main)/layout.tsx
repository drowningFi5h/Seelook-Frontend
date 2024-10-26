import { Metadata } from "next";
import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";
import SideMenu from "@modules/layout/components/side-menu";
import { listRegions } from "@lib/data";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const regions = await listRegions();
  // const regions = await listRegions().then((regions) => regions);

  return (
    <div className="relative flex min-h-screen w-full bg-mint-100">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-md transition-transform duration-300 ease-in-out transform -translate-x-full md:translate-x-0"
      >
        <SideMenu regions={regions} />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex-col transition-all duration-300 md:ml-64">
        <Nav regions={regions}/>
        <main className="min-h-screen p-6">{children}</main>
        <Footer />
      </div>

      {/* Overlay for mobile */}
      <div
        id="overlay"
        className="fixed inset-0 z-30 hidden bg-black bg-opacity-50"
      ></div>
    </div>
  );
}
