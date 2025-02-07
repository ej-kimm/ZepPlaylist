'use client'

import likeFalse from '@/assets/images/heart.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import usePlaylistOperations from '@/hooks/usePlaylistOperations'
import useScrollLock from '@/hooks/useScrollLock'
import useSongLike from '@/hooks/useSongLike'
import { userStore } from '@/store/userSlice'
import type { SpotifyTrack } from '@/types/billboradCharts'
import Image from 'next/image'
import Link from 'next/link'
import Modal from './Modal'
import Skeleton from './Skeleton'

type MusicSaveModalProps = {
  musicName: string
  artistName: string
  isOpen: boolean
  handleClose: () => void
  musicData: SpotifyTrack
}

const MusicSaveModal = ({
  musicName,
  artistName,
  isOpen,
  handleClose,
  musicData,
}: MusicSaveModalProps) => {
  const { user } = userStore()
  const user_id = user?.id || ''
  const { playlists, isPending } = usePlaylistOperations()
  const { upsertMusic, addMusicToPlaylistTable, modal } =
    usePlaylistMusicUpsert()
  const { songLike, updateLike } = useSongLike({
    user_id,
    spotify_id: musicData?.id,
  })
  useScrollLock(isOpen)

  // 특정 플레이리스트 목록을 동작하는 함수
  const addMusiscInPlayList = async (
    playlistId: string,
    musicData: SpotifyTrack,
  ) => {
    try {
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
    modal.closeModal()
    handleClose()
  }

  const handleLikeClick = async () => {
    await upsertMusic(musicData)
    updateLike.mutate({ user_id })
  }

  return (
    <>
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

          <div
            className="absolute right-10 top-10 cursor-pointer"
            onClick={handleLikeClick}
          >
            <Image
              src={songLike ? likeTrue : likeFalse}
              width={24}
              height={24}
              className="h-6 w-6"
              alt="heart"
            />
          </div>
        </div>

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
      </Modal>

      <Modal
        isOpen={modal.isModalOpen}
        title={modal.modalTitle}
        content={modal.modalContent}
        type="single"
        onCancel={handleCloseAllModals}
        onConfirm={handleCloseAllModals}
        className="desktop:w-[434px]"
      />
    </>
  )
}

export default MusicSaveModal
