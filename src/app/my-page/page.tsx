import { getPlaylists } from '@/api/my-page/actions'
import Image from 'next/image'
import Link from 'next/link'
import Profile from './_components/Profile'

const MyPage = async () => {
  const playlists = await getPlaylists()
  console.log('playlists', playlists)
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl">마이페이지</h1>
      <div className="mb-6 flex items-center">
        <Profile />
        {playlists && playlists.length > 0 ? (
          playlists.map((p) => (
            <Link key={p.id} href={`/community/${p.id}`}>
              {/* {albumImage.map((p) => (
                <Image
                  key={p.id}
                  width={100}
                  height={100}
                  alt="앨범 이미지"
                  src={p.music.album_cover!}
                />
              ))} */}
              {p.playlist_music.map((p) => (
                <Image
                  key={p.id}
                  src={p.music.album_cover!}
                  width={100}
                  height={100}
                  alt="앨범이미지"
                  className="rounded-2xl"
                />
              ))}
              {/* <Image
                src={p.playlist_music[0].music.album_cover!}
                width={100}
                height={100}
                alt="앨범 커버 이미지"
                className="rounded-2xl" //살짝 동그랗게 ㅎ
              /> */}
              <p className="text-gray-800">{p.name}</p>
              <p className="mt-1 text-sm text-gray-600">{p.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">작성한 플레이리스트가 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default MyPage
