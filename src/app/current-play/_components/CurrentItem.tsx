'use client'
import type { Tables } from '@/types/supabase'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const CurrentItem = () => {
  const [currentTracks, setCurrentTracks] = useState<Tables<'music'>[]>([])

  useEffect(() => {
    const nowTracks = JSON.parse(
      localStorage.getItem('current-playlist') || '[]',
    )
    setCurrentTracks(nowTracks)
  }, [])
  const totalPlayTime = currentTracks.reduce(
    (acc, track) => acc + track.play_time,
    0,
  )
  console.log('first', totalPlayTime)
  const totalTime = Math.floor(totalPlayTime / 60000)

  return (
    <div>
      <h2>재생목록</h2>
      <h3>곡 수: {currentTracks.length}개</h3>
      <h2>재생시간: {totalTime}분</h2>
      <ul>
        {currentTracks.length > 0 ? (
          currentTracks.map((p, _) => (
            <li key={_}>
              <Image src={p.album_cover} alt={p.title} width="50" height="50" />
              <div>
                <p>{p.title}</p> {p.artist}
              </div>
            </li>
          ))
        ) : (
          <p>최근 재생한 곡이 없습니다.</p>
        )}
      </ul>
    </div>
  )
}

export default CurrentItem
