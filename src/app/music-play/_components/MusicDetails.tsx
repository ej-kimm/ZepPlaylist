import { Tables } from '@/types/supabase'
import Image from 'next/image'

type MusicDetailsProps = {
  musicDetail: Tables<'music'> | undefined
}

const MusicDetails = ({ musicDetail }: MusicDetailsProps) => {
  return (
    <div className="flex">
      <Image
        // TODO : src default 커버 설정하기
        src={musicDetail?.album_cover || '/No cover'}
        alt={musicDetail?.title || 'No Title'}
        width={30}
        height={30}
      />
      <h3 className="text-white">{musicDetail?.title}</h3>
      <p className="text-white">{musicDetail?.artist}</p>
    </div>
  )
}

export default MusicDetails
