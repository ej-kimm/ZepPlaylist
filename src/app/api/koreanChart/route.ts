// app/api/korean-chart/route.ts

import { fetchAndCleanMelonChart } from '@/utils/chart/fetchMelonChart'
import { getSpotifyTrackData } from '@/utils/chart/getSpotifyTrackId'
import { getSpotifyToken } from '@/utils/spotifyToken/getToken'
import { supabase } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

// export const revalidate = 3600

export async function GET() {
  try {
    const token = await getSpotifyToken()
    console.log('token', token)

    const cleanedMelonChart = await fetchAndCleanMelonChart()

    const resolvedMusicData = await Promise.all(
      cleanedMelonChart!.map(
        async (item) =>
          await getSpotifyTrackData(token, item.songName, item.artistName),
      ),
    )

    const validMusicData = resolvedMusicData.filter(
      (item) => item !== undefined,
    )

    const { data: insertMelonChart, error: insertMelonChartError } =
      await supabase
        .from('korean_chart')
        .insert(
          validMusicData.map((item) => ({
            spotify_id: item.id,
            title: item.title,
            artist: item.artist,
            album_cover: item.albumCover,
            play_time: item.playTime,
            created_at: new Date().toISOString(),
          })),
        )
        .select('*')

    if (insertMelonChartError) {
      console.error('Error inserting data:', insertMelonChartError)
    } else {
      console.log('Data inserted successfully:', insertMelonChart)
    }

    return NextResponse.json({ data: insertMelonChart }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
