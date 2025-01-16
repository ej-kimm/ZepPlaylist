import React from 'react'

type PrimaryButtonProps = {
  type?: 'button' | 'submit'
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-6 w-full rounded-lg bg-[#B15EFF] py-3 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF] ${className}`}
    >
      {children}
    </button>
  )
}
