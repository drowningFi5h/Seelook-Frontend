"use client"; // Client-side component

import React, { useState } from "react";
import { Home, Menu, Package, Shirt, ShoppingBasket, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CountrySelect from "@modules/layout/components/country-select"
import { ArrowRightMini } from "@medusajs/icons"
import { clx, Text } from "@medusajs/ui"
import { useToggleState } from "@medusajs/ui";
import { Region } from "@medusajs/medusa"

const SidebarToggleButton = ({ regions }: { regions: Region[] | null, toggleSidebar?: () => void }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleState = useToggleState();

  return (
    <>
      {/* The toggle button remains visible at all screen sizes */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-md transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar content */}
          <div className="p-4">
            <h2 className="text-xl font-semibold">Explore</h2>
            <div className="h-screen bg-muted/40 py-8">
              <div className="flex h-full flex-col justify-between ">
                <div>
                  {/* Header */}
                  <div className="flex-1 overflow-auto">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                      <LocalizedClientLink
                        href="/store"
                        className="flex items-center gap-3 rounded-lg px-3 py-5 text-muted-foreground hover:text-primary hover:text-blue-400 border-t text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <Shirt className="h-4 w-4" />
                        Retail
                      </LocalizedClientLink>
                      <Link
                        href="/wholesale"
                        className="flex items-center gap-3 rounded-lg px-3 py-5 text-muted-foreground hover:text-primary hover:text-blue-400 border-t text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <ShoppingBasket className="h-4 w-4" />
                        Wholesale
                      </Link>
                      <Link
                        href="/store"
                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-5 text-primar hover:text-primary hover:text-blue-400 border-t text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <Package className="h-4 w-4" />
                        Collections
                      </Link>

                      <LocalizedClientLink
                        className="flex items-center gap-3 rounded-lg px-3 py-5 text-muted-foreground hover:text-primary hover:text-blue-400 border-t text-gray-700 hover:bg-gray-200 transition-colors"
                        href="/account"
                        data-testid="nav-account-link"
                      >
                        <span className="sr-only">Account</span>
                        <Users className="h-6 w-6" />
                        <p className="text-sm">My Account</p>
                      </LocalizedClientLink>
                    </nav>
                  </div>
                </div>

                {/* Bottom section */}
                <div className="bottom-0 mt-auto p-4">
                  <Card>
                    <CardHeader className="p-2 pt-0 md:p-4">
                      <CardTitle>Contact us</CardTitle>
                      <CardDescription>
                        Place custom or special orders.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                      <Button size="sm" className="w-full hover:bg-emerald-600 hover:text-white" >
                        Whatsapp
                      </Button>
                    </CardContent>
                  </Card>
                  <div className="mt-4 border-t">
                    <div
                      className="flex justify-between items-center"
                      onMouseEnter={toggleState.open}
                      onMouseLeave={toggleState.close}
                    >
                      {regions && (
                        <CountrySelect toggleState={toggleState} regions={regions} />
                      )}
                      <ArrowRightMini
                        className={clx(
                          "transition-transform duration-150",
                          toggleState.state ? "-rotate-90" : ""
                        )}
                      />
                    </div>
                    <Text className="text-sm text-gray-400 mt-4 bottom-0">
                      © {new Date().getFullYear()} Seelook Store. All rights reserved.
                    </Text>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SidebarToggleButton;
