import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { Tables } from '@/types/supabase'
import Image from 'next/image'

type MusicDetailsProps = {
  musicDetail: Tables<'music'> | undefined
}

const MusicDetails = ({ musicDetail }: MusicDetailsProps) => {
  const { togglePlayerModal } = useMusicPlayerStore()

  return (
    <div
      className="flex flex-grow cursor-pointer overflow-hidden"
      onClick={togglePlayerModal}
    >
      <Image
        // TODO : 웹버전 src default 커버 설정하기
        className="hidden"
        src={musicDetail?.album_cover || '/No cover'}
        alt={musicDetail?.title || 'No Title'}
        width={40}
        height={40}
      />
      <div className="flex w-full flex-col gap-[2px]">
        <h3 className="body-2 truncate">{musicDetail?.title}</h3>
        <p className="caption-2 truncate">{musicDetail?.artist}</p>
      </div>
    </div>
  )
}

export default MusicDetails
