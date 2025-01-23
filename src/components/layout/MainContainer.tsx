'use client'

import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { usePathname } from 'next/navigation'
import React from 'react'

interface MainContainerProps {
  children: React.ReactNode
}

export default function MainContainer({ children }: MainContainerProps) {
  const pathname = usePathname()
  const { isPlayerOpen } = useMusicPlayerStore()

  return (
    <div
      className={`h-full w-full bg-white px-6 pt-navBar ${
        pathname === '/' ? 'pr-0' : ''
      } ${isPlayerOpen ? 'pb-player' : ''}`}
    >
      {children}
    </div>
  )
}
