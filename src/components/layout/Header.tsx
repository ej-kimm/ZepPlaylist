'use client'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import HeaderLeft from './_components/HeaderLeft'
import HeaderRight from './_components/HeaderRight'
import Sidebar from './_components/Sidebar'

const Header = () => {
  const pathname = usePathname()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  const toggleMenu = useCallback(() => {
    setIsHamburgerOpen((prev) => !prev)
  }, [])

  const isPathName = (pathname: string) => {
    switch (true) {
      case pathname === '/koreaTopChart':
        return '국내 TOP 100'
      case pathname === '/billboardTopChart':
        return '빌보드 TOP 100'
      case pathname === '/playlist' || '/playlist/likes':
        return '플레이리스트'
      case pathname === '/community':
        return '커뮤니티'
      case pathname.startsWith('/community/') || '/community':
        return '커뮤니티'
      case pathname === '/my-page':
        return '마이 페이지'
      case pathname.startsWith('/latest-album'):
        return '최신 앨범'
      default:
        return ''
    }
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-header flex h-navBar w-full items-center justify-between bg-white px-6">
        <HeaderLeft isHamburgerOpen={isHamburgerOpen} toggleMenu={toggleMenu} />

        <h1 className="title-2 flex-1 text-center desktop:hidden">
          {!isHamburgerOpen && isPathName(pathname)}
        </h1>

        <HeaderRight toggleMenu={toggleMenu} />
      </div>

      <Sidebar isOpen={isHamburgerOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Header
