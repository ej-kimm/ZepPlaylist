'use client'

import close from '@/assets/images/close.svg'
import { useAddPlaylist, useUpdatePlaylist } from '@/hooks/usePlaylists'
import useScrollLock from '@/hooks/useScrollLock'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import KeywordCarousel from './KeywordCarousel'
import Modal from './Modal'

interface Add {
  modalType: 'add'
  selectedPlaylistId?: never
  selectedPlaylist?: never
  isOpen: boolean
  onClose: () => void
}

interface Edit {
  modalType: 'edit'
  selectedPlaylistId: string
  selectedPlaylist: {
    name: string
    description: string
    is_public: boolean
    keyword: string
  }
  isOpen: boolean
  onClose: () => void
}

type PlaylistModalProps = Add | Edit

type Playlist = {
  title: string
  description: string
  isPublic: boolean
  selectedKeywords: string[]
}

export default function PlaylistModal({
  modalType,
  selectedPlaylistId,
  selectedPlaylist,
  isOpen,
  onClose,
}: PlaylistModalProps) {
  const [playlist, setPlaylist] = useState<Playlist>({
    title: '',
    description: '',
    isPublic: false,
    selectedKeywords: [],
  })

  const { user } = userStore()
  const addPlaylistMutation = useAddPlaylist(() => onClose())
  const updatePlaylistMutation = useUpdatePlaylist(() => onClose())
  useScrollLock(isOpen)

  useEffect(() => {
    if (modalType === 'edit' && selectedPlaylist) {
      setPlaylist({
        title: selectedPlaylist.name,
        description: selectedPlaylist.description,
        isPublic: selectedPlaylist.is_public,
        selectedKeywords: selectedPlaylist.keyword
          ? selectedPlaylist.keyword.split(',')
          : [],
      })
    }
  }, [modalType, selectedPlaylist])

  const toggleKeyword = (keyword: string) => {
    setPlaylist((prevState) => {
      const isSelected = prevState.selectedKeywords.includes(keyword)
      return {
        ...prevState,
        selectedKeywords: isSelected
          ? prevState.selectedKeywords.filter((k) => k !== keyword)
          : [...prevState.selectedKeywords, keyword],
      }
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target

    setPlaylist((prevState) => ({
      ...prevState,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = () => {
    if (modalType === 'add') {
      addPlaylistMutation.mutate({
        name: playlist.title,
        description: playlist.description,
        is_public: playlist.isPublic,
        keyword: playlist.selectedKeywords.join(','),
        user_id: user?.id || '',
      })
    } else if (modalType === 'edit' && selectedPlaylistId) {
      updatePlaylistMutation.mutate({
        id: selectedPlaylistId,
        updatedData: {
          name: playlist.title,
          description: playlist.description,
          is_public: playlist.isPublic,
          keyword: playlist.selectedKeywords.join(','),
        },
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title={modalType === 'add' ? '플레이리스트 추가' : '플레이리스트 변경'}
      onConfirm={handleSubmit}
      onCancel={onClose}
      className="desktop:w-[532px]"
    >
      <button
        type="button"
        className="absolute right-6 top-10"
        onClick={onClose}
      >
        <Image
          src={close}
          width={24}
          height={24}
          alt="close"
          className="rotate-45"
        />
      </button>

      <div className="mb-3 flex w-full flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="플레이리스트 제목"
          value={playlist.title}
          onChange={handleChange}
          className="caption-2 h-9 w-full cursor-text rounded-lg bg-[#F4F4F4] px-3"
        />

        <input
          type="text"
          name="description"
          placeholder="플레이리스트 설명"
          value={playlist.description}
          onChange={handleChange}
          className="caption-2 h-9 w-full cursor-text rounded-lg bg-[#F4F4F4] px-3"
        />
      </div>

      <div className="mb-3 flex w-full flex-col gap-3">
        <h2 className="body-2">키워드</h2>
        <KeywordCarousel
          selectedKeywords={playlist.selectedKeywords}
          onToggleKeyword={toggleKeyword}
        />
      </div>

      <div className="mb-[14px] flex w-full items-center justify-between">
        <p className="body-2">공개설정</p>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            name="isPublic"
            checked={playlist.isPublic}
            onChange={handleChange}
            className="peer sr-only"
          />
          <div className="h-[31px] w-[51px] rounded-full bg-gray-300 peer-checked:bg-primary">
            <div
              className={`absolute left-2 top-1 h-5 w-5 transform rounded-full bg-white transition-all ${
                playlist.isPublic ? 'translate-x-[20px]' : ''
              }`}
            ></div>
          </div>
        </label>
      </div>
    </Modal>
  )
}
