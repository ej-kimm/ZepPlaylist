'use client'

import BottomSheet from '@/components/common/BottomSheet'
import KeywordCarousel from '@/components/keywords/keywordCarousel'

type PlaylistBottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  modalType: 'add' | 'edit' | null
  name: string
  description: string
  isPublic: boolean
  selectedKeywords: string[]
  setName: (value: string) => void
  setDescription: (value: string) => void
  setIsPublic: (value: boolean) => void
  toggleKeyword: (keyword: string) => void
  handleSubmit: () => void
}

export default function PlaylistBottomSheet({
  isOpen,
  onClose,
  modalType,
  name,
  description,
  isPublic,
  selectedKeywords,
  setName,
  setDescription,
  setIsPublic,
  toggleKeyword,
  handleSubmit,
}: PlaylistBottomSheetProps) {
  if (!modalType) return null

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      height="auto"
      maxWidth="100%"
    >
      <div className="flex w-full flex-col items-start gap-[36px] rounded-t-[36px] bg-white py-10 pb-4">
        <div className="w-full px-6">
          <h2 className="mb-4 text-lg font-bold text-[#4a4a4a]">
            {modalType === 'add' ? '플레이리스트 추가' : '플레이리스트 수정'}
          </h2>
          <input
            type="text"
            placeholder="플레이리스트 제목"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full border-b border-gray-300 bg-transparent p-2"
          />
          <textarea
            placeholder="플레이리스트 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 w-full border-b border-gray-300 bg-transparent p-0"
          ></textarea>
        </div>
        <div className="mb-4 w-full px-6">
          <p className="caption-1 text-black">키워드</p>
          <KeywordCarousel
            selectedKeywords={selectedKeywords}
            onToggleKeyword={toggleKeyword}
          />
        </div>
        <div className="flex w-full items-center justify-between px-6">
          <p className="caption-1 text-black">공개설정</p>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary"></div>
          </label>
        </div>

        <div className="mt-4 w-full px-6">
          <button
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-1 rounded-full bg-primary px-[18px] py-[11px] text-white"
          >
            확인
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}
