const colorVariants = {
  solid: {
    green: 'bg-green-600 hover:bg-green-700 text-white',
    red: 'bg-red-600 hover:bg-red-700 text-white',
    indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    black: 'bg-black hover:bg-gray-800 text-white',
  },
  outline: {
    green: 'border border-green-600 text-green-600 hover:bg-green-50 bg-white',
    red: 'border border-red-600 text-red-600 hover:bg-red-50 bg-white',
    indigo: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 bg-white',
    black: 'border border-black text-black hover:bg-gray-100 bg-white',
  },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  className?: string
  color?: keyof typeof colorVariants['solid']
  variant?: keyof typeof colorVariants
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  onClick,
  className = '',
  color = 'black',
  variant = 'outline',
  ...props
}: ButtonProps) {
  const baseClasses =
    'cursor-pointer inline-block rounded-sm px-4 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden'

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorVariants[variant][color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
