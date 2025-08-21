import React from "react"

interface InputProps {
  id: string
  label: string
  required?: boolean
  type?: string
  value?: string | number
  min?: number
  max?: number
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
        className="mt-0.5 w-full rounded-lg border border-gray-400 shadow-sm sm:text-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
        required={required}
      />
    </label>
  )
}