import likeFalse from '@/assets/images/likeFalse.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import save from '@/assets/images/save.svg'
import useSongLike from '@/hooks/useSongLike'
import { userStore } from '@/store/userSlice'
import { Tables } from '@/types/supabase'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AlbumCover from './AlbumCover'
import Lyrics from './Lyrics'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

type PlayerState = {
  played: number
  duration: number
  ready: boolean
}

type MusicDetailModalProps = {
  musicDetail: Tables<'music'> | undefined
  isModalOpen: boolean
  lyrics: string
  url: string[]
  playerState: PlayerState
  toggleModal: () => void
  onSeek: (value: number) => void
}

export default function MusicDetailModal({
  toggleModal,
  isModalOpen,
  musicDetail,
  url,
  lyrics,
  playerState: { played, duration, ready },
  onSeek,
}: MusicDetailModalProps) {
  const { title, artist } = musicDetail || {}
  const { user } = userStore()
  const user_id = user?.id || ''
  const { songLike, isPending, updateLike } = useSongLike({ user_id })

  const [isFullLyrics, setIsFullLyrics] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const handleLike = async () => {
    if (!user_id) {
      alert('로그인을 해주세요!')
      return
    }
    updateLike.mutate({ user_id })
  }

  const handleSave = async () => {}

  const handleLClickLyrics = () => setIsFullLyrics((prev) => !prev)

  useEffect(() => {
    // 로그인 한 유저
    if (user_id && songLike !== undefined) {
      setIsLiked(songLike)
    }
  }, [songLike])

  return (
    <section
      className={`h-navBar-calc z-player-modal fixed bottom-0 left-0 w-full bg-slate-300 px-6 transition-all duration-500 ease-out ${isModalOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex h-full max-h-[620px] flex-col items-center">
        <div className="w-full max-w-[266px] py-[10px]">
          <div className="flex flex-col items-center">
            <h3 className="title-1 text-center">{title}</h3>
            <p className="caption-1 text-center">{artist}</p>
            <div className="flex gap-6">
              {!isPending && (
                <button onClick={handleLike}>
                  <Image
                    src={isLiked ? likeTrue : likeFalse}
                    width={16}
                    height={16}
                    alt={isLiked ? 'likeTrue' : 'likeFalse'}
                  />
                </button>
              )}
              {/* TODO : 플레이리스트 추가 기능 해야함 */}
              <button onClick={handleSave}>
                <Image src={save} width={16} height={16} alt="save" />
              </button>
            </div>
          </div>
          {!isFullLyrics && <AlbumCover musicDetail={musicDetail} />}
          <Lyrics
            lyrics={lyrics}
            isFullLyrics={isFullLyrics}
            onClickLyrics={handleLClickLyrics}
          />
        </div>
        <ProgressBar
          url={url}
          isModalOpen={isModalOpen}
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
        />
        <PlayerControls isModalOpen={isModalOpen} />
        <button onClick={toggleModal}>모달닫기임시버튼^^..</button>
      </div>
    </section>
  )
}
