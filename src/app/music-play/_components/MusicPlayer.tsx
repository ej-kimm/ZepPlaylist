'use client'
import usePlayer from '@/hooks/usePlayer'
import type { Tables } from '@/types/supabase'
import Image from 'next/image'
import ReactPlayer from 'react-player'

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
        <div className="flex">
          <Image
            // TODO : src default 커버 설정하기
            src={musicDetail?.album_cover || '/No cover'}
            alt={musicDetail?.title || 'No Title'}
            width={30}
            height={30}
          />
          <h3 className="text-white">{musicDetail?.title}</h3>
          <p className="text-white">{musicDetail?.artist}</p>
        </div>
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
    </div>
  )
}

export default MusicPlayer
