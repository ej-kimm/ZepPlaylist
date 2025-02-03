'use client'

import type { Charts } from '@/types/billboradCharts'
import Link from 'next/link'
import { useState } from 'react'
import Top20Item from './Top20Item'

import rightArrow from '@/assets/images/rightArrow.svg'
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
    <div className="mb-5">
      <div className="mb-4 mt-5 flex justify-between">
        <div className="flex items-center justify-start">
          <h1
            onClick={() => setIsKoreaChart(true)}
            className={`title-2 mr-4 cursor-pointer ${isKoreaChart ? 'text-black' : 'text-gray-300'}`}
          >
            국내 TOP 100
          </h1>

          <h1
            onClick={() => setIsKoreaChart(false)}
            className={`title-2 cursor-pointer ${!isKoreaChart ? 'text-black' : 'text-gray-300'}`}
          >
            빌보드 TOP 100
          </h1>
        </div>
        <Link
          href={isKoreaChart ? '/koreaTopChart' : '/billboardTopChart'}
          className="mr-6 flex justify-end text-sm"
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
