'use client'
import BackgroundHome from '@/assets/images/BackgroundHome.svg'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import HeaderLeft from './_components/HeaderLeft'
import HeaderRight from './_components/HeaderRight'
import Sidebar from './_components/Sidebar'

const Header = () => {
  const pathname = usePathname()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)
  const [navbarColor, setNavbarColor] = useState<string>('bg-transparent')
  const isHomePage = pathname === '/'

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

  const handleScroll = useCallback(() => {
    const backgroundImageHeight = 406 // 배경 이미지 높이
    if (window.scrollY > backgroundImageHeight) {
      setNavbarColor('bg-white')
    } else {
      setNavbarColor('bg-transparent')
    }
  }, [])

  useEffect(() => {
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <>
      <header
        className={clsx(
          'fixed left-0 top-0 z-header flex h-navBar w-full items-center justify-between bg-white px-6',
          'desktop:h-navBar-desktop desktop:px-[30px]',
          isHomePage ? 'desktop:' + navbarColor : 'bg-white',
        )}
      >
        <HeaderLeft isHamburgerOpen={isHamburgerOpen} toggleMenu={toggleMenu} />

        <h1 className={clsx('title-2 flex-1 text-center', 'desktop:hidden')}>
          {!isHamburgerOpen && isPathName(pathname)}
        </h1>

        <HeaderRight toggleMenu={toggleMenu} />
      </header>

      {isHomePage && (
        <div
          className="absolute left-0 top-0 -z-10 h-[406px] w-full"
          style={{
            backgroundImage: `url(${BackgroundHome.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      <Sidebar isOpen={isHamburgerOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Header
