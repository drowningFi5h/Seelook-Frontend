import React, { Suspense} from "react";
import { listRegions } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ShopIcon from '@mui/icons-material/Shop';
import CartButton from "@modules/layout/components/cart-button";
import Input from "@modules/common/components/input";
import { Search, Shirt , ShoppingCart} from "lucide-react"
import SidebarToggleButton from "./SidebarToggleButton";
import Link from "next/link";

export default async function Nav(props : { regions: any }) {
  const { regions } = props;

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="bg-gray-50 shadow-sm w-full border-b ">
        <nav className="w-full px-4 py-2 flex items-center justify-between ">
          {/* Sidebar Toggle and Brand Icon - Hidden on larger screens */}
          <div className="flex items-center text-primary gap-6 md:hidden">
            <SidebarToggleButton regions={regions} />
            <Link href="/" className="flex items-center gap-2 font-semibold text-2xl">
              <span>SEELOOK</span>
            </Link>
          </div>


          {/* Cart Button and Search Bar aligned to the right */}
          <div className="flex items-center justify-between w-full">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="hidden md:block w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {process.env.FEATURE_SEARCH_ENABLED && (
                  <LocalizedClientLink
                    className= "absolute right-3 top-1/2 -translate-y-1/2 pl-8 py-2 w-full items-center text-base text-muted-foreground  text-gray-700 cursor-text"
                    href="/search"
                    scroll={false}
                    data-testid="nav-search-link"
                  >
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </LocalizedClientLink>
                )}
            </div>
            <div className="relative flex items-center mr-4">
            <Stack direction="row" spacing={2}>
              <LocalizedClientLink
                href="/account/orders"
                className="flex items-center py-1"
              >
                <IconButton aria-label="shirt" >
                  <ShopIcon className="h-7 w-7 text-base text-muted-foreground text-gray-700" />
                </IconButton>
                
              </LocalizedClientLink>

              {/* Cart Button */}

              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center px-4 py-1 text-base text-muted-foreground text-gray-700"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </LocalizedClientLink>
                }
              >
                <div className={"flex items-center py-1 text-base text-muted-foreground text-gray-700"}>
                  <CartButton />
                </div>
              </Suspense>
            </Stack>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
