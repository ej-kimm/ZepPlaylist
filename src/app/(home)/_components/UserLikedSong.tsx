'use client'

import likeTrue from '@/assets/images/likeTrue.svg'
import { userStore } from '@/store/userSlice'
import type { UserLikedSongDetails } from '@/types/LikedSongs'
import { supabase } from '@/utils/supabase/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LikeSongItem from './LikeSongItem'

const UserLikedSong = () => {
  const { user } = userStore((state) => state)
  const [matchedMusicInfo, setMatchedMusicInfo] = useState<
    UserLikedSongDetails[]
  >([])

  useEffect(() => {
    const fetchSongLikesAndMusic = async () => {
      if (user) {
        try {
          const { data: likedSongs, error: likeError } = await supabase
            .from('song_like')
            .select('*')
            .eq('user_id', user.id)

          if (likeError) throw new Error(likeError.message)

          const musicIds = likedSongs.map((song) => song.music_id)

          const { data: musicData, error: musicError } = await supabase
            .from('music')
            .select('*')
            .in('spotify_id', musicIds)

          if (musicError) throw new Error(musicError.message)

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

  if (!user) return null

  return (
    <div className="w-full">
      <h2 className="title-2 mb-4">내가 좋아요 한 곡</h2>
      {matchedMusicInfo.length === 0 ? (
        <div className="flex">
          좋아하는 곡을 담아 주세요...
          <Image src={likeTrue} alt="Like Button" width={16} height={16} />
        </div>
      ) : (
        <ul className="scroll-invisible flex space-x-4 overflow-x-auto">
          {matchedMusicInfo.map((item) => (
            <LikeSongItem item={item} key={item.id} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserLikedSong
