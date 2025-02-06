'use client'
import leftArrow from '@/assets/images/leftArrow.svg'
import logo from '@/assets/images/logo.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { clsx } from 'clsx'
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

  const handleBackHome = () => {
    if (isPlayerModalOpen) {
      togglePlayerModal()
    }
    router.push('/')
  }
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
    // console.log(pathname)
    // if (pathname === '/search') {
    //   router.push('/')
    // }
  }

  return (
    <>
      {/* Desktop에서는 항상 로고 표시 */}
      <button
        type="button"
        className="hidden min-h-[30px] min-w-[128px] desktop:block"
        onClick={handleBackHome}
      >
        <Image src={logo} width={128} height={30} alt="logo" />
      </button>

      {/* 모바일에서는 pathname 조건에 따라 로고 표시 */}
      {pathname === '/' && !isHamburgerOpen && !isPlayerModalOpen && (
        <button type="button" className="desktop:hidden">
          <Image src={logo} width={128} height={30} alt="logo" />
        </button>
      )}

      <button
        className={clsx('desktop:hidden', {
          invisible: pathname === '/' && !isPlayerModalOpen,
          visible: !(pathname === '/' && !isPlayerModalOpen),
        })}
        onClick={handleBack}
      >
        <Image
          src={leftArrow}
          width={24}
          height={24}
          alt="leftArrow"
          className={clsx(isPlayerModalOpen && '-rotate-90')}
        />
      </button>
    </>
  )
}

export default HeaderLeft
