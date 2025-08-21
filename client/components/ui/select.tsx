import { MdOutlineArrowDropDown } from "react-icons/md"
import clsx from "clsx"

interface SelectProps {
  id: string
  label: string
  options: { value: string; label: string }[]
  value: string
  required?: boolean
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select({
  id,
  label,
  options,
  value,
  onChange,
  required,
  disabled = false,
}: SelectProps) {
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={clsx(
            "mt-0.5 w-full rounded-lg border border-gray-400 shadow-sm sm:text-sm p-2 pr-8 appearance-none",
            value === "" ? "text-gray-500" : "text-black",
            disabled && "cursor-not-allowed bg-gray-100 text-gray-400"
          )}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          className={clsx(
            "pointer-events-none absolute inset-y-0 right-2 flex items-center",
            disabled ? "text-gray-300" : "text-gray-500"
          )}
        >
          <MdOutlineArrowDropDown />
        </span>
      </div>
    </label>
  )
}