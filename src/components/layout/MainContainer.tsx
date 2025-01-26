'use client'

import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import React from 'react'

interface MainContainerProps {
  children: React.ReactNode
}

export default function MainContainer({ children }: MainContainerProps) {
  const pathname = usePathname()
  const { isPlayerOpen } = useMusicPlayerStore()

  const isHomePage = pathname === '/'

  return (
    <main
      className={clsx(
        'mx-auto h-full w-full max-w-[1186px] bg-white px-6 pt-navBar',
        'desktop:p-0',
        isHomePage ? 'pr-0' : '',
        isPlayerOpen ? 'pb-player' : '',
      )}
    >
      {children}
    </main>
  )
}
