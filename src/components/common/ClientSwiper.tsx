'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type ClientSwiperProps = {
  items: { id: string; content: React.ReactNode }[]
}

const ClientSwiper: React.FC<ClientSwiperProps> = ({ items }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]} // 좌우 화살표, 슬라이드 자동 넘어가기
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }} // 딜레이는 5초가 적당한 듯?
      breakpoints={{
        // 화면 크기에 따라 보여지는 슬라이드 수 변경 (반응형 고려)
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="mySwiper"
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
