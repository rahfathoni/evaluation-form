import React from "react"
import clsx from "clsx"

type RadioGroupProps = {
  label?: string
  options: string[]
  name: string
  value: string
  required?: boolean
  disabled?: boolean
  onChange: (value: string) => void
}

export default function RadioGroup({
  label,
  options,
  name,
  value,
  required,
  disabled = false,
  onChange,
}: RadioGroupProps) {
  return (
    <div className="mb-4">
      {label && (
        <div className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label
            key={option}
            className={clsx(
              "flex items-center gap-1",
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
              disabled={disabled}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}