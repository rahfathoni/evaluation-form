import React from "react"

type TextareaProps = {
  label: string
  name: string
  value: string | null
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  rows?: number
  disabled?: boolean
}

export default function Textarea({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
  disabled = false,
}: TextareaProps) {
  return (
    <div className="mb-4">
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <textarea
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={disabled ? "" : placeholder}
        rows={rows}
        disabled={disabled}
        className={`w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none 
          ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
      />
    </div>
  )
}
