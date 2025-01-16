import { Tables } from '@/types/supabase'
import Image from 'next/image'

type MusicDetailsProps = {
  musicDetail: Tables<'music'> | undefined
  toggleModal: () => void
}

const MusicDetails = ({ musicDetail, toggleModal }: MusicDetailsProps) => {
  return (
    <div className="flex flex-grow" onClick={toggleModal}>
      <Image
        // TODO : 웹버전 src default 커버 설정하기
        className="hidden"
        src={musicDetail?.album_cover || '/No cover'}
        alt={musicDetail?.title || 'No Title'}
        width={40}
        height={40}
      />
      <div className="flex flex-col items-start justify-start gap-[2px]">
        <h3 className="body-2">{musicDetail?.title}</h3>
        <p className="caption-2">{musicDetail?.artist}</p>
      </div>
    </div>
  )
}

export default MusicDetails
