import { useEffect, useState } from 'react'

export default function useIsDesktop(breakpoint = 720) {
  const [isDesktop, setIsDesktop] = useState<boolean>(
    window.innerWidth >= breakpoint,
  )

  const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isDesktop
}
