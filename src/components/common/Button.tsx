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
    <button type={type} onClick={onClick} className={`bg-primary ${className}`}>
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
      className={`border-b-2 border-primary p-[10px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
