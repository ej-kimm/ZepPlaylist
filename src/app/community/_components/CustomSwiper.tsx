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
        280: { slidesPerView: 1.9, spaceBetween: 8}, 
        380: { slidesPerView: 2.1, spaceBetween: 12}, 
        460: { slidesPerView: 2.5, spaceBetween: 16}, 
        540: {slidesPerView: 3, spaceBetween: 20},
        620: {slidesPerView: 3.5, spaceBetween: 24},
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
