'use client'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import usePlaylistOperations from '@/hooks/usePlaylistOperations'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import Link from 'next/link'
import BottomSheet from './BottomSheet'

type MusicSaveBottomSheetProps = {
  musicName: string
  artistName: string
  albumCover: string
  isOpen: boolean
  handleClose: () => void
}

const MusicSaveBottomSheet = ({
  musicName,
  artistName,
  albumCover,
  isOpen,
  handleClose,
}: MusicSaveBottomSheetProps) => {
  const { user } = userStore()
  const { playlists, isPending } = usePlaylistOperations()
  const { searchSpotifyId } = useSpotifySearch()
  const { upsertMusic, addMusicToPlaylistTable } =
    usePlaylistMusicUpsert(albumCover)

  // 특정 플레이리스트 목록을 동작하는 함수
  const addMusiscInPlayList = async (playlistId: string) => {
    try {
      const newMusicName = musicName.replace(/\s*\(.*?\)\s*/g, '').trim()
      const newArtistiName = artistName.replace(/\s*\(.*?\)\s*/g, '').trim()

      const musicData = await searchSpotifyId(newMusicName, newArtistiName)

      // spubase music 테이블에 곡 담아주는 함수 호출
      const musicId = await upsertMusic(musicData!)

      // spubase playlist_music 테이블에 곡 담아주는 함수 호출
      await addMusicToPlaylistTable(musicId as string, playlistId)
    } catch (error) {
      console.error('Error in addMusiscInPlayList:', error)
      throw error
    }
  }

  return (
    <BottomSheet
      height="50%"
      maxWidth="100%"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <header className="flex h-[88px] flex-col justify-center border-b border-opacity-60 px-4">
        <h3 className="title-2 mb-2 truncate font-medium">{musicName}</h3>
        <p className="body-2 truncate opacity-40">{artistName}</p>
      </header>

      <div className="flex flex-col">
        <h1 className="my-3 text-base">플레이리스트 담기</h1>

        <div className="h-full bg-white px-4">
          <Link href="/playlist">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-lg bg-[#C4C4C4]" />
              <p className="caption-1">새 플레이리스트 만들기</p>
            </div>
          </Link>

          {!user && !isPending ? (
            // TODO : 스켈레톤 UI로 변경하기
            <p className="text-center text-gray-500">로딩 중...</p>
          ) : (
            <ul className="scroll-invisible h-full max-h-[calc(50vh-204px)] space-y-2 overflow-y-scroll bg-white py-2">
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  className="flex items-center gap-2"
                  onClick={() => addMusiscInPlayList(playlist.id)}
                >
                  {playlist.latest_song_cover ? (
                    <Image
                      src={playlist.latest_song_cover}
                      width={48}
                      height={48}
                      alt="앨범 커버"
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-[#C4C4C4]" />
                  )}
                  <p className="caption-1">{playlist.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </BottomSheet>
  )
}

export default MusicSaveBottomSheet
