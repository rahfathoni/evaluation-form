import React, { useEffect, useState } from "react"
import clsx from "clsx"

interface RatingProps {
  value: number | null
  label: string
  max: number
  start?: number
  onChange: (val: number) => void
  disabled?: boolean
  required?: boolean
  onValidityChange?: (isValid: boolean) => void
}

export default function Rating({
  label,
  max = 10,
  value,
  onChange,
  start = 1,
  disabled = false,
  required = false,
  onValidityChange,
}: RatingProps) {
  const options = Array.from({ length: max - start + 1 }, (_, i) => i + start)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (required) {
      const isValid = value !== null
      setError(isValid ? null : "This field is required")
      if (onValidityChange) onValidityChange(isValid)
    }
  }, [value, required, onValidityChange])

  return (
    <div>
      <p className="font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-500">low</span>
        <span className="text-sm text-gray-500">high</span>
      </div>

      <div className="flex justify-between gap-1">
        {options.map((num) => {
          const isSelected = value === num
          return (
            <button
              key={num}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(num)}
              className={clsx(
                "w-9 h-8 border rounded-md flex items-center justify-center",
                disabled
                  ? isSelected
                    ? "bg-blue-300 text-white border-blue-300 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-100"
              )}
            >
              {num}
            </button>
          )
        })}
      </div>
      {error && <p className="text-red-500 text-sm mt-4 pl-5 font-bold">{error}</p>}
    </div>
  )
}