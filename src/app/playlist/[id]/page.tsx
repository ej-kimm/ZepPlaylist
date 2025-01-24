import PlaylistDetailsComponent from '@/app/playlist/_components/PlaylistDetail'

export const metadata = {
  title: '플레이리스트 세부 정보 - Music Streaming App',
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <PlaylistDetailsComponent params={params} />
    </div>
  )
}
