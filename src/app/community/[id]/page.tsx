import { getCommunityDetail } from '@/api/community/communityDetail'
import { headers } from 'next/headers'
import { Suspense } from 'react'
import CommentSection from '../_components/CommentSection'
import CommunityDetailSkeleton from '../_components/CommunityDetailSkeleton'

const CommunityDetailPage = async ({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> => {
  const cookies = headers().get('cookie') || ''
  const userId = headers().get('user-id') || ''

  // 데이터를 불러오는 부분
  const communityDetailPromise = getCommunityDetail(params.id, cookies, userId)

  return (
    <div>
      <Suspense fallback={<CommunityDetailSkeleton />}>
        <CommentSectionWrapper
          communityDetailPromise={communityDetailPromise}
          params={params}
        />
      </Suspense>
    </div>
  )
}

// CommentSection을 감싸는 컴포넌트
const CommentSectionWrapper = async ({
  communityDetailPromise,
  params,
}: {
  communityDetailPromise: ReturnType<typeof getCommunityDetail>
  params: { id: string }
}) => {
  const {
    songs,
    comments,
    playlistName,
    description,
    profileImage,
    nickname,
    isLiked,
  } = await communityDetailPromise

  return (
    <CommentSection
      nickname={nickname}
      profileImage={profileImage}
      description={description}
      playlistName={playlistName}
      songs={songs}
      comments={comments}
      playlistId={params.id}
      isLiked={isLiked}
    />
  )
}

export default CommunityDetailPage
