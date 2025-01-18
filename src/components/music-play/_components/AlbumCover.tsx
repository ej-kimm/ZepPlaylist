'use client'
import useAlbumCover from '@/hooks/useAlbumCover'
import { Tables } from '@/types/supabase'
import Image from 'next/image'
import { useState } from 'react'

type AlbumCoverProps = {
  musicDetail: Tables<'music'> | undefined
}

export default function AlbumCover({ musicDetail }: AlbumCoverProps) {
  const { title, artist, album_cover } = musicDetail || {}
  const { album, genre, isPending } = useAlbumCover()
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const handleFlip = async () => {
    setIsFlipped((prev) => !prev)
  }

  if (isPending) return <>Loading...</>

  return (
    <div
      className="group h-[266px] w-[266px] [perspective:1000px]"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full cursor-pointer duration-500 [transform-style:preserve-3d] ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute left-0 top-0 h-full w-full [backface-visibility:hidden]">
          <Image
            src={album_cover || '/No cover'}
            alt={title || 'No Title'}
            width={266}
            height={266}
            className="rounded object-cover"
          />
        </div>
        <div className="rotate-y-180 absolute left-0 top-0 h-full w-full [backface-visibility:hidden]">
          <Image
            src={album_cover || '/No cover'}
            alt={title || 'No Title'}
            width={266}
            height={266}
            className="rounded object-cover blur-[10px]"
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-6">
            <p className="caption-1 z-10 text-center text-white">{title}</p>
            <p className="caption-1 z-10 text-center text-white">{artist}</p>
            <p className="caption-1 z-10 text-center text-white">
              {album?.releaseDate}
            </p>
            <p className="caption-1 z-10 text-center text-white">
              {album?.albumName}
            </p>
            {genre.genres[0] && (
              <p className="caption-1 z-10 text-center text-white">
                {genre.genres[0]}
              </p>
            )}
          </div>
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-6 rounded bg-black/35 blur-[10px]" />
        </div>
      </div>
    </div>
  )
}
