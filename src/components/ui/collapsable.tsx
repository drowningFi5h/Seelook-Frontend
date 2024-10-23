"use client"

import React from "react"
import { Button, Drawer } from "@medusajs/ui"
import { ChevronDown } from "@medusajs/icons"

type CollapsibleSectionProps = {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  testId?: string
}

const renderContent = (content: React.ReactNode): React.ReactNode => {
  if (typeof content === 'bigint') {
    return content.toString()
  }
  if (Array.isArray(content)) {
    return content.map((item, index) => <React.Fragment key={index}>{renderContent(item)}</React.Fragment>)
  }
  if (typeof content === 'object' && content !== null && Symbol.iterator in content) {
    return Array.from(content as Iterable<React.ReactNode>).map((item, index) => (
      <React.Fragment key={index}>{renderContent(item)}</React.Fragment>
    ))
  }
  return content
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
                                                                        title,
                                                                        children,
                                                                        defaultExpanded = false,
                                                                        testId
                                                                      }) => {
  const [isOpen, setIsOpen] = React.useState(defaultExpanded)

  return (
    <div data-testid={testId}>
      <Button
        variant="transparent"
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-lg font-semibold uppercase">{title}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body><div>(children)</div>

          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </div>
  )
}

export default CollapsibleSection