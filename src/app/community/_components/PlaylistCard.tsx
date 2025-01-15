'use client'

type PlaylistCardProps = {
  playlist: {
    id: string
    description: string
  }
  likeCount: number
  liked: boolean
  onLikeToggle: () => void
}

const PlaylistCard = ({
  playlist,
  likeCount,
  liked,
  onLikeToggle,
}: PlaylistCardProps) => {
  return (
    <div className="rounded border p-4 shadow mt-8">
      <h3 className="text-lg font-bold">{playlist.description}</h3>
      <p className="text-gray-600">좋아요: {likeCount}</p>
      <button
        className={`mt-2 px-4 py-2 text-white ${
          liked ? 'bg-red-500' : 'bg-gray-500'
        }`}
        onClick={onLikeToggle}
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  )
}

export default PlaylistCard
