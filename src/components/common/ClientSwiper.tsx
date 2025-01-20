'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type ClientSwiperProps = {
  items: { id: string; content: React.ReactNode }[]
}

const ClientSwiper: React.FC<ClientSwiperProps> = ({ items }) => {
  return (
    <Swiper
      modules={[Autoplay]} 
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div>{item.content}</div> 
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ClientSwiper