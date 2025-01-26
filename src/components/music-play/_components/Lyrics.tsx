'use client'
import { UnderLineButton } from '@/components/common'
import { useLyricsTranslation } from '@/hooks/useLyricsTranslation'
import { useState } from 'react'

type LyricsProps = {
  lyrics: string
  isFullLyrics: boolean
  onClickLyrics: () => void
}

const Lyrics = ({ lyrics, isFullLyrics, onClickLyrics }: LyricsProps) => {
  const [isTranslation, setIsTranslation] = useState<boolean>(false)
  const { translatedLyrics, isPending } = useLyricsTranslation(lyrics)

  const displayLyrics = isTranslation
    ? isPending
      ? '번역중...'
      : (translatedLyrics ?? '번역할 수 없습니다')
    : lyrics

  const toggleTranslation = (isTranslate: boolean) =>
    setIsTranslation(isTranslate)

  const renderButtonClass = (isActive: boolean) =>
    isActive ? 'border-primary' : 'border-transparent text-opacity-60'

  return (
    <div className={`w-full ${isFullLyrics ? 'h-[315px]' : 'h-10'}`}>
      {isFullLyrics && (
        <div className="mb-1 flex gap-1">
          <UnderLineButton
            onClick={() => toggleTranslation(false)}
            className={renderButtonClass(!isTranslation)}
          >
            가사
          </UnderLineButton>
          <UnderLineButton
            onClick={() => toggleTranslation(true)}
            className={renderButtonClass(isTranslation)}
          >
            번역
          </UnderLineButton>
        </div>
      )}
      <p
        className={`cursor-pointer overflow-y-scroll ${isFullLyrics ? 'lyrics-full caption-2 relative -left-1 h-[250px] text-left leading-[25px]' : 'lyrics-small caption-1 h-full text-center leading-5'}`}
        dangerouslySetInnerHTML={{
          __html: displayLyrics
            .replace(/(\n){3,}/g, '\n') // 연속된 \n이 2번 이상 나오면 1번으로 줄이기
            .replace(/\n/g, '<br />'), // 각 \n을 <br />로 바꾸기
        }}
        onClick={onClickLyrics}
      />
    </div>
  )
}

export default Lyrics
