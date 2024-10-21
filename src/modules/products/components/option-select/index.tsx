import { ProductOption } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
                                                     option,
                                                     current,
                                                     updateOption,
                                                     title,
                                                     "data-testid": dataTestId,
                                                     disabled,
                                                   }) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex items-center gap-x-4"> {/* Horizontal layout with gap */}
      <span className="text-sm text-gray-800">{title}</span> {/* Size/Color title */}
      <div
        className="flex flex-wrap gap-4"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => (
          <button
            onClick={() => updateOption({ [option.id]: v })}
            key={v}
            className={clx(
              "h-10  flex-row items-center w-14 rounded-2xl justify-center transition-all duration-200 border text-small-regular focus:outline-none focus:ring-2 focus:ring-gray-900", // Square button
              {
                "border-black bg-white text-black hover:bg-gray-900 hover:text-white": v === current, // Active option
                "border-gray-300 bg-gray-100 text-gray-600 hover:bg-white hover:border-black": v !== current, // Inactive option
                "opacity-50 cursor-not-allowed": disabled, // Disabled state
              }
            )}
            disabled={disabled}
            data-testid="option-button"
          >
            {v}
          </button>
        ))}
      </div>
    </div>


  )
}

export default OptionSelect