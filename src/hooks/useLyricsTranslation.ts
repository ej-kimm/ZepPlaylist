export const useLyricsTranslation = (lyrics: string) => {
  // const { data: translatedLyrics, isPending } = useQuery({
  //   queryKey: ['translate'],
  //   queryFn: () =>
  //     getSongTranslate({
  //       lyrics,
  //       targetLang: 'ko',
  //     }),
  //   enabled: !!lyrics,
  // })

  // TODO : 발표 당일에 주석 해제
  const translatedLyrics =
    '비용이 너무많이들어요.. 발표 당일날 공개합니다.. 돈이없어요'
  const isPending = false

  return { translatedLyrics, isPending }
}
