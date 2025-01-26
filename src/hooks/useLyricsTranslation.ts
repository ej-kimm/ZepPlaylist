import { getSongTranslate } from '@/api/music-play/lyrics-api'
import { useQuery } from '@tanstack/react-query'

export const useLyricsTranslation = (lyrics: string) => {
  const { data: translatedLyrics, isPending } = useQuery({
    queryKey: ['translate'],
    queryFn: () =>
      getSongTranslate({
        lyrics,
        targetLang: 'ko',
      }),
    enabled: !!lyrics,
  })

  return { translatedLyrics, isPending }
}
