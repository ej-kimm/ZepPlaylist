import PlaylistDetailsComponent from '@/app/playlist/_components/PlaylistDetail'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: '플레이리스트 세부 정보 - Music Streaming App',
}

export default async function PlaylistPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }
  return (
    <div className="p-4">
      <PlaylistDetailsComponent params={params} />
    </div>
  )
}
