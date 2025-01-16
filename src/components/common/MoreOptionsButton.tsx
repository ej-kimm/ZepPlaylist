'use client'

import type { PlaylistRow } from '@/types/playlist'
import { supabase } from '@/utils/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Swal from 'sweetalert2'
import BottomSheet from './BottomSheet'

type ArtistProps = {
  musicName: string
  artistName: string
  songImage: string
  user: UserState | null
  onClickMoreOptionBtn: () => Promise<playListData>
  playlists: PlaylistRow[]
}

type playListData = {
  artist: string
  id: string
  title: string
}

type UserState = {
  email: string
  id: string
  nickname: string
  profile_image: string | null
}

const MoreOptionsButton = ({
  musicName,
  artistName,
  songImage,
  user,
  onClickMoreOptionBtn,
  playlists,
}: ArtistProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenBottomSheet = async () => {
    setIsOpen(true)
    try {
      await onClickMoreOptionBtn()
    } catch (error) {
      console.error('Error in handleOpenBottomSheet:', error)
    }
  }

  const addMusiscInPlayList = async (playlistId: string) => {
    try {
      const data = await onClickMoreOptionBtn()
      const musicId = await insertMusic(data)
      await insertPlayList(musicId as string, playlistId)
    } catch (error) {
      console.error('Error in addMusiscInPlayList:', error)
      throw error
    }
  }

  const insertMusic = async (data: playListData) => {
    if (data) {
      const { data: isMusic, error: isMusicError } = await supabase
        .from('music')
        .select('*')
        .eq('spotify_id', data.id)

      if (isMusic?.length === 0) {
        // First, insert the music into the 'music' table
        const { data: insertedData, error: insertError } = await supabase
          .from('music')
          .insert({
            spotify_id: data.id,
            title: data.title,
            artist: data.artist,
            album_cover: songImage,
            play_time: 0,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (insertError) {
          console.error('Error inserting new music:', insertError)
          return null
        }

        console.log('Insert successful:', insertedData)

        const musicId = insertedData.spotify_id
        return musicId
      } else {
        const { data: updatedData, error: updateError } = await supabase
          .from('music')
          .update({ created_at: new Date().toISOString() })
          .eq('spotify_id', data.id)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating create_at:', updateError)
          return null
        }

        const musicId = updatedData.spotify_id
        return musicId
      }
    } else {
      console.log('No data returned from onClickMoreOptionBtn')
    }
  }

  const insertPlayList = async (musicId: string, playlistId: string) => {
    if (musicId) {
      const { data: isPlayList, error: isMusicError } = await supabase
        .from('playlist_music')
        .select('music_id')
        .eq('playlist_id', playlistId)

      const isMusicId = isPlayList
        ?.map((item) => item.music_id)
        .some((item) => item === musicId)

      if (isMusicId) {
        Swal.fire(
          '취소',
          '해당 곡은 이미 플레이리스트에 저장된 곡입니다. ',
          'warning',
        )
        return { success: true, musicId }
      } else {
        const { error: insertPlaylistError } = await supabase
          .from('playlist_music')
          .insert({
            playlist_id: playlistId,
            music_id: musicId,
          })

        if (insertPlaylistError) {
          console.error('Error adding music to playlist:', insertPlaylistError)
          return null
        }
        Swal.fire(
          '완료',
          '해당 곡이 플레이리스트에 저장되었습니다. ',
          'success',
        )
      }
    }
    return { success: true, musicId }
  }

  return (
    <>
      <button
        type="button"
        className="mt-0 w-fit bg-white"
        onClick={handleOpenBottomSheet}
      >
        <div className="flex gap-[2px]">
          <div className="h-1 w-1 rounded-full bg-gray-800" />
          <div className="h-1 w-1 rounded-full bg-gray-800" />
          <div className="h-1 w-1 rounded-full bg-gray-800" />
        </div>
      </button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        height="50%"
        maxWidth="100%"
      >
        <div>
          <div className="m-2">
            <h3 className="truncate text-base font-medium text-gray-900">
              {musicName}
            </h3>
            <p className="truncate text-sm text-gray-500">{artistName}</p>
          </div>
          <div className="border-t-2 border-gray-300">
            <h1 className="m-2">플레이리스트 담기</h1>

            <Link href={'/playlist'}>
              <div className="relative flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded">
                  <Image
                    src={songImage}
                    alt="앨범 커버"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p>새 플레이리스트 만들기</p>
              </div>
            </Link>
            {!user && playlists.length > 0 ? (
              <p className="text-center text-gray-500">로딩 중...</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {playlists.map((playlist) => (
                  <li
                    key={playlist.id}
                    onClick={() => addMusiscInPlayList(playlist.id)}
                  >
                    <div className="relative flex items-center space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded">
                        {playlist.latest_song_cover ? (
                          <Image
                            src={playlist.latest_song_cover}
                            alt="앨범 커버"
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                            No Cover
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{playlist.name}</p>
                        <p className="text-sm text-gray-500">
                          {playlist.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </BottomSheet>
    </>
  )
}

export default MoreOptionsButton
