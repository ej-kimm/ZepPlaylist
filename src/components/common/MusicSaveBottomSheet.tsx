'use client'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import usePlaylistOperations from '@/hooks/usePlaylistOperations'
import useScrollLock from '@/hooks/useScrollLock'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import type { SpotifyTrack } from '@/types/billboradCharts'
import Image from 'next/image'
import Link from 'next/link'
import BottomSheet from './BottomSheet'
import Skeleton from './Skeleton'

type MusicSaveBottomSheetProps = {
  isOpen: boolean
  handleClose: () => void
  musicData: SpotifyTrack
}

const MusicSaveBottomSheet = ({
  isOpen,
  handleClose,
  musicData,
}: MusicSaveBottomSheetProps) => {
  const { user } = userStore()
  const { playlists, isPending } = usePlaylistOperations()
  const { upsertMusic, addMusicToPlaylistTable } = usePlaylistMusicUpsert()
  const { closePlayerModal } = useMusicPlayerStore()
  useScrollLock(isOpen)

  // 특정 플레이리스트 목록을 동작하는 함수
  const addMusiscInPlayList = async (
    playlistId: string,
    musicData: SpotifyTrack,
  ) => {
    try {
      // spubase music 테이블에 곡 담아주는 함수 호출
      const musicId = await upsertMusic(musicData)

      // spubase playlist_music 테이블에 곡 담아주는 함수 호출
      await addMusicToPlaylistTable(musicId as string, playlistId)

      handleClose()
    } catch (error) {
      console.error('Error in addMusiscInPlayList:', error)
      throw error
    }
  }

  const handleCloseAllModals = () => {
    closePlayerModal()
    handleClose()
  }

  return (
    <BottomSheet
      height="auto"
      maxWidth="100%"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <header className="flex h-[88px] flex-col justify-center border-b border-opacity-60 px-4">
        <h3 className="title-2 mb-2 truncate font-medium">{musicData.title}</h3>
        <p className="body-2 truncate opacity-40">{musicData.artist}</p>
      </header>

      <div className="flex flex-col">
        <h1 className="my-3 text-base">플레이리스트 담기</h1>

        <div className="h-full bg-white px-4">
          <Link href="/playlist" onClick={handleCloseAllModals}>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#C4C4C4]">
                <span className="font-pretendard text-lg text-white">+</span>
              </div>
              <p className="caption-1">새 플레이리스트 만들기</p>
            </div>
          </Link>

          {!user && isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton
                width="48px"
                height="48px"
                borderRadius="8px"
                className="flex-shrink-0"
              />
              <Skeleton height="16px" className="flex-grow" />
            </div>
          ) : (
            <ul className="scroll-invisible h-full max-h-[calc(50vh-204px)] space-y-2 overflow-y-scroll bg-white">
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  className="flex items-center gap-2"
                  onClick={() => addMusiscInPlayList(playlist.id, musicData)}
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
