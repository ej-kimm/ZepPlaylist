'use client'
import { Skeleton } from '@/components/common'
import useAlbumCover from '@/hooks/useAlbumCover'
import { Tables } from '@/types/supabase'
import clsx from 'clsx'
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

  if (isPending) return <Skeleton width="266px" height="266px" />

  return (
    <div
      className={clsx(
        'group h-[266px] w-[266px] [perspective:1000px]',
        'desktop:h-[433px] desktop:w-[433px]',
      )}
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
            width={433}
            height={433}
            className={clsx(
              'h-[266px] w-[266px] rounded object-cover',
              'desktop:h-[433px] desktop:w-[433px] desktop:rounded-lg',
            )}
          />
        </div>
        <div className="rotate-y-180 absolute left-0 top-0 h-full w-full [backface-visibility:hidden]">
          <Image
            src={album_cover || '/No cover'}
            alt={title || 'No Title'}
            width={433}
            height={433}
            className={clsx(
              'h-[266px] w-[266px] rounded object-cover blur-[10px]',
              'desktop:h-[433px] desktop:w-[433px] desktop:rounded-lg desktop:blur-[18px]',
            )}
          />
          <div
            className={clsx(
              'absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-6',
              'desktop:gap-[34px]',
            )}
          >
            <p
              className={clsx(
                'caption-1 z-10 text-center text-white',
                'desktop:text-[26px]',
              )}
            >
              {title}
            </p>
            <p
              className={clsx(
                'caption-1 z-10 text-center text-white',
                'desktop:text-[26px]',
              )}
            >
              {artist}
            </p>
            <p
              className={clsx(
                'caption-1 z-10 text-center text-white',
                'desktop:text-[26px]',
              )}
            >
              {album?.releaseDate}
            </p>
            <p
              className={clsx(
                'caption-1 z-10 text-center text-white',
                'desktop:text-[26px]',
              )}
            >
              {album?.albumName}
            </p>
            {genre.genres[0] && (
              <p
                className={clsx(
                  'caption-1 z-10 text-center text-white',
                  'desktop:text-[26px]',
                )}
              >
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
