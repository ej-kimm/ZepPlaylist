// src/app/playlist/likes/page.tsx

import { fetchLikedSongs } from '@/api/like-music/actions'
import LikedSongsPage from '@/app/playlist/_components/likedSongDetail'

export const metadata = {
  title: '좋아요 리스트 - Music Streaming App',
}

// SSR로 좋아요 리스트를 가져온 후 CSR 컴포넌트에 전달
export default async function LikesPage() {
  // 서버에서 유저의 좋아요 리스트를 가져옴
  const likedSongs = await fetchLikedSongs()

  return (
    <div>
      {/* CSR 컴포넌트에 초기 데이터를 전달 */}
      <LikedSongsPage initialLikedSongs={likedSongs} />
    </div>
  )
}
