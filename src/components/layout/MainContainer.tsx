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
  const isCommunity = pathname.startsWith('/community/')

  return (
    <main
      className={clsx(
        'mx-auto h-full w-full bg-white px-6 pt-navBar',
        'desktop:bg-transparent desktop:p-0 desktop:pt-navBar-desktop',
        isHomePage ? 'pr-0 desktop:max-w-[1186px]' : 'desktop:max-w-[1200px]',
        isPlayerOpen ? 'pb-player desktop:pb-player-desktop' : '',
        isCommunity ? 'pb-28' : ''
      )}
    >
      {children}
    </main>
  )
}
