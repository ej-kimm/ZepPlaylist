'use client'

import useIsDesktop from '@/hooks/useIsDesktop'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type LatestAlbumProps = {
  latestAlbumList: SpotifyApi.AlbumObjectSimplified[]
}

function LatestAlbumItmes({ latestAlbumList }: LatestAlbumProps) {
  const isDesktop = useIsDesktop()

  return (
    <ul className="flex">
      <Swiper
        spaceBetween={isDesktop ? 26 : 12}
        slidesPerView="auto"
        autoplay={{ delay: 10000 }}
        loop={false}
        modules={[Autoplay]}
        // breakpoints={{
        //   280: { slidesPerView: 1.5, spaceBetween: 8 },
        //   380: { slidesPerView: 2.1, spaceBetween: 10 },
        //   460: { slidesPerView: 2.5, spaceBetween: 13 },
        //   540: { slidesPerView: 3, spaceBetween: 15 },
        //   620: { slidesPerView: 3.5, spaceBetween: 24 },
        // }}
        className="flex items-center"
      >
        {latestAlbumList.map((album, label) => (
          <SwiperSlide key={label} style={{ width: 'auto' }}>
            <Link href={`/latest-album/${album.id}`}>
              <li key={album.id} className="flex-none">
                <div
                  className={clsx(
                    'flex w-[96px] flex-col gap-1 text-left',
                    'desktop:w-[160px] desktop:gap-0',
                  )}
                >
                  <Image
                    src={album.images[0].url}
                    width={96}
                    height={96}
                    alt={album.name}
                    priority
                    className={clsx(
                      'h-[96px] w-[96px] rounded-lg object-cover shadow-md desktop:h-[160px] desktop:w-[160px]',
                      'desktop:mb-2 desktop:rounded-3xl',
                    )}
                  />
                  <h3
                    className={clsx(
                      'caption-1 truncate font-medium',
                      'desktop:body-1 desktop:mb-1 desktop:px-2',
                    )}
                  >
                    {album.name}
                  </h3>
                  <p
                    className={clsx(
                      'caption-2 truncate text-opacity-60',
                      'desktop:caption-1 desktop:px-2 desktop:text-opacity-60',
                    )}
                  >
                    {album.artists[0].name}
                  </p>
                </div>
              </li>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </ul>
  )
}

export default LatestAlbumItmes
