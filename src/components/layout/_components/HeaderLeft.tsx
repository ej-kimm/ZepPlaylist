'use client'
import leftArrow from '@/assets/images/leftArrow.svg'
import logo from '@/assets/images/logo.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

type HeaderLeftProps = {
  isHamburgerOpen: boolean
  toggleMenu: () => void
}

const HeaderLeft = ({ isHamburgerOpen, toggleMenu }: HeaderLeftProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { isPlayerModalOpen, togglePlayerModal } = useMusicPlayerStore()

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

  return (
    <>
      {pathname === '/' && !isHamburgerOpen && !isPlayerModalOpen && (
        <button type="button">
          <Image src={logo} width={128} height={30} alt="logo" />
        </button>
      )}

      <button
        className={`desktop:hidden ${pathname === '/' && !isPlayerModalOpen ? 'invisible' : 'visible'}`}
        onClick={handleBack}
      >
        <Image
          src={leftArrow}
          width={24}
          height={24}
          alt="leftArrow"
          className={`${isPlayerModalOpen ? '-rotate-90' : ''}`}
        />
      </button>
    </>
  )
}

export default HeaderLeft
