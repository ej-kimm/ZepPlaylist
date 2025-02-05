import React from 'react'

type ButtonProps = {
  type?: 'button' | 'submit'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
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
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button-2 w-full rounded-full bg-secondary bg-opacity-10 text-secondary ${className}`}
    >
      {children}
    </button>
  )
}

export const BorderButton: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`caption-1 rounded-full border border-secondary text-secondary ${className}`}
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
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`button-2 border-b-2 border-primary p-[10px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
