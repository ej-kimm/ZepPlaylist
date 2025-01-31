'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type LatestAlbumProps = {
  latestAlbumList: SpotifyApi.AlbumObjectSimplified[]
}

function LatestAlbumItmes({ latestAlbumList }: LatestAlbumProps) {
  return (
    <ul className="flex space-x-4">
      <Swiper
        spaceBetween={14}
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
                <div className="w-32 text-left">
                  <Image
                    src={album.images[0].url}
                    width={100}
                    height={100}
                    alt={album.name}
                    priority
                    className="h-auto w-full rounded-lg shadow-md"
                  />
                  <h3 className="caption-1 mt-2 truncate">{album.name}</h3>
                  <p className="caption-2 truncate text-gray-500">
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
