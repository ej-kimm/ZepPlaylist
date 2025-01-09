import { fetchMusicId } from '@/api/supabase'
import MusicPlayer from './_components/MusicPlayer'

const MusicPlayPage = async () => {
  const trackIds = await fetchMusicId() // music테이블에서 spotify_id를 모두 갖고옴

  return (
    <>
      <MusicPlayer trackIds={trackIds} />
    </>
  )
}

export default MusicPlayPage
