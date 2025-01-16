import React from 'react'

type ButtonProps = {
  type?: 'button' | 'submit'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-6 w-full rounded-lg bg-primary py-3 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    >
      {children}
    </button>
  )
}

export const UnderLineButton: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`button-2 border-b-2 border-primary p-[10px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
