import React, { Suspense } from "react";
import { listRegions } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import { Search } from "lucide-react";
import SidebarToggleButton from "./SidebarToggleButton";
import Link from "next/link";

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions);

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Sidebar Toggle and Brand Icon - Hidden on larger screens */}
          <div className="flex items-center gap-6 md:hidden">
            <SidebarToggleButton regions={regions} />
            <Link href="/" className="flex items-center gap-2 font-semibold text-2xl">
              <span>SEELOOK</span>
            </Link>
          </div>

          {/* Cart Button and Search Bar aligned to the right */}
          <div className="flex items-center space-x-6 ml-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
            </div>

            {/* Cart Button */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}
