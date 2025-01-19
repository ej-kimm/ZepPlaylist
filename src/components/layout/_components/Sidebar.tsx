import { userStore } from '@/store/userSlice'
import { supabase } from '@/utils/supabase/client'
import Swal from 'sweetalert2'
import ProfileHeader from './ProfileHeader'
import SidebarMenu from './SidebarMenu'

type SidebarProps = {
  isOpen: boolean
  toggleMenu: () => void
}

const Sidebar = ({ isOpen, toggleMenu }: SidebarProps) => {
  const { user, setUser } = userStore()

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error.message)
      Swal.fire({
        icon: 'error',
        text: '로그아웃중 에러가 발생했습니다. 다시시도해주세요',
      })
    }
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <aside
      className={`fixed right-0 top-0 z-sidebar h-screen w-full bg-white px-6 pt-[56px] transition duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="fixed right-0 top-0">
        {/* 임시 닫기 버튼 */}
        <button onClick={toggleMenu}>X</button>
      </div>

      <header className="mb-[39px] px-[13px]">
        <ProfileHeader toggleMenu={toggleMenu} />
      </header>

      <nav className="mb-14">
        <h2 className="title-1 mb-4">음악 감상</h2>
        <SidebarMenu />
      </nav>

      {user && (
        <button
          type="button"
          onClick={handleLogOut}
          className="caption-2 flex w-full justify-center text-[#636363]"
        >
          로그아웃
        </button>
      )}
    </aside>
  )
}

export default Sidebar
