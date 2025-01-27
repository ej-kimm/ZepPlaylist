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
        'mx-auto h-full w-full bg-white px-6 pt-navBar',
        'desktop:p-0',
        isHomePage ? 'pr-0 desktop:max-w-[1186px]' : 'desktop:max-w-[1200px]',
        isPlayerOpen ? 'pb-player' : '',
      )}
    >
      {children}
    </main>
  )
}
