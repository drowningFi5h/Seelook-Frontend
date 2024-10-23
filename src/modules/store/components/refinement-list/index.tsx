"use client"

import React, { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button, Checkbox, Label } from "@medusajs/ui"
import { ChevronDown } from "@medusajs/icons"
import SortProducts, { SortOptions } from "./sort-products"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

type CollapsibleSectionProps = {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  testId?: string
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
                                                                 title,
                                                                 children,
                                                                 defaultExpanded = false,
                                                                 testId
                                                               }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="transparent"
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-lg font-semibold uppercase">{title}</span>
          <ChevronDown className="transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full p-4 bg-white shadow-md rounded-lg">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const RefinementList: React.FC<RefinementListProps> = ({
                                                         sortBy,
                                                         search,
                                                         "data-testid": dataTestId,
                                                       }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <div className="w-48 rounded-xl">
        <CollapsibleSection
          title="Sort By"
          defaultExpanded={false}
          testId={dataTestId}
        >
          <SortProducts
            sortBy={sortBy}
            setQueryParams={setQueryParams}
            data-testid={dataTestId}
          />
        </CollapsibleSection>
        
      </div>
    </div>
  )
}

export default RefinementList
