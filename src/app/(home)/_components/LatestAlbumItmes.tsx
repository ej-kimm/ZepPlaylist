'use client'

import leftArrow from '@/assets/images/leftArrow.svg'
import rightArrow from '@/assets/images/rightArrow.svg'
import useIsDesktop from '@/hooks/useIsDesktop'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type LatestAlbumProps = {
  latestAlbumList: SpotifyApi.AlbumObjectSimplified[]
}

function LatestAlbumItmes({ latestAlbumList }: LatestAlbumProps) {
  const isDesktop = useIsDesktop()

  const swiperRef = useRef<SwiperType | null>(null)

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext()
  }, [])

  return (
    <ul className="flex gap-3">
      {isDesktop && (
        <button type="button" className="" onClick={handlePrev}>
          <Image
            src={leftArrow}
            width={24}
            height={24}
            alt={'leftArrow'}
            className={clsx('flex h-[70px] w-[70px]')}
          />
        </button>
      )}

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
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
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
      {isDesktop && (
        <button type="button" className="" onClick={handleNext}>
          <Image
            src={rightArrow}
            width={24}
            height={24}
            alt={'rightArrow'}
            className={clsx('flex h-[70px] w-[70px]')}
          />
        </button>
      )}
    </ul>
  )
}

export default LatestAlbumItmes
