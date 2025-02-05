'use client'

import type { Charts } from '@/types/billboradCharts'
import Link from 'next/link'
import { useState } from 'react'
import Top20Item from './Top20Item'

import rightArrow from '@/assets/images/rightArrow.svg'
import clsx from 'clsx'
import Image from 'next/image'

type Top20ListProps = {
  newKoreanTop20ChartList: {
    isKoreaChart: true
    list: Charts[]
  }
  newBillboardTop20ChartList: {
    isKoreaChart: false
    list: Charts[]
  }
}

const Top20List: React.FC<Top20ListProps> = ({
  newKoreanTop20ChartList,
  newBillboardTop20ChartList,
}) => {
  const [isKoreaChart, setIsKoreaChart] = useState(true)

  const chartList: Array<Charts> = isKoreaChart
    ? newKoreanTop20ChartList.list
    : newBillboardTop20ChartList.list

  return (
    <div className={clsx('flex flex-col gap-4', 'desktop:gap-10')}>
      <div className="flex h-full w-full items-center justify-between">
        <div
          className={clsx(
            'flex items-center justify-start gap-[18px]',
            'desktop:gap-6',
          )}
        >
          <div className="flex flex-col">
            <h1
              onClick={() => setIsKoreaChart(true)}
              className={clsx(
                'title-2 cursor-pointer',
                isKoreaChart ? 'text-black' : 'text-opacity-30',
                isKoreaChart && 'desktop:text-secondary',
                'desktop:px-[10px]',
              )}
            >
              국내 TOP 100
            </h1>
            <p
              className={clsx(
                isKoreaChart &&
                  'desktop:border-b-[1px] desktop:border-secondary',
              )}
            ></p>
          </div>

          <div className="flex flex-col">
            <h1
              onClick={() => setIsKoreaChart(false)}
              className={clsx(
                'title-2 cursor-pointer',
                !isKoreaChart ? 'text-black' : 'text-gray-300',
                !isKoreaChart && 'desktop:text-secondary',
                'desktop:px-[10px]',
              )}
            >
              빌보드 TOP 100
            </h1>
            <p
              className={clsx(
                !isKoreaChart &&
                  'desktop:border-b-[1px] desktop:border-secondary',
              )}
            ></p>
          </div>
        </div>
        <Link
          href={isKoreaChart ? '/koreaTopChart' : '/billboardTopChart'}
          className="caption-4 flex h-5 justify-end"
        >
          더보기
          <Image src={rightArrow} height={16} width={16} alt=">" />
        </Link>
      </div>
      <Top20Item chartList={chartList} />
    </div>
  )
}

export default Top20List
