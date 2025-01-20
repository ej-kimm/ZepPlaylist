'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

interface MainContainerProps {
  children: React.ReactNode
}

export default function MainContainer({ children }: MainContainerProps) {
  const pathname = usePathname()

  return (
    <div
      className={`h-full w-full bg-white px-6 pt-navBar ${
        pathname === '/' ? 'pr-0' : ''
      }`}
    >
      {children}
    </div>
  )
}
