'use client'

import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import usePlaylistOperations from '@/hooks/usePlaylistOperations'
import useScrollLock from '@/hooks/useScrollLock'
import useSongLike from '@/hooks/useSongLike'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './Modal'
import Skeleton from './Skeleton'

type MusicSaveModalProps = {
  musicName: string
  artistName: string
  isOpen: boolean
  handleClose: () => void
}

const MusicSaveModal = ({
  musicName,
  artistName,
  isOpen,
  handleClose,
}: MusicSaveModalProps) => {
  const { user } = userStore()
  const { playlists, isPending } = usePlaylistOperations()
  const { upsertMusic, addMusicToPlaylistTable } = usePlaylistMusicUpsert()
  const { closePlayerModal } = useMusicPlayerStore()
  const { searchSpotifyId } = useSpotifySearch()
  const { updateLike } = useSongLike({ user_id: user?.id! })
  useScrollLock(isOpen)

  // 특정 플레이리스트 목록을 동작하는 함수
  const addMusiscInPlayList = async (playlistId: string) => {
    try {
      const musicData = await searchSpotifyId(musicName, artistName)
      // spubase music 테이블에 곡 담아주는 함수 호출
      const musicId = await upsertMusic(musicData!)

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
    <Modal
      isOpen={isOpen}
      onCancel={handleClose}
      title={musicName}
      content={artistName}
      type="none"
      className="desktop:w-[532px]"
    >
      <div className="border-t border-black border-opacity-60">
        <h2 className="body-2 py-3">플레이리스트 담기</h2>

        <div className="h-full bg-white px-4 py-[26px]">
          <Link href="/playlist" onClick={handleCloseAllModals}>
            <div className="mb-[23px] flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#C4C4C4]">
                <span className="font-pretendard text-lg text-white">+</span>
              </div>
              <p className="caption-1">새 플레이리스트 만들기</p>
            </div>
          </Link>

          {!user && isPending ? (
            <div className="flex items-center gap-[23px]">
              <Skeleton
                width="48px"
                height="48px"
                borderRadius="8px"
                className="flex-shrink-0"
              />
              <Skeleton height="16px" className="flex-grow" />
            </div>
          ) : (
            <ul className="scroll-invisible h-full max-h-[280px] cursor-pointer space-y-[23px] overflow-y-scroll bg-white">
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
    </Modal>
  )
}

export default MusicSaveModal
