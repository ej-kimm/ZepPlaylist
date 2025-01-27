'use server'
import { Tables } from '@/types/supabase'
import * as deepl from 'deepl-node'

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

export const getSongTranslate = async ({
  lyrics,
  targetLang,
}: {
  lyrics: string
  targetLang: deepl.TargetLanguageCode
}): Promise<string | null> => {
  const authKey = process.env.DEEL_API_KEY as string

  if (!authKey) {
    return null
  }

  try {
    const translator = new deepl.Translator(authKey)
    const result = await translator.translateText(lyrics, null, targetLang)

    return result.text
  } catch (error) {
    console.error('Error during translation:', error)
    return null
  }
}
