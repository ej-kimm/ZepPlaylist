'use client'
import { UnderLineButton } from '@/components/common'
import { useState } from 'react'

type LyricsProps = {
  lyrics: string
  isFullLyrics: boolean
  onClickLyrics: () => void
}

const Lyrics = ({ lyrics, isFullLyrics, onClickLyrics }: LyricsProps) => {
  const [isTranslation, setIsTranslation] = useState<boolean>(false)

  const handleMenuLyrics = () => setIsTranslation(false)
  const handleMenuTranslation = () => setIsTranslation(true)

  return (
    <div>
      {isFullLyrics && (
        <div className="mb-5 flex gap-1">
          <UnderLineButton
            onClick={handleMenuLyrics}
            className={
              !isTranslation
                ? 'border-primary'
                : 'border-transparent text-opacity-60'
            }
          >
            가사
          </UnderLineButton>
          <UnderLineButton
            onClick={handleMenuTranslation}
            className={
              isTranslation
                ? 'border-primary'
                : 'border-transparent text-opacity-60'
            }
          >
            번역
          </UnderLineButton>
        </div>
      )}
      {isTranslation ? (
        <p className="caption-1">번역기능은 MVP이후지롱</p>
      ) : (
        <p
          className={`cursor-pointer overflow-y-scroll ${isFullLyrics ? 'lyrics-full caption-2 relative -left-1 h-[300px] text-left leading-[25px]' : 'lyrics-small caption-1 h-[40px] text-center leading-5'}`}
          dangerouslySetInnerHTML={{ __html: lyrics }}
          onClick={onClickLyrics}
        />
      )}
    </div>
  )
}

export default Lyrics
