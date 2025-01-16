'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type ClientSwiperProps = {
  items: { id: string; content: React.ReactNode }[]
}

const ClientSwiper: React.FC<ClientSwiperProps> = ({ items }) => { // 반드시 items라는 이름을 지켜줄 것 props로 items를 받고 있음
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
 // 스와이퍼 기능을 사용하고 싶은 정보들을 item.content 안에 담으면 됌
 // 예시
 // <ClientSwiper
//  items={popularPlaylists.map((playlist) => ({
//   id: playlist.id,
//   content: (
//     <PlaylistUI
//       albumCover={playlist.album_cover ?? ''}
//       isLiked={playlist.likedByUser ?? false}
//       onLikeToggle={() => console.log('Like toggled for', playlist.id)}
//       onPlay={() => console.log('Play clicked for', playlist.id)}
//     />
//   ),
// }))}
// />