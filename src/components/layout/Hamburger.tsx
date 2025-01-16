'use client'

import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { BiAlbum } from 'react-icons/bi'
import { BsBarChartLineFill } from 'react-icons/bs'
import { FaComment } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'
import { ImHeadphones } from 'react-icons/im'
const Hamburger = () => {
  const { user } = userStore((state) => state)
  console.log(user)

  const router = useRouter()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  const links = [
    { to: '/', text: 'Home', icon: <BiAlbum /> },
    { to: '/koreaTop100', text: '국내 TOP 100', icon: <BsBarChartLineFill /> },
    {
      to: '/billboardTop100',
      text: '빌보드 TOP 100',
      icon: <BsBarChartLineFill />,
    },
    { to: '/playlist', text: '플레이리스트', icon: <ImHeadphones /> },
    { to: '/community', text: '커뮤니티', icon: <FaComment /> },
    // { to: '/', text: '스포티파이 바로가기' },
  ]

  const toggleMenu = useCallback(() => {
    setIsHamburgerOpen((prev) => !prev)
  }, [])

  const linkMenu = useCallback(
    (to: string) => {
      return () => {
        setIsHamburgerOpen(false)
        router.push(to)
      }
    },
    [router],
  )

  return (
    <>
      {!isHamburgerOpen ? (
        <div className="z-header h-navBar fixed left-0 top-0 flex w-full items-center justify-end bg-white px-6">
          <button className="block md:hidden" onClick={toggleMenu}>
            <svg
              className="h-6 w-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 17 14"
            >
              <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="m-8 block md:hidden">
          <div>
            <button onClick={toggleMenu}>X</button>
          </div>
          <div className="/*min-h-screen*/ m-5 flex flex-col items-center justify-center">
            <button onClick={linkMenu(!user ? '/login' : '/my-page')}>
              <div className="flex h-16 w-64 flex-shrink-0 items-center space-x-3 rounded-lg p-2 shadow-xl transition-colors">
                <Image
                  src={user?.profile_image || '/path/to/default-image.jpg'}
                  width={80}
                  height={80}
                  alt={user ? '프로필 이미지' : '기본 이미지'}
                  className="m-4 rounded-full"
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                  }}
                />
                <p>{!user ? '로그인을 해주세요' : user.nickname}</p>
                <FiChevronRight />
              </div>
            </button>
            <div className="m-8 flex flex-col">
              {links.map((link) => (
                <button
                  className="m-2"
                  key={link.to}
                  onClick={linkMenu(link.to)}
                >
                  <div className="flex- flex">
                    {link.icon}
                    <span className="ml-2">{link.text}</span>
                  </div>
                </button>
                //seo ....안잡힘 이슈 -> 보완할때해도 ㄱㅊ
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Hamburger
