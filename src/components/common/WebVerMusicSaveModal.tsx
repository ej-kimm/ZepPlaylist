'use client'

import save from '@/assets/images/close.svg'
import ellipse from '@/assets/images/ellipse.svg'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import usePlaylistOperations from '@/hooks/usePlaylistOperations'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import type { SpotifyTrack } from '@/types/billboradCharts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Modal from './Modal'
import Skeleton from './Skeleton'

type WebVerMusicSaveModalProps = {
  musicData: SpotifyTrack
  musicName: string
  artistName: string
  handleClose: () => void
}

const WebVerMusicSaveModal = ({
  musicName,
  artistName,
  musicData,
  handleClose,
}: WebVerMusicSaveModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { user } = userStore()
  const { playlists, isPending } = usePlaylistOperations()
  const { searchSpotifyId } = useSpotifySearch()
  const { upsertMusic, addMusicToPlaylistTable } = usePlaylistMusicUpsert()
  const { closePlayerModal } = useMusicPlayerStore()

  // console.log(musicData)

  const handleModalButtonClick = () => {
    console.log('모달 버튼')
    setIsModalOpen(true)
    console.log(musicName)
  }
  const handleCloseAllModals = () => {
    closePlayerModal()
    handleClose()
  }

  // 특정 플레이리스트 목록을 동작하는 함수
  const addMusiscInPlayList = async (playlistId: string) => {
    console.log(musicName, artistName)
    try {
      const musicData = await searchSpotifyId(musicName, artistName)
      console.log('musicData', musicData)

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

  const setModalContent = () => {
    return (
      <>
        <header className="flex h-[88px] flex-col justify-center border-b border-opacity-60 px-4">
          <div className="title-2 mb-2 truncate font-medium">{musicName}</div>
          <div className="body-2 truncate opacity-40">{artistName}</div>
        </header>

        <div className="flex flex-col">
          <div className="my-3 text-base">플레이리스트 담기</div>

          <div className="n h-full bg-white px-4">
            <Link href="/playlist" onClick={handleCloseAllModals}>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#C4C4C4]">
                  <div className="font-pretendard text-lg text-white">+</div>
                </div>
                <div className="caption-1">새 플레이리스트 만들기</div>
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
      </>
    )
  }

  const onCancel = () => {}

  return (
    <div className={clsx('desktop:block hidden')}>
      <div
        onClick={(e) => {
          e.stopPropagation()
          handleModalButtonClick()
        }}
      >
        <div className="relative h-9 w-9">
          <div
            className="absolute inset-0 bg-[image:var(--image-ellipse)] bg-cover bg-center bg-no-repeat"
            style={
              {
                '--image-ellipse': `url(${ellipse.src})`,
              } as React.CSSProperties
            }
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src={save} alt="save Options" width={24} height={24} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={''}
        content={setModalContent()}
        type={'none'}
        className={clsx('')}
        onConfirm={handleCloseAllModals}
        onCancel={onCancel}
      />
    </div>
  )
}

export default WebVerMusicSaveModal
