import likeFalse from '@/assets/images/likeFalse.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import save from '@/assets/images/save.svg'
import useSongLike from '@/hooks/useSongLike'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import { Tables } from '@/types/supabase'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AlbumCover from './AlbumCover'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

type PlayerState = {
  played: number
  duration: number
  ready: boolean
}

type MusicDetailModalProps = {
  musicDetail: Tables<'music'> | undefined
  lyrics: string
  url: string[]
  playerState: PlayerState
  onSeek: (value: number) => void
}

export default function MusicDetailModal({
  musicDetail,
  url,
  playerState: { played, duration, ready },
  onSeek,
}: MusicDetailModalProps) {
  const { title, artist } = musicDetail || {}
  const { user } = userStore()
  const user_id = user?.id || ''
  const { isPlayerModalOpen } = useMusicPlayerStore()
  const { songLike, isPending, updateLike } = useSongLike({ user_id })

  const [isFullLyrics] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const handleLike = async () => {
    if (!user_id) {
      alert('로그인을 해주세요!')
      return
    }
    updateLike.mutate({ user_id })
  }

  const handleSave = async () => {}

  useEffect(() => {
    // 로그인 한 유저
    if (user_id && songLike !== undefined) {
      setIsLiked(songLike)
    }
  }, [songLike, user_id])

  return (
    <section
      className={`fixed bottom-0 left-0 z-player-modal h-navBar-calc w-full bg-white px-6 pb-5 transition-all duration-500 ease-out ${isPlayerModalOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex h-full flex-col items-center justify-between">
        <header>
          <h3 className="title-1 mb-2 text-center">{title}</h3>
          <p className="caption-1 text-center">{artist}</p>
        </header>
        <div className="flex items-center justify-center gap-[23px]">
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
        {!isFullLyrics && <AlbumCover musicDetail={musicDetail} />}
        {/* <Lyrics
          lyrics={lyrics}
          isFullLyrics={isFullLyrics}
          onClickLyrics={handleLClickLyrics}
        /> */}
        <ProgressBar
          url={url}
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
        />
        <PlayerControls />
      </div>
    </section>
  )
}
