import useSongLike from '@/hooks/useSongLike'
import { Tables } from '@/types/supabase'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Lyrics from './Lyrics'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

type PlayerState = {
  isPlaying: boolean
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
  togglePlay: () => void
  playPreviousTrack: () => void
  playNextTrack: () => void
  onSeek: (value: number) => void
}

export default function MusicDetailModal({
  toggleModal,
  musicDetail,
  url,
  lyrics,
  playerState: { isPlaying, played, duration, ready },
  togglePlay,
  playPreviousTrack,
  playNextTrack,
  onSeek,
}: MusicDetailModalProps) {
  const { spotify_id = '', title, artist, album_cover } = musicDetail || {}
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const user_id = '01aa6bb6-670f-4776-a4d9-b25126a4b085' // TODO : user_id 변경
  const { songLike, isPending, updateLike } = useSongLike({
    user_id,
    music_id: spotify_id,
  })

  const handleLike = async () => {
    updateLike.mutate({ music_id: spotify_id, user_id })
  }

  const handleSave = async () => {}

  useEffect(() => {
    if (songLike !== undefined) {
      setIsLiked(songLike)
    }
  }, [songLike])

  if (isPending) return <>Loading....</>

  return (
    <div className="absolute bottom-0 left-0 h-screen w-full overflow-y-scroll bg-slate-200">
      <div>
        <div>
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>
        <div>
          <button onClick={handleLike}>
            {isLiked ? '💔 좋아요 취소' : '❤ 좋아요'}
          </button>
          |<button onClick={handleSave}>☑ 담기</button>
        </div>
        <Image
          src={album_cover || '/No cover'}
          alt={title || 'No Title'}
          width={200}
          height={200}
        />
        <Lyrics lyrics={lyrics} />
        <ProgressBar
          url={url}
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
        />
        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playPreviousTrack={playPreviousTrack}
          playNextTrack={playNextTrack}
        />
        <button onClick={toggleModal}>모달닫기임시버튼^^..</button>
      </div>
    </div>
  )
}
