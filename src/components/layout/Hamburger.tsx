'use client'
import hamburger from '@/assets/images/hamburger.svg'
import leftArrow from '@/assets/images/leftArrow.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import Sidebar from './_components/Sidebar'

interface HamburgerProps {
  title?: string
}

const Hamburger = ({ title = '' }: HamburgerProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { isPlayerModalOpen, togglePlayerModal } = useMusicPlayerStore()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  const toggleMenu = useCallback(() => {
    setIsHamburgerOpen((prev) => !prev)
  }, [])

  const handleBack = () => {
    if (isHamburgerOpen) {
      toggleMenu()
      return
    }

    if (isPlayerModalOpen) {
      togglePlayerModal()
    } else {
      router.back()
    }
  }

  const isPathName = (pathname: string) => {
    console.log(pathname)
    switch (true) {
      case pathname === '/koreaTopChart':
        return '국내 TOP 100'
      case pathname === '/billboardTopChart':
        return '빌보드 TOP 100'
      case pathname === '/playlist' || '/playlist/likes':
        return '플레이리스트'
      case pathname.startsWith('/community/') || '/community':
        return '커뮤니티'
      case pathname === '/my-page':
        return '마이 페이지'
      default:
        return ''
    }
  }

  return (
    <div className="fixed left-0 top-0 z-header flex h-navBar w-full items-center justify-between bg-white px-6">
      <button
        className={`md:hidden ${pathname === '/' && !isPlayerModalOpen ? 'invisible' : 'visible'}`}
        onClick={handleBack}
      >
        <Image
          src={leftArrow}
          width={24}
          height={24}
          alt="leftArrow"
          className={`${isPlayerModalOpen ? '-rotate-90' : ''} ${isHamburgerOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <h1 className="title-2 flex-1 text-center">{isPathName(pathname)}</h1>

      <button className="block md:hidden" onClick={toggleMenu}>
        <Image src={hamburger} width={24} height={24} alt="hamburger" />
      </button>
      <Sidebar isOpen={isHamburgerOpen} toggleMenu={toggleMenu} />
    </div>
  )
}

export default Hamburger
