import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

import { Heading } from "@medusajs/ui"
import { Search, ShoppingCart } from "lucide-react"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl text-gray-900 font-normal hover:text-gray-700 transition-colors"
              data-testid="nav-logo-link"
            >
              SEELOOK
            </LocalizedClientLink>
          </div>

          <div className="flex space-x-4">
            <LocalizedClientLink
              href="/store"
              className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
              data-testid="nav-store-link"
            >
              Retail
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/wholesale"
              className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
              data-testid="nav-wholesale-link"
            >
              Wholesale
            </LocalizedClientLink>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
            </div>
            <button className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                8
              </span>
            </button>
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
  )
}