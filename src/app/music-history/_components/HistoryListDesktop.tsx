import Bean from '@/assets/images/Bin.svg'
import TableList from '@/components/common/Tableilst'
import Image from 'next/image'

interface HistoryListDesktopProps {
  historyTracks: any[]
  handlePlayFromIndex: (index: number) => void
  handleDeleteSong: (songId: string) => void
}

const HistoryListDesktop = ({
  historyTracks,
  handlePlayFromIndex,
  handleDeleteSong,
}: HistoryListDesktopProps) => {
  return (
    <TableList
      items={historyTracks}
      handleItemClick={(index) => handlePlayFromIndex(index)}
      renderAction={(song) => (
        <button
          onClick={() => handleDeleteSong(song.spotify_id)}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-primary bg-white"
        >
          <Image
            src={Bean}
            alt="삭제"
            width={16}
            height={16}
            className="h-4 w-4 text-primary"
          />
        </button>
      )}
    />
  )
}

export default HistoryListDesktop
