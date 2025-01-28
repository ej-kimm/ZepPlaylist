import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { Tables } from '@/types/supabase'
import clsx from 'clsx'
import Image from 'next/image'

type MusicDetailsProps = {
  musicDetail: Tables<'music'> | undefined
}

const MusicDetails = ({ musicDetail }: MusicDetailsProps) => {
  const { togglePlayerModal } = useMusicPlayerStore()

  return (
    <div
      className="flex flex-grow cursor-pointer items-center overflow-hidden"
      onClick={togglePlayerModal}
    >
      {musicDetail?.album_cover ? (
        <Image
          className={clsx('mr-3 hidden rounded-lg', 'desktop:block')}
          src={musicDetail.album_cover}
          alt={musicDetail?.title || 'No Title'}
          width={56}
          height={56}
        />
      ) : (
        <div
          className={clsx(
            'mr-3 hidden h-[56px] w-[56px] rounded-lg bg-[#D9D9D9]',
            'desktop:block',
          )}
        />
      )}

      <div className={clsx('flex w-full flex-col gap-[2px]', 'desktop:gap-1')}>
        <h3 className={clsx('body-2 truncate', 'desktop:title-2')}>
          {musicDetail?.title}
        </h3>
        <p className={clsx('caption-2 truncate', 'desktop:caption-1')}>
          {musicDetail?.artist}
        </p>
      </div>
    </div>
  )
}

export default MusicDetails
