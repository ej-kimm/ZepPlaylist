import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import Image from 'next/image'
import Link from 'next/link'
import Profile from './_components/Profile'

const MyPage = async () => {
  const playlists = await fetchPlaylistsWithCovers()

  return (
    <>
      <div className="mb-[46px] mt-[18px]">
        <Profile />
      </div>
      <div>
        <h1 className="mb-4 text-xl">내가 커뮤니티에 쓴 글</h1>
        {playlists && playlists.length > 0 ? (
          playlists.map((p) => (
            <Link key={p.id} href={`/community/${p.id}`}>
              <Image
                key={p.id}
                src={p.latest_song_cover || defaultProfileImg}
                width={100}
                height={100}
                alt="앨범이미지"
                className="rounded-2xl"
              />
              <p className="break-all text-gray-800">{p.name}</p>
              <p className="mt-1 break-all text-sm text-gray-600">
                {p.description}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">작성한 플레이리스트가 없습니다.</p>
        )}
      </div>
    </>
  )
}

export default MyPage
