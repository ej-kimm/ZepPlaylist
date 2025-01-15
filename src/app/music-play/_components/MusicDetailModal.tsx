import useSongLike from '@/hooks/useSongLike'
import { userStore } from '@/store/userSlice'
import { Tables } from '@/types/supabase'
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
  lyrics: string
  url: string[]
  playerState: PlayerState
  toggleModal: () => void
  onSeek: (value: number) => void
}

export default function MusicDetailModal({
  toggleModal,
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
    } else {
      // 로그인 안한 유저
      setIsLiked(false)
    }
  }, [songLike])

  return (
    <div className="absolute bottom-0 left-0 h-screen w-full overflow-y-scroll bg-slate-200">
      <div>
        <div>
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>
        <div>
          {!isPending && (
            <button onClick={handleLike}>
              {isLiked ? '💔 좋아요 취소' : '❤ 좋아요'}
            </button>
          )}
          |<button onClick={handleSave}>☑ 담기</button>
        </div>
        <AlbumCover musicDetail={musicDetail} />
        <Lyrics lyrics={lyrics} />
        <ProgressBar
          url={url}
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
        />
        <PlayerControls />
        <button onClick={toggleModal}>모달닫기임시버튼^^..</button>
      </div>
    </div>
  )
}
