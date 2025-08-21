import React from "react"

type RadioGroupProps = {
  label?: string
  options: string[]
  name: string
  value: string
  required?: boolean
  onChange: (value: string) => void
}

export default function RadioGroup({ label, options, name, value, onChange, required }: RadioGroupProps) {
  return (
    <div className="mb-4">
      {label && (
        <div className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
