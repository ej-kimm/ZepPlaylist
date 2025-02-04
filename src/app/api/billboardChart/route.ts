// app/api/billboard-chart/route.ts

import { fetchBillboardChart } from '@/utils/chart/fetchBillboardChart'
import { getSpotifyTrackData } from '@/utils/chart/getSpotifyTrackId'
import { getSpotifyToken } from '@/utils/spotifyToken/getToken'
import { supabase } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const token = await getSpotifyToken()

    const billboardChart = await fetchBillboardChart()

    const cleanedBillboardChart = billboardChart.map((item) => {
      return {
        songName: item.title.replace(/\s*\(.*?\)\s*/g, '').trim(),
        artistName: item.artist.replace(/\s*\(.*?\)\s*/g, '').trim(),
        albumCover: item.cover,
      }
    })

    const resolvedMusicData = await Promise.all(
      cleanedBillboardChart!.map(
        async (item) =>
          await getSpotifyTrackData(token, item.songName, item.artistName),
      ),
    )

    const validMusicData = resolvedMusicData.filter(
      (item) => item !== undefined,
    )

    const { data: insertBillboardChart, error: insertBillboardChartError } =
      await supabase
        .from('billboard_chart')
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
          {
            onConflict: 'spotify_id', // 중복 감지 기준 컬럼
            ignoreDuplicates: false, // true: 건너뛰기, false: 업데이트
          },
        )
        .select('*')

    if (insertBillboardChartError) {
      console.error('Error inserting data:', insertBillboardChartError)
    } else {
      console.log('Data inserted successfully:', insertBillboardChart)
    }

    return NextResponse.json({ data: insertBillboardChart }, { status: 200 })
  } catch (error) {
    console.error('An error occurred:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
