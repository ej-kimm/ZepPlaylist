import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FiChevronRight } from 'react-icons/fi'

type ProfileHeaderProps = {
  toggleMenu: () => void
}

const ProfileHeader = ({ toggleMenu }: ProfileHeaderProps) => {
  const router = useRouter()
  const { user } = userStore()

  const linkMenu = (to: string) => {
    router.push(to)
    toggleMenu()
  }

  return (
    <button
      className="flex h-[76px] w-full items-center justify-between rounded-lg border border-secondary-opacity bg-white px-3 shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25),_0px_4px_10px_0px_rgba(0,0,0,0.04)]"
      onClick={() => linkMenu(user ? '/my-page' : '/login')}
    >
      <div className="flex items-center gap-2">
        {user ? (
          <Image
            src={user.profile_image || defaultProfileImg}
            width={44}
            height={44}
            alt={user ? '프로필 이미지' : '기본 이미지'}
            className="rounded-full"
            style={{
              width: '44px',
              height: '44px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div className="h-11 w-11 rounded-full bg-[#d9d9d9]" />
        )}
        <p className="body-1">{user ? user.nickname : '로그인 해주세요'}</p>
      </div>
      <FiChevronRight fontSize={24} />
    </button>
  )
}

export default ProfileHeader
