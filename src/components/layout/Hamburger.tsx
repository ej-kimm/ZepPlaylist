'use client'
import hamburger from '@/assets/images/hamburger.svg'
import leftArrow from '@/assets/images/leftArrow.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import Sidebar from './_components/Sidebar'

const Hamburger = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isPlayerModalOpen, togglePlayerModal } = useMusicPlayerStore()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)

  const toggleMenu = useCallback(() => {
    setIsHamburgerOpen((prev) => !prev)
  }, [])

  const handleBack = () => router.back()

  return (
    <>
      <div className="fixed left-0 top-0 z-header flex h-navBar w-full items-center justify-between bg-white px-6">
        <button
          className={`md:hidden ${pathname !== '/' ? 'visible' : 'invisible'}`}
          onClick={isPlayerModalOpen ? togglePlayerModal : handleBack}
        >
          <Image
            src={leftArrow}
            width={24}
            height={24}
            alt="leftArrow"
            className={isPlayerModalOpen ? '-rotate-90' : ''}
          />
        </button>
        <button className="block md:hidden" onClick={toggleMenu}>
          <Image src={hamburger} width={24} height={24} alt="hamburger" />
        </button>
      </div>

      <Sidebar isOpen={isHamburgerOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Hamburger
