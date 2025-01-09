'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

type ClientSwiperProps = {
  items: { id: string; content: React.ReactNode }[];
};

const ClientSwiper: React.FC<ClientSwiperProps> = ({ items }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]} // 좌우 화살표, 슬라이드 자동 넘어가기
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }} // 딜레이는 5초가 적당한 듯?
      spaceBetween={20} // 슬라이드 간의 간격격
      slidesPerView={1} // 한 번에 표시되는 슬라이드 수 건들 x
      breakpoints={{ // 화면 크기에 따라 보여지는 슬라이드 수 변경 (반응형 고려)
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="mySwiper"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="p-4 border rounded shadow">{item.content}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClientSwiper;
