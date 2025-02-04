'use client'

import Image from 'next/image'

type TableListProps<T> = {
  items: T[]
  handleItemClick: (index: number) => void
  renderAction: (item: T) => React.ReactNode
}

export default function TableList<
  T extends {
    spotify_id: string
    title: string
    artist: string
    album_cover?: string | null
    album_name?: string | null
  },
>({ items, handleItemClick, renderAction }: TableListProps<T>) {
  return (
    <div className="w-full">
      <div className="mt-8 flex w-full justify-between border-b border-gray-300 px-[24px] pb-2">
        <p className="caption-1 w-[30%] pl-[73px]">제목</p>
        <p className="caption-1 w-[30%]">아티스트</p>
        <p className="caption-1 w-[30%]">앨범제목</p>
        <p className="w-[36px]"></p>
      </div>

      <ul className="mt-2 flex w-full flex-col">
        {items.map((item, index) => (
          <li
            key={item.spotify_id}
            className="flex w-full items-center justify-between px-[24px] py-[4px]"
          >
            <div className="flex w-[30%] items-center gap-[21px]">
              <div className="h-[52px] w-[52px] overflow-hidden rounded-lg bg-[#D9D9D9]">
                {item.album_cover && (
                  <Image
                    src={item.album_cover}
                    alt={item.title}
                    width={52}
                    height={52}
                    className="rounded-lg"
                  />
                )}
              </div>

              <div
                className="cursor-pointer truncate text-left"
                onClick={() => handleItemClick(index)}
              >
                <h3 className="caption-1">{item.title}</h3>
              </div>
            </div>

            <p className="caption-1 w-[30%] truncate">{item.artist}</p>

            <p className="caption-1 w-[30%] truncate">
              {item.album_name ? item.album_name : '앨범 제목 없음'}
            </p>

            {/*각각 다른 아이콘 사용 가능!*/}
            {renderAction(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}
