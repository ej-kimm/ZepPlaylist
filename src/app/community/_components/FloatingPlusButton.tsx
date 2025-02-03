'use client'

import plusButton from '@/assets/images/plusButton.svg'
import { PlaylistBottomSheet } from '@/components/common'

import Image from 'next/image'
import { useState } from 'react'

const FloatingPlusButton = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    )
  }

  const handleSubmit = () => {
    console.log('플레이리스트 생성 요청:', {
      name,
      description,
      isPublic,
      selectedKeywords
    })
    setIsBottomSheetOpen(false)
  }

  return (
    <>
      <button
        onClick={() => {
          setModalType('add')
          setIsBottomSheetOpen(true)
        }}
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-primary p-3 transition-all hover:scale-110"
      >
        <Image src={plusButton} alt="Add Playlist" width={32} height={32} />
      </button>

      <PlaylistBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        modalType={modalType}
        name={name}
        description={description}
        isPublic={isPublic}
        selectedKeywords={selectedKeywords}
        setName={setName}
        setDescription={setDescription}
        setIsPublic={setIsPublic}
        toggleKeyword={toggleKeyword}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default FloatingPlusButton