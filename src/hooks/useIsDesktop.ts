'use client'
import { useEffect, useState } from 'react'

export default function useIsDesktop(breakpoint = 720) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isDesktop
}
