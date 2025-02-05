// app/api/korean-chart/route.ts

import { fetchAndCleanMelonChart } from '@/utils/chart/fetchMelonChart'
import { getSpotifyTrackData } from '@/utils/chart/getSpotifyTrackId'
import { getSpotifyToken } from '@/utils/spotifyToken/getToken'
import { supabase } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

// export const revalidate = 3600

export async function GET(): Promise<Response> {
  try {
    const token = await getSpotifyToken()
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

    const { data: deleteKoreanChart, error: ErrorDeleteKoreanChart } =
      await supabase.from('korean_chart').delete().neq('spotify_id', '')

    if (ErrorDeleteKoreanChart && ErrorDeleteKoreanChart.code !== 'PGRST116') {
      console.error('Error Delete KoreanChart:', ErrorDeleteKoreanChart)
      return NextResponse.json(
        { error: 'Error deleting Korean chart data' },
        { status: 500 },
      )
    }

    if (!deleteKoreanChart) {
      const { data: insertMelonChart, error: insertMelonChartError } =
        await supabase
          .from('korean_chart')
          .upsert(
            validMusicData.map((item) => ({
              spotify_id: item.id,
              title: item.title,
              artist: item.artist,
              album_cover: item.albumCover,
              album_name: item.albumName,
              play_time: item.playTime,
              created_at: new Date().toISOString(),
            })),
          )
          .select('*')

      if (insertMelonChartError) {
        console.error('Error inserting data:', insertMelonChartError)
        return NextResponse.json(
          { error: 'Error inserting data' },
          { status: 500 },
        )
      } else {
        console.log('Data inserted successfully:', insertMelonChart)
        return NextResponse.json({ data: insertMelonChart }, { status: 200 })
      }
    }

    // deleteKoreanChart가 존재하는 경우의 처리
    return NextResponse.json({ message: 'No data to insert' }, { status: 200 })
  } catch (error) {
    console.error('An error occurred:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
