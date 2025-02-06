'use client'

import useSongLike from '@/hooks/useSongLike'
import { userStore } from '@/store/userSlice'
import clsx from 'clsx'
import LikeSongItem from './LikeSongItem'

const UserLikedSong = () => {
  const { user } = userStore()
  const user_id = user!.id

  const { userLikedSong } = useSongLike({ user_id })
  console.log(
    'songLike',
    userLikedSong?.map((item) => item.music),
  )

  const userLikedSongData = userLikedSong?.map((item) => item.music)

  if (!user) return null

  return (
    <div className="w-full">
      <h2 className={clsx('title-2 mb-4', 'desktop:title-3 desktop:mb-10')}>
        내가 좋아요 한 곡
      </h2>
      {userLikedSongData?.length === 0 ? (
        <div className="flex">
          좋아하는 곡을 담아 주세요...
          {/* <Image src={likeTrue} alt="Like Button" width={16} height={16} /> */}
        </div>
      ) : (
        <ul
          className={clsx(
            'scroll-invisible flex space-x-4 overflow-x-auto',
            'desktop:space-x-8',
          )}
        >
          {userLikedSongData?.map((item) => (
            <LikeSongItem item={item} key={item.spotify_id} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserLikedSong
