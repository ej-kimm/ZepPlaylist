'use client'

import React from 'react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type CustomSwiperProps = {
  items: { id: string; content: React.ReactNode }[]
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({ items }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        280: { slidesPerView: 1.5, spaceBetween: 1 },
        300: { slidesPerView: 1.7, spaceBetween: 1 },
        320: { slidesPerView: 1.9, spaceBetween: 1 },
        340: { slidesPerView: 2, spaceBetween: 2 },
        380: { slidesPerView: 2.3, spaceBetween: 1 },
        420: { slidesPerView: 2.5, spaceBetween: 1 },
        460: { slidesPerView: 2.7, spaceBetween: 1 },
        500: { slidesPerView: 2.8, spaceBetween: 1 },
        540: { slidesPerView: 3, spaceBetween: 2 },
        580: { slidesPerView: 3.2, spaceBetween: 1 },
        620: { slidesPerView: 3.5, spaceBetween: 1 },
        660: { slidesPerView: 4, spaceBetween: 1 },
        720: { slidesPerView: 5, spaceBetween: 1 },
        1200: { slidesPerView: 8},
      }}
    >
      {items.map((item) => (
        <SwiperSlide
          key={item.id}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: '92%', height: '100%' }}>{item.content}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomSwiper
