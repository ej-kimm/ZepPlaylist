'use client'
import { UnderLineButton } from '@/components/common'
import { useLyricsTranslation } from '@/hooks/useLyricsTranslation'
import clsx from 'clsx'
import { useState } from 'react'

type LyricsProps = {
  lyrics: string
  isFullLyrics: boolean
  onClickLyrics: () => void
}

const Lyrics = ({ lyrics, isFullLyrics, onClickLyrics }: LyricsProps) => {
  const [isTranslation, setIsTranslation] = useState<boolean>(false)
  // const { translatedLyrics, isPending } = useLyricsTranslation(lyrics)
  const { translatedLyrics, isPending } = useLyricsTranslation()

  const displayLyrics = isTranslation
    ? isPending
      ? '번역중...'
      : (translatedLyrics ?? '번역할 수 없습니다')
    : lyrics

  const toggleTranslation = (isTranslate: boolean) =>
    setIsTranslation(isTranslate)

  const renderButtonClass = (isActive: boolean) =>
    isActive
      ? 'border-primary'
      : 'border-transparent text-opacity-60 desktop:text-opacity-60'

  return (
    <div
      className={clsx(
        'w-full',
        'desktop:flex desktop:h-full desktop:w-[432px] desktop:flex-col desktop:justify-between',
        isFullLyrics ? 'h-[315px]' : 'h-10',
      )}
    >
      <div
        className={clsx(
          'mb-1 flex gap-1',
          'desktop:flex',
          !isFullLyrics && 'hidden',
        )}
      >
        <UnderLineButton
          onClick={() => toggleTranslation(false)}
          className={clsx('desktop:body-1', renderButtonClass(!isTranslation))}
        >
          가사
        </UnderLineButton>
        <UnderLineButton
          onClick={() => toggleTranslation(true)}
          className={clsx('desktop:body-1', renderButtonClass(isTranslation))}
        >
          번역
        </UnderLineButton>
      </div>
      <p
        className={clsx(
          'cursor-pointer overflow-y-scroll',
          'desktop:caption-4 desktop:h-[455px] desktop:cursor-default desktop:text-left',
          isFullLyrics
            ? 'lyrics-full caption-2 relative -left-1 h-[250px] text-left leading-[25px]'
            : 'lyrics-small caption-1 h-full text-center leading-5',
        )}
        dangerouslySetInnerHTML={{
          __html: displayLyrics
            .replace(/^[\s\S]*?\[Korean:\]\n?/, '') // "[Korean:]"이 있으면 그 전 부분을 삭제
            .replace(/(\n){3,}/g, '\n') // 연속된 \n이 2번 이상 나오면 1번으로 줄이기
            .replace(/\n/g, '<br />'), // 각 \n을 <br />로 바꾸기
        }}
        onClick={onClickLyrics}
      />
    </div>
  )
}

export default Lyrics
