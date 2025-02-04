import imPlay from '@/assets/images/imPlay.svg'
import { LikedSong } from '@/types/song'
import Image from 'next/image'
import { FaRandom } from 'react-icons/fa'
import PlaylistItem from '../../../components/common/PlaylistItem'

type LikedSongsDetailUIProps = {
  likedSongs: LikedSong[]
  handlePlayAll: () => void
  handleShufflePlay: () => void
  handlePlayFromSong: (index: number) => void
  showDropdown: string | null
  toggleDropdown: (id: string) => void
  handleDelete: (id: string) => void
}

export default function LikedSongsDetailUI({
  likedSongs,
  handlePlayAll,
  handleShufflePlay,
  handlePlayFromSong,
  showDropdown,
  toggleDropdown,
  handleDelete,
}: LikedSongsDetailUIProps) {
  return (
    <div className="mx-auto flex h-full w-full flex-col bg-white">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="font-pretendard text-xl">좋아요 한 플레이리스트</h1>
        <div className="flex items-center space-x-6">
          <button
            onClick={handleShufflePlay}
            className="flex items-center justify-center"
          >
            <FaRandom size={24} color="black" />
          </button>

          <button
            onClick={handlePlayAll}
            className="flex items-center justify-center rounded-full bg-primary p-3"
            style={{ width: '48px', height: '48px', borderRadius: '24px' }}
          >
            <Image src={imPlay} alt="전체 재생" width={24} height={24} />
          </button>
        </div>
      </header>

      <section className="mb-3 mt-0 text-gray-600">
        <p className="font-pretendard text-sm">곡 수: {likedSongs.length}곡</p>
      </section>

      <ul>
        {likedSongs.map((song, index) => (
          <PlaylistItem
            key={song.id}
            playlist={{
              id: song.id,
              name: song.music.title || '제목 없음',
              description: song.music.artist || '아티스트 정보 없음',
              latest_song_cover: song.music.album_cover || '/default-cover.jpg',
              is_public: true,
            }}
            showDropdown={showDropdown}
            toggleDropdown={toggleDropdown}
            handlePlaylistClick={() => handlePlayFromSong(index)}
            handleDeleteSong={handleDelete}
            isDetailPage={true}
          />
        ))}
      </ul>
    </div>
  )
}
