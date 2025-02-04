import clsx from 'clsx'

const Top100ChartDesktopHeader = () => {
  return (
    <div className={clsx('desktop:block hidden w-full')}>
      <div className={clsx('flex flex-row gap-52 py-3')}>
        <p className={clsx('caption-1 text-[#636363]')}>순위</p>
        <p className={clsx('caption-1 text-[#636363]')}>제목</p>
        <p className={clsx('caption-1 text-[#636363]')}>아티스트</p>
        <p className={clsx('caption-1 text-[#636363]')}>앨범제목</p>
      </div>
      <p className={clsx('border-b-[1px] border-l-stone-500')}></p>
    </div>
  )
}

export default Top100ChartDesktopHeader
