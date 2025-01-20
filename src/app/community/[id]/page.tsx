import { getCommunityDetail } from '@/api/community/communityDetail'
import { headers } from 'next/headers'
import CommentSection from '../_components/CommentSection'

const CommunityDetailPage = async ({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> => {
  const cookies = headers().get('cookie') || ''
  const { songs, comments } = await getCommunityDetail(params.id, cookies)

  return (
    <div>
      <CommentSection
        songs={songs}
        comments={comments}
        playlistId={params.id}
      />
    </div>
  )
}

export default CommunityDetailPage
