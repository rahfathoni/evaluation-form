import React from "react"

interface RatingProps {
  value: number | null
  label: string
  max: number
  start?: number
  onChange: (val: number) => void
}

export default function Rating({
  label,
  max = 10,
  value,
  onChange,
  start = 1,
}: RatingProps) {
  const options = Array.from({ length: max - start + 1 }, (_, i) => i + start);

  return (
    <div className="">
      <p className="font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </p>

      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-500">low</span>
        <span className="text-sm text-gray-500">high</span>
      </div>

      <div className="flex justify-between gap-1">
        {options.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-9 h-8 border rounded-md flex items-center justify-center 
              ${
                value === num
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-100"
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}