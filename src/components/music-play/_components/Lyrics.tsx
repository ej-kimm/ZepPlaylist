'use client'
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
          <button
            type="button"
            className={`button-2 border-b-2 p-[10px] ${
              !isTranslation
                ? 'border-primary'
                : 'border-transparent text-opacity-60'
            }`}
            onClick={handleMenuLyrics}
          >
            가사
          </button>
          <button
            type="button"
            className={`button-2 border-b-2 p-[10px] ${
              isTranslation
                ? 'border-primary'
                : 'border-transparent text-opacity-60'
            }`}
            onClick={handleMenuTranslation}
          >
            번역
          </button>
        </div>
      )}
      {isTranslation ? (
        <p className="caption-1">번역기능은 MVP이후지롱</p>
      ) : (
        <p
          className={`cursor-pointer overflow-y-scroll ${isFullLyrics ? 'lyrics-full caption-2 relative -left-1 h-[300px] text-left leading-[25px]' : 'lyrics-small caption-1 h-[60px] text-center leading-5'}`}
          dangerouslySetInnerHTML={{ __html: lyrics }}
          onClick={onClickLyrics}
        />
      )}
    </div>
  )
}

export default Lyrics
