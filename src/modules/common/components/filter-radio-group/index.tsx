import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"
import { ChangeEvent } from "react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  'data-testid'?: string
}

const FilterRadioGroup = ({
                            title,
                            items,
                            value,
                            handleChange,
                            'data-testid': dataTestId
                          }: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <Text className="text-sm font-medium text-ui-fg-base">{title}</Text>
      <RadioGroup className="space-y-2" data-testid={dataTestId}>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx(
              "group flex items-center transition-all duration-200",
              "hover:bg-ui-bg-base-hover rounded-md",
              {
                "bg-ui-bg-base-pressed": i.value === value,
              }
            )}
          >
            <RadioGroup.Item
              checked={i.value === value}
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLButtonElement>,
                  i.value
                )
              }
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "flex items-center w-full px-3 py-2 cursor-pointer",
                "text-sm transition-colors duration-200",
                {
                  "text-ui-fg-base font-medium": i.value === value,
                  "text-ui-fg-subtle": i.value !== value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              <span className={clx(
                "w-4 h-4 mr-3 rounded-full border transition-all duration-200",
                "flex items-center justify-center",
                {
                  "border-ui-border-base group-hover:border-ui-border-hover": i.value !== value,
                  "border-ui-border-interactive bg-ui-bg-interactive": i.value === value,
                }
              )}>
                {i.value === value && (
                  <span className="w-2 h-2 rounded-full bg-ui-fg-on-color" />
                )}
              </span>


              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
