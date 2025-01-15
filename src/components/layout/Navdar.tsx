'use client'

import { userStore } from '@/store/userSlice'
import Link from 'next/link'

const Navdar = () => {
  const { user } = userStore((state) => state)

  return (
    <nav className="hidden items-center gap-4 md:flex">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="mx-auto">
          <Link href={'/'}>ZepPlayList</Link>
        </div>

        <div>
          <Link href={'/playlist'} className="px-3 py-5">
            PlayList
          </Link>
          <Link href={'/community'} className="px-3 py-5">
            Community
          </Link>

          {/* 페이지 경로 수정 해야됨 !!!! */}
          <Link href={'/'} className="px-3 py-5">
            Chart
          </Link>

          {!user ? (
            <Link href={'/login'} className="px-3 py-5">
              Login
            </Link>
          ) : (
            <Link href={'/my-page'} className="px-3 py-5">
              My Page
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navdar
