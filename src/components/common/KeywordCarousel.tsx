'use client'

import { availableKeywords } from '@/constants/keywords'
import clsx from 'clsx'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type KeywordCarouselProps = {
  selectedKeywords: string[]
  onToggleKeyword: (keyword: string) => void
}

const KeywordCarousel = ({
  selectedKeywords,
  onToggleKeyword,
}: KeywordCarouselProps) => {
  return (
    <div className={clsx("mt-4 w-full", "desktop:mb-10")}>
      <Swiper
        spaceBetween={8}
        slidesPerView="auto"
        autoplay={{ delay: 5000 }}
        loop={true}
        modules={[Autoplay]}
        className="flex items-center"
      >
        {availableKeywords.map(({ emoji, label }) => (
          <SwiperSlide key={label} style={{ width: 'auto' }}>
            <button
              onClick={() => onToggleKeyword(label)}
              className={`flex h-10 items-center justify-center rounded-full border px-3 ${
                selectedKeywords.includes(label)
                  ? 'border-[#9032E8] bg-[#9032E8] text-white'
                  : 'border-[#9032E8] bg-white text-[#9032E8]'
              }`}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                transition: 'all 0.3s ease',
              }}
            >
              <span className="mr-2 text-base">{emoji}</span>{' '}
              <span className="font-semibold">{label}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default KeywordCarousel
