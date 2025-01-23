'use client'

import whitePlay from '@/assets/images/whitePlay.svg'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'

type PlayAllBtnProps = {
  top100ChartMusic: {
    songName: string
    artistName: string
    albumCover: string
  }[]
}

// Vercel Cron Jobs로 1시간 마다 chart 테이블에 데이터를 넣어줘서
// 한시간에 한번만 api호출하여 데이터를 적재하여 사용하면 호출 비용을 줄일 수 있다.
// https://www.junetein.com/blog/Next-js-cron-job
const PlayAllBtn = ({ top100ChartMusic }: PlayAllBtnProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  const { searchSpotifyId } = useSpotifySearch()

  const { upsertMusic } = usePlaylistMusicUpsert()

  const handlePlayAll = () => {
    const musicData = top100ChartMusic.map(async (item) => {
      const data = await searchSpotifyId(item.songName, item.artistName)
      return data
    })

    Promise.all(musicData)
      .then((resolvedData) => {
        return resolvedData
          .filter((data) => !!data)
          .map((newMusicData) => {
            upsertMusic(newMusicData)
            return newMusicData.id
          })
      })
      .then((ids) => {
        if (!isPlayerOpen) setPlayerOpen()
        setTrackIds(ids)
        play()
      })
  }
  return (
    <button onClick={handlePlayAll} className="mb-3 flex items-center gap-1">
      <Image
        src={whitePlay}
        alt="전체 재생"
        width={16}
        height={16}
        style={{ flexShrink: 0 }}
      />
      전체 재생
    </button>
  )
}

export default PlayAllBtn
