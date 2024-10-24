"use client";

import React, { createContext, useState, ReactNode, Suspense } from "react";
import Image from "next/image";

import { ArrowRightMini } from "@medusajs/icons";
import { Region } from "@medusajs/medusa";
import { Text, clx, useToggleState, Button } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CountrySelect from "../country-select";

import Link from "next/link"
import { Bell, Package2, Home, ShoppingCart, Package, Users, Shirt, ShoppingBasket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SidebarContextType {
  expanded: boolean;
}
//
// const SidebarContext = createContext<SidebarContextType>({ expanded: true });
//
// interface SidebarProps {
//   children: ReactNode;
// }

const SideMenu = ({ regions }: { regions: Region[] | null, toggleSidebar?: () => void }) => {
  const toggleState = useToggleState();
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <>
      <aside>
        <div className="hidden h-screen bg-muted/40 md:block ">
          <div className="flex h-full flex-col justify-between ">
            <div>
              <div className="relative flex flex-row items-center h-14 items-center mt-6 lg:h-[60px] lg:px-6 ">
                <div className="relative w-auto h-full inset-0 p-2">
                  <Suspense fallback={<Skeleton className="h-full bg-red-500 aspect-square" />}>
                    <Image src="/in/images/logo.svg" alt="logo" width={100} height={100} className="w-auto h-full" loading="lazy"/>
                  </Suspense>
                </div>
              <LocalizedClientLink href={"/"} className="flex items-center gap-2 font-semibold text-2xl text-blue-500 ">
                <p className="flex items-center gap-2 font-semibold text-2xl text-primary ">SEELOOK</p>
              </LocalizedClientLink>
              </div>

              {/* Main content that takes up the remaining space */}
              <div className="flex-1 overflow-auto px-4">
                <nav className="grid items-start px-2 py-5 text-sm space-y-2 lg:px-4">
                  <LocalizedClientLink
                    href="/store"
                    className="flex items-center gap-3 rounded-full px-6 py-4 text-base text-muted-foreground  hover:text-gray-50 text-gray-700 hover:bg-blue-500 transition-colors"
                  >
                    <Shirt className="h-6 w-6" />
                    Retail
                  </LocalizedClientLink>
                  <Link
                    href="/wholesale"
                    className="flex items-center gap-3 rounded-full px-6 py-4 text-base text-muted-foreground  hover:text-gray-50 text-gray-700 hover:bg-blue-500 transition-colors"
                  >
                    <ShoppingBasket className="h-6 w-6" />
                    Wholesale
                  </Link>
                  <Link
                    href="/store"
                    className="flex items-center gap-3 rounded-full  px-6 py-4 text-base text-muted-foreground  hover:text-gray-50 text-gray-700 hover:bg-blue-500 transition-colors"
                  >
                    <Package className="h-6 w-6" />
                    Collections
                  </Link>

                  <LocalizedClientLink
                    className="flex items-center gap-3 rounded-full px-6 py-4 text-base text-muted-foreground hover:text-gray-50 text-gray-700 hover:bg-blue-500 transition-colors"
                    href="/account"
                    data-testid="nav-account-link"
                  >
                    <span className="sr-only">Account</span>
                    <Users className="h-6 w-6" />
                    <p className="">My Account</p>
                  </LocalizedClientLink>
                </nav>
              </div>
            </div>

            {/* Bottom section */}
            <div className="bottom-0 mt-auto p-4">
              <Card className={"hover:bg-gray-100 hover:shadow-lg"}>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Contact us</CardTitle>
                  <CardDescription>
                    Place custom or special orders.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0 ">
                  <Button className="w-full hover:bg-emerald-600 hover:text-white" >
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


      </aside>
    </>
  );
};

export default SideMenu