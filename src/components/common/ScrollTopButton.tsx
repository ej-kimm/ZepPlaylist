'use client'

import upButton from '@/assets/images/upButton.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = (event: React.MouseEvent) => {
    event.stopPropagation()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="bg-primary-default text-bg-01 hover:bg-primary-dark fixed bottom-20 left-1/2 z-40 flex h-16 w-16 -translate-x-1/2 items-center justify-center"
      aria-label="최상단으로 이동"
    >
      <Image src={upButton} alt="Submit Comment" width={40} height={40} />
    </button>
  )
}

export default ScrollTopButton
