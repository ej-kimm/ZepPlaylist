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
      className={`button-2 w-full rounded-full bg-primary text-white ${className}`}
    >
      {children}
    </button>
  )
}

export const SecondaryButton: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button-2 w-full rounded-full bg-secondary bg-opacity-10 text-secondary ${className}`}
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
