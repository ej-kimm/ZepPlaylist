import PlayList from './_components/Playlist'
import Profile from './_components/Profile'

const MyPage = async () => {
  return (
    <>
      <div className="mb-[46px] ml-[10px] mt-[18px]">
        <Profile />
      </div>
      <div className="h-full overflow-hidden">
        <h1 className="title-1 mb-[34px]">내가 커뮤니티에 쓴 글</h1>
        <PlayList />
      </div>
    </>
  )
}

export default MyPage
