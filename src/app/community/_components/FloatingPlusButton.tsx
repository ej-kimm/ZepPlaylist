'use client'

import plusButton from '@/assets/images/plusButton.svg'
import { PlaylistBottomSheet, PlaylistModal } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

const FloatingPlusButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType] = useState<'add'>('add')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  const isDesktop = useIsDesktop(720)

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    )
  }

  const handleSubmit = () => {
    console.log('플레이리스트 생성 요청:', {
      name,
      description,
      isPublic,
      selectedKeywords,
    })
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
        className={clsx(
          'fixed bottom-20 right-5 z-40 h-14 w-14 rounded-full bg-primary p-3 transition-all hover:scale-110',
          'desktop:right-5',
        )}
      >
        <Image src={plusButton} alt="Add Playlist" width={32} height={32} />
      </button>

      {isDesktop ? (
        <PlaylistModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          modalType={modalType}
        />
      ) : (
        <PlaylistBottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
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
      )}
    </>
  )
}

export default FloatingPlusButton
