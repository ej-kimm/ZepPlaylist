import { getCommunityDetail } from '@/api/community/communityDetail'
import { headers } from 'next/headers'
import CommentSection from '../_components/CommentSection'

const CommunityDetailPage = async ({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> => {
  const cookies = headers().get('cookie') || ''
  const userId = headers().get('user-id') || ''
  const {
    songs,
    comments,
    playlistName,
    description,
    profileImage,
    nickname,
    isLiked,
  } = await getCommunityDetail(params.id, cookies, userId)

  return (
    <div>
      <CommentSection
        nickname={nickname}
        profileImage={profileImage}
        description={description}
        playlistName={playlistName}
        songs={songs}
        comments={comments}
        playlistId={params.id}
        isLiked={isLiked} // 좋아요 상태 전달
      />
    </div>
  )
}

export default CommunityDetailPage
