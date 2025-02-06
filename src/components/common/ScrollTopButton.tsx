'use client'

import likeTrue from '@/assets/images/likeTrue.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 스크롤 상태를 확인하여 버튼 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200) // 200px 이상 스크롤 시 버튼 표시
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 최상단으로 이동
  const scrollToTop = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null // 버튼이 보이지 않을 때 렌더링 안 함

  return (
    <button
      onClick={scrollToTop}
      className="bg-primary-default text-bg-01 hover:bg-primary-dark fixed bottom-40 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full shadow-sm"
      aria-label="최상단으로 이동"
    >
      <Image src={likeTrue} alt="Submit Comment" width={40} height={40} />
    </button>
  )
}

export default ScrollTopButton
