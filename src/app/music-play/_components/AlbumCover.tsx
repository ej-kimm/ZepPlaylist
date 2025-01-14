'use client'
import useAlbumCover from '@/hooks/useAlbumCover'
import { Tables } from '@/types/supabase'
import Image from 'next/image'
import { useState } from 'react'

type AlbumCoverProps = {
  musicDetail: Tables<'music'> | undefined
}

export default function AlbumCover({ musicDetail }: AlbumCoverProps) {
  const { spotify_id = '', title, artist, album_cover } = musicDetail || {}
  const { album, genre, isPending } = useAlbumCover(spotify_id)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const handleFlip = async () => {
    setIsFlipped((prev) => !prev)
  }

  if (isPending) return <>Loading...</>

  return (
    <div
      className="group h-[500px] w-[500px] [perspective:1000px]"
      onClick={handleFlip}
    >
      <div className="group-hover:rotate-y-180 relative h-full w-full duration-500 [transform-style:preserve-3d]">
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-white [backface-visibility:hidden]">
          <Image
            src={album_cover || '/No cover'}
            alt={title || 'No Title'}
            width={500}
            height={500}
          />
        </div>
        <div className="rotate-y-180 absolute left-0 top-0 z-10 flex h-full w-full flex-col bg-white [backface-visibility:hidden]">
          <h3>{title}</h3>
          <p>{artist}</p>
          <p>발매일: {album?.releaseDate}</p>
          <p>앨범명: {album?.albumName}</p>
          <p>장르: {genre.genres}</p>
        </div>
      </div>
    </div>
  )
}
