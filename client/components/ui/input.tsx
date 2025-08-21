import React from "react"
import clsx from "clsx"

interface InputProps {
  id: string
  label: string
  required?: boolean
  type?: string
  value?: string | number
  min?: number
  max?: number
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  id,
  label,
  required = false,
  type = "text",
  value,
  min,
  max,
  disabled = false,
  onChange,
}: InputProps) {
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        className={clsx(
          "mt-0.5 w-full rounded-lg border shadow-sm sm:text-sm p-2 focus:border-indigo-500 focus:ring-indigo-500",
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-70 border-gray-300"
            : "border-gray-400"
        )}
        required={required}
      />
    </label>
  )
}