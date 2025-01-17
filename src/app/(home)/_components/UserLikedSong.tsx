'use client'

import { userStore } from '@/store/userSlice'
import type { LikedSong, UserLikedSongDetails } from '@/types/LikedSongs'
import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import LikeSongItem from './LikeSongItem'

const UserLikedSong = () => {
  const { user } = userStore((state) => state)
  const [myLikedSong, setMyLikedSong] = useState<LikedSong[]>([])
  const [matchedMusicInfo, setMatchedMusicInfo] = useState<
    UserLikedSongDetails[]
  >([])

  useEffect(() => {
    const fetchSongLikesAndMusic = async () => {
      if (user) {
        try {
          // 사용자가 좋아요한 노래 가져오기
          const { data: likedSongs, error: likeError } = await supabase
            .from('song_like')
            .select('*')
            .eq('user_id', user.id)

          if (likeError) throw new Error(likeError.message)

          setMyLikedSong(likedSongs)

          // 좋아요한 노래의 music_id 목록 생성
          const musicIds = likedSongs.map((song) => song.music_id)

          // 음악 테이블에서 일치하는 음악 정보 가져오기
          const { data: musicData, error: musicError } = await supabase
            .from('music')
            .select('*')
            .in('spotify_id', musicIds)

          if (musicError) throw new Error(musicError.message)

          // 좋아요한 노래와 음악 정보 매칭
          const matchedMusic = likedSongs.map((likedSong) => {
            const musicInfo = musicData.find(
              (music) => music.spotify_id === likedSong.music_id,
            )
            return { ...likedSong, ...musicInfo }
          })

          setMatchedMusicInfo(matchedMusic)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchSongLikesAndMusic()
  }, [user])

  return (
    <div>
      {!user ? (
        <></>
      ) : (
        <div className="w-full">
          <h2 className="my-4">내가 좋아요 한 곡</h2>
          <ul className="mb-14 flex space-x-4 overflow-x-auto">
            {matchedMusicInfo.map((item) => (
              <LikeSongItem item={item} key={item.id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserLikedSong
