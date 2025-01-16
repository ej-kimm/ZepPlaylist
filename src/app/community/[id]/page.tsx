import { getCommunityDetail } from '@/api/community/communityDetail'
import { headers } from 'next/headers'
import CommentSection from '../_components/CommentSection'

const CommunityDetailPage = async ({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> => {
  const cookies = headers().get('cookie') || ''
  const { songs, songCount, comments } = await getCommunityDetail(
    params.id,
    cookies,
  )

  return (
    <div className="p-4">
      <CommentSection
        songs={songs}
        songCount={songCount}
        comments={comments}
        playlistId={params.id}
      />
    </div>
  )
}

export default CommunityDetailPage
