'use client'
import BottomSheet from '@/components/common/test'
import { useState } from 'react'

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsSheetOpen(true)}>Open Bottom Sheet</button>
      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <h2>제목</h2>
        <p>설명</p>
      </BottomSheet>
    </div>
  )
}
