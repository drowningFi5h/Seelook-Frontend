import React, { Suspense } from "react";
import { listRegions } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import { Search, Shirt , ShoppingCart} from "lucide-react"
import SidebarToggleButton from "./SidebarToggleButton";
import Link from "next/link";

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions);

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="bg-gray-50 shadow-sm">
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
              <Search className="absolute top-1/2 transform -translate-y-1/2 text-gray-400" />
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="pl-8 py-2 w-full items-center text-base text-muted-foreground hover:border-b-2 hover:border-gray-950 text-gray-700"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                </LocalizedClientLink>
              )}
            </div>

              <LocalizedClientLink
                href="/account/orders"
                className="flex items-center py-1 text-base text-muted-foreground hover:border-b-2 hover:border-gray-950 text-gray-700"
              >
                <Shirt className="h-6 w-6 " />
              </LocalizedClientLink>

            {/* Cart Button */}

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center px-4 py-1 text-base text-muted-foreground hover:border-b-2 hover:border-gray-950 text-gray-700"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart className="h-6 w-6" />
                  Cart (0)
                </LocalizedClientLink>
              }
            ><div className={"flex items-center space-x-2 px-4 py-1 text-base text-muted-foreground hover:border-b-2 hover:border-gray-950 text-gray-700"}>
              <ShoppingCart className="h-6 w-6" />
              <CartButton />
            </div>

            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}
