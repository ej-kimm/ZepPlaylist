'use client'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import { supabase } from '@/utils/supabase/client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

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
]

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = userStore()
  const { isPlayerModalOpen, togglePlayerModal, setPlayerClose } =
    useMusicPlayerStore()

  const handleLogIn = () => {
    if (isPlayerModalOpen) setPlayerClose()
    router.push('/login')
  }

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error.message)
      Swal.fire({
        icon: 'error',
        text: '로그아웃중 에러가 발생했습니다. 다시시도해주세요',
      })
    }
    setUser(null)
    window.location.reload()
    if (isPlayerModalOpen) setPlayerClose()
  }

  const handleLinkClick = () => {
    if (isPlayerModalOpen) {
      togglePlayerModal()
    }
  }

  return (
    <nav className={clsx('hidden gap-9', 'desktop:flex')}>
      {/* 일반 링크 */}
      {LINKS.map((link, index) => {
        const isCommunityActive =
          link.to === '/community' && pathname.startsWith('/community')
        const isPlaylistActive =
          link.to === '/playlist' && pathname.startsWith('/playlist')

        return (
          <Link
            key={index}
            href={link.to}
            className={clsx(
              'button-2 relative whitespace-nowrap px-[10px] py-2 text-[#636363] transition-colors',
              isCommunityActive || isPlaylistActive || pathname === link.to
                ? 'text-primary'
                : 'hover:text-primary',
              'after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300',
              isCommunityActive || isPlaylistActive || pathname === link.to
                ? 'after:w-full'
                : '',
            )}
          >
            {link.text}
          </Link>
        )
      })}

      {/* 로그인 상태에서만 My Page 표시 */}
      {user && (
        <Link
          href="/my-page"
          onClick={handleLinkClick}
          className={clsx(
            'button-2 relative whitespace-nowrap px-[10px] py-2 text-[#636363] transition-colors',
            pathname === '/my-page' ? 'text-primary' : 'hover:text-primary',
            'after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300',
            pathname === '/my-page' && 'after:w-full',
          )}
        >
          My Page
        </Link>
      )}

      {/* 로그인/로그아웃 버튼 분리 */}
      <button
        onClick={user ? handleLogOut : handleLogIn}
        className={clsx(
          'button-2 relative whitespace-nowrap px-[10px] py-2 text-[#636363] transition-colors',
          pathname === '/login' ? 'text-primary' : 'hover:text-primary',
          'after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300',
          pathname === '/login' && 'after:w-full',
        )}
      >
        {user ? 'Log Out' : 'Log In'}
      </button>
    </nav>
  )
}

export default Navbar
