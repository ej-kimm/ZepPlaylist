// app/api/korean-chart/route.ts

import { fetchAndCleanMelonChart } from '@/utils/chart/fetchMelonChart'
import { getKrSpotifyTrackId } from '@/utils/chart/getKrSpotifyTrackId'
import { getSpotifyToken } from '@/utils/spotifyToken/getToken'
import { supabase } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

// export const revalidate = 3600

export async function GET() {
  try {
    const token = await getSpotifyToken()

    const cleanedMelonChart = await fetchAndCleanMelonChart()

    const resolvedMusicData = await Promise.all(
      cleanedMelonChart!.map(
        async (item) => await getKrSpotifyTrackId(token, item.songName),
      ),
    )

    const validMusicData = resolvedMusicData.filter(
      (item) => item !== undefined,
    )

    const { data: insertMelonChart, error: insertMelonChartError } =
      await supabase
        .from('korean_chart')
        .upsert(
          validMusicData.map((item) => ({
            spotify_id: item.id,
            title: item.title,
            artist: item.artist,
            album_cover: item.albumCover,
            play_time: item.playTime,
            created_at: new Date().toISOString(),
          })),
          {
            onConflict: 'spotify_id', // 중복 감지 기준 컬럼
            ignoreDuplicates: false, // true: 건너뛰기, false: 업데이트
          },
        )
        .select('*')

    if (insertMelonChartError) {
      console.error('Error inserting data:', insertMelonChartError)
    } else {
      console.log('Data inserted successfully:', insertMelonChart)
    }

    return NextResponse.json({ data: insertMelonChart }, { status: 200 })
  } catch (error) {
    console.error('An error occurred:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
