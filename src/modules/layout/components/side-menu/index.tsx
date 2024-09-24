"use client";

import { ArrowRightMini } from "@medusajs/icons";
import { Region } from "@medusajs/medusa";
import { Text, clx, useToggleState } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CountrySelect from "../country-select";

import React from 'react'

const SideMenu = ({ regions, toggleSidebar }: { regions: Region[] | null, toggleSidebar?: () => void }) => {
  const toggleState = useToggleState();

  return (
    <aside className="w-64 bg-white h-screen flex flex-col">
      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Explore</h1>
        <nav className="space-y-6">
          <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Popular Products
          </a>
          <a href="#" className="flex items-center text-blue-600 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Collections
          </a>
          <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Explore
          </a>
          <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Collections
          </a>
          <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Contact us
          </a>
        </nav>
      </div>
      <div className="p-6 mt-auto border-t">
        <div
          className="flex justify-between items-center mb-4"
          onMouseEnter={toggleState.open}
          onMouseLeave={toggleState.close}
        >
          {regions && (
            <CountrySelect
              toggleState={toggleState}
              regions={regions}
            />
          )}
          <ArrowRightMini
            className={clx(
              "transition-transform duration-150",
              toggleState.state ? "-rotate-90" : "",
            )}
          />
        </div>
        <Text className="text-sm text-gray-400">
          © {new Date().getFullYear()} Seelook Store. All rights reserved.
        </Text>
      </div>
    </aside>
  );
};

export default SideMenu