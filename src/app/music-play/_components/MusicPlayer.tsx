'use client'
import usePlayer from '@/hooks/usePlayer'
import type { Tables } from '@/types/supabase'
import ReactPlayer from 'react-player'

type MusicPlayerProps = {
  trackIds: Tables<'music'>['spotify_id'][]
}

const MusicPlayer = ({ trackIds }: MusicPlayerProps) => {
  const { url, isPlaying, togglePlay, playNextTrack, playPreviousTrack } =
    usePlayer(trackIds)

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
      <div>
        <button className="text-white" onClick={playPreviousTrack}>
          &lt;&lt;
        </button>
        <button className="text-white" onClick={togglePlay}>
          {isPlaying ? 'PLAY' : 'PAUSE'}
        </button>
        <button className="text-white" onClick={playNextTrack}>
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer
