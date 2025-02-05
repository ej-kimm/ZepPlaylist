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
    <div className={clsx('w-full mt-4')}>
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
              className={clsx(
                'flex items-center justify-center rounded-full border',
                'h-10 px-3 text-xs', // 기본 모바일 스타일
                'desktop:h-12 desktop:px-4 desktop:text-sm', // PC 버전 스타일
                selectedKeywords.includes(label)
                  ? 'border-[#9032E8] bg-[#9032E8] text-white'
                  : 'border-[#9032E8] bg-white text-[#9032E8]',
              )}
              style={{
                transition: 'all 0.3s ease',
              }}
            >
              <span className="text-base desktop:text-xl">{emoji}</span>{' '}
              <span className="font-semibold">{label}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default KeywordCarousel
