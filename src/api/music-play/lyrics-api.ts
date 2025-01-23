import { Tables } from '@/types/supabase'

export const getSongLyrics = async ({
  artist,
  title,
}: {
  artist: Tables<'music'>['artist']
  title: Tables<'music'>['title']
}): Promise<string | null> => {
  const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
  const data = await response.json()

  return data.lyrics
}
