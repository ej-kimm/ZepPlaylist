'use client'
import { userStore } from '@/store/userSlice'
import clsx from 'clsx'
import Link from 'next/link'

const LINKS = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/playlist',
    text: 'Playlists',
  },
  {
    to: '/community',
    text: 'Community',
  },
  {
    to: '/koreaTopChart',
    text: 'Charts',
  },
  {
    to: '/my-page',
    text: 'My Page',
  },
  {
    to: '/login',
    text: 'Login',
  },
]

const Navbar = () => {
  const { user } = userStore()

  // TODO : pb 설정, 로그인한 유저마다 메뉴 다르게 보이기
  return (
    <nav className={clsx('hidden gap-9', 'desktop:flex')}>
      {LINKS.map((link) => (
        <Link
          href={link.to}
          className={clsx('button-2 px-[10px] py-2 text-[#636363]')}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
