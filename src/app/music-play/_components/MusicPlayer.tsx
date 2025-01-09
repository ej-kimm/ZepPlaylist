'use client'
import usePlayer from '@/hooks/usePlayer'
import type { Tables } from '@/types/supabase'
import ReactPlayer from 'react-player'
import MusicDetails from './MusicDetails'
import PlayerControls from './PlayerControls'

// 플레이 리스트 전체 재생(배열) 또는 한 곡만 재생
type MusicPlayerProps = {
  trackId: Tables<'music'>['spotify_id'] | Tables<'music'>['spotify_id'][]
}

const MusicPlayer = ({ trackId }: MusicPlayerProps) => {
  const {
    musicDetail,
    url,
    isPlaying,
    togglePlay,
    playNextTrack,
    playPreviousTrack,
  } = usePlayer(trackId)

  if (!url) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 h-14 w-full rounded-md bg-black">
      <ReactPlayer
        url={url}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
      />
      <div className="flex justify-between">
        <MusicDetails musicDetail={musicDetail} />
        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playPreviousTrack={playPreviousTrack}
          playNextTrack={playNextTrack}
        />
      </div>
    </div>
  )
}

export default MusicPlayer
