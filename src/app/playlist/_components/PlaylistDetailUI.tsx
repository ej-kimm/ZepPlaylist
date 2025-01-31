import imPlay from '@/assets/images/imPlay.svg'
import { PlaylistDetails } from '@/types/song'
import { differenceInDays, isToday } from 'date-fns'
import Image from 'next/image'
import { FaEllipsisV, FaRandom } from 'react-icons/fa'

type PlaylistDetailUIProps = {
  playlistDetails: PlaylistDetails
  handlePlayAll: () => void
  handleShufflePlay: () => void
  handlePlayFromIndex: (index: number) => void
  showDropdown: string | null
  toggleDropdown: (songId: string) => void
  handleDeleteSong: (songId: string) => void
}

export default function PlaylistDetailUI({
  playlistDetails,
  handlePlayAll,
  handleShufflePlay,
  handlePlayFromIndex,
  showDropdown,
  toggleDropdown,
  handleDeleteSong,
}: PlaylistDetailUIProps) {
  const {
    name,
    description,
    song_count,
    total_play_time,
    last_updated,
    songs,
  } = playlistDetails
  const latestSongCover =
    songs.length > 0
      ? songs[0].album_cover || '/default-cover.jpg'
      : '/default-cover.jpg'

  return (
    <div className="mx-auto h-[858px] max-w-[375px] bg-white">
      <h1 className="title-1">플레이리스트</h1>
      <section className="mt-6 flex flex-col items-center">
        <div
          className="bg-lightgray h-[248px] w-[248px] rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${latestSongCover})` }}
        ></div>
        <h2 className="mt-4 font-pretendard text-xl">{name}</h2>
        <p className="mt-1 text-gray-500">
          {description || '설명이 없습니다.'}
        </p>
      </section>

      <section className="mt-4 flex items-center justify-between">
        <div className="font-pretendard text-sm text-gray-600">
          <div className="flex space-x-2">
            <p>곡 수: {song_count}곡</p>
            <p>재생시간: {total_play_time}</p>
          </div>
          <p className="mt-1 font-pretendard">
            업데이트 날:{' '}
            {last_updated
              ? isToday(new Date(last_updated))
                ? '오늘'
                : `${differenceInDays(new Date(), new Date(last_updated))}일 전`
              : '업데이트 없음'}
          </p>
        </div>
        <button
          className="relative flex h-14 w-14 items-center justify-center"
          onClick={handleShufflePlay}
        >
          <FaRandom className="text-black" size={24} />
        </button>

        <button
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary"
          onClick={handlePlayAll}
        >
          <Image src={imPlay} alt="전체 재생" width={24} height={24} />
        </button>
      </section>

      <ul className="mt-6 space-y-2">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <li
              key={song.spotify_id}
              className="relative flex cursor-pointer items-center justify-between bg-white"
              onClick={() => handlePlayFromIndex(index)}
            >
              <div className="flex items-center">
                <div
                  className="bg-lightgray h-[44px] w-[44px] rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${song.album_cover || '/default-album-cover.jpg'})`,
                  }}
                ></div>
                <div className="ml-4">
                  <p className="font-pretendard">{song.title}</p>
                  <p className="text-sm text-gray-500">{song.artist}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="relative p-2 text-gray-500 hover:text-gray-800"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleDropdown(song.spotify_id)
                  }}
                >
                  <FaEllipsisV />
                </button>
                {showDropdown === song.spotify_id && (
                  <div className="absolute right-0 mt-2 w-24 rounded-lg border bg-white shadow-lg">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteSong(song.spotify_id)
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="mt-4 text-center text-gray-500">
            플레이리스트에 곡이 없습니다.
          </p>
        )}
      </ul>
    </div>
  )
}
