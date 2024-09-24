import { Metadata } from "next";
import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";
import SideMenu from "@modules/layout/components/side-menu";
import { listRegions } from "@lib/data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="flex min-h-screen bg-mint-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md z-50">
        <SideMenu regions={regions}/>
      </aside>

      {/* Main content area */}
      <div className="flex-1 ml-64">
        <Nav />
        <main className="min-h-screen p-6">
          {props.children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
