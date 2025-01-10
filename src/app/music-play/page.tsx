import { fetchMusicId } from '@/api/supabase'
import MusicPlayer from './_components/MusicPlayer'

// TODO : 페이지 삭제 할 예정
const MusicPlayPage = async () => {
  const trackId = await fetchMusicId() // music테이블에서 spotify_id를 모두 갖고옴
  const test = '5alUYFVxEur17iUbc3sNsX'

  return (
    <>
      <MusicPlayer trackId={trackId} />
    </>
  )
}

export default MusicPlayPage
