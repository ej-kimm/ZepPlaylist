// app/api/billboard-chart/route.ts

import { fetchBillboradChart } from '@/utils/chart/fetchBillboradChart'
import { getSpotifyTrackData } from '@/utils/chart/getSpotifyTrackId'
import { getSpotifyToken } from '@/utils/spotifyToken/getToken'
import { supabase } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const token = await getSpotifyToken()

    const billboardChart = await fetchBillboradChart()

    const cleanedBillboradChart = billboardChart.map((item) => {
      return {
        songName: item.title.replace(/\s*\(.*?\)\s*/g, '').trim(),
        artistName: item.artist.replace(/\s*\(.*?\)\s*/g, '').trim(),
        albumCover: item.cover,
      }
    })

    const resolvedMusicData = await Promise.all(
      cleanedBillboradChart!.map(
        async (item) =>
          await getSpotifyTrackData(token, item.songName, item.artistName),
      ),
    )

    const validMusicData = resolvedMusicData.filter(
      (item) => item !== undefined,
    )

    const { data: insertBillboradChart, error: insertBillboradChartError } =
      await supabase
        .from('billboard_chart')
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

    if (insertBillboradChart!) {
      console.error('Error inserting data:', insertBillboradChartError)
    } else {
      console.log('Data inserted successfully:', insertBillboradChart)
    }

    return NextResponse.json({ data: insertBillboradChart }, { status: 200 })
  } catch (error) {
    console.error('An error occurred:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
