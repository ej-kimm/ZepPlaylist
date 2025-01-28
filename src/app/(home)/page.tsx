import { supabase } from '@/utils/supabase/client'
import { Suspense } from 'react'
import Charts from './_components/Charts'
import LatestAlbums from './_components/LatestAlbums'
import { SearchBar } from './_components/SearchBar'
import UserLikedSong from './_components/UserLikedSong'
export default async function Home() {
  const { data } = await supabase.auth.getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log('세션', data)
  console.log('유저', user)
  // 카카오 프사때매 임시로 찍어놈 ,
  return (
    <>
      {/* TODO : Suspense 바꾸기.... */}
      <Suspense fallback={<p>Loading...</p>}>
        <SearchBar />
      </Suspense>
      <LatestAlbums />
      <Charts />
      <UserLikedSong />
    </>
  )
}
