import React from 'react'

type ButtonProps = {
  type?: 'button' | 'submit'
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className,
}) => {
  return (
    <button type={type} onClick={onClick} className={`bg-primary  ${className}`}>
      {children}
    </button>
  )
}

export default Button
