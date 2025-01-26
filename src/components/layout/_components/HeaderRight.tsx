'use client'
import hamburger from '@/assets/images/hamburger.svg'
import Image from 'next/image'

type HeaderRightProps = {
  toggleMenu: () => void
}

const HeaderRight = ({ toggleMenu }: HeaderRightProps) => {
  return (
    <button className="block desktop:hidden" onClick={toggleMenu}>
      <Image src={hamburger} width={24} height={24} alt="hamburger" />
    </button>
  )
}

export default HeaderRight
