'use client'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import { supabase } from '@/utils/supabase/client'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  const { user, setUser } = userStore()
  const { isPlayerModalOpen, setPlayerClose } = useMusicPlayerStore()

  const handleLogIn = () => {
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
    if (isPlayerModalOpen) setPlayerClose()
  }

  return (
    <nav className={clsx('hidden gap-9', 'desktop:flex')}>
      {/* 일반 링크 */}
      {LINKS.map((link, index) => (
        <Link
          key={index}
          href={link.to}
          className={clsx('button-2 px-[10px] py-2 text-[#636363]')}
        >
          {link.text}
        </Link>
      ))}

      {/* 로그인 상태에서만 My Page 표시 */}
      {user && (
        <Link
          href="/my-page"
          className={clsx('button-2 px-[10px] py-2 text-[#636363]')}
        >
          My Page
        </Link>
      )}

      {/* 로그인/로그아웃 버튼 분리 */}
      {user ? (
        <button
          onClick={handleLogOut}
          className={clsx('button-2 px-[10px] py-2 text-[#636363]')}
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={handleLogIn}
          className={clsx('button-2 px-[10px] py-2 text-[#636363]')}
        >
          Log In
        </button>
      )}
    </nav>
  )
}

export default Navbar
