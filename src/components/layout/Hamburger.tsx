'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

const Hamburger = () => {
  const router = useRouter()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  const links = [
    { to: '/', text: 'Home' },
    { to: '/playlist', text: 'PlayList' },
    { to: '/community', text: 'Coummity' },
    { to: '/chart', text: 'Chart' },
    { to: '/login', text: 'Login' },
    { to: '/my-page', text: 'MyPage' },
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

  // console.log(isHamburgerOpen)
  return (
    <>
      {!isHamburgerOpen ? (
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
      ) : (
        <div className="menu-container">
          <div>
            <button onClick={toggleMenu}>X</button>
          </div>
          <div className="flex flex-col">
            {links.map((link) => (
              <button key={link.to} onClick={linkMenu(link.to)}>
                {link.text}
              </button>
              //seo ....안잡힘 이슈 -> 보완할때해도 ㄱㅊ
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Hamburger
