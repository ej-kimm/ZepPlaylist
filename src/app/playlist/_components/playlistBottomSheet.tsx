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
      <div className="flex w-full flex-col items-start gap-[36px] rounded-t-[36px] bg-white px-0 pb-4 pt-10">
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
            className="mb-4 w-full border-b border-gray-300 bg-transparent p-2"
          ></textarea>
        </div>
        <div className="mb-4 w-full px-6">
          <KeywordCarousel
            selectedKeywords={selectedKeywords}
            onToggleKeyword={toggleKeyword}
          />
        </div>
        <div className="flex w-full px-6">
          <button
            className={`flex-1 rounded-l-md py-2 text-center ${isPublic ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'}`}
            onClick={() => setIsPublic(true)}
          >
            공개
          </button>
          <button
            className={`flex-1 rounded-r-md py-2 text-center ${!isPublic ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'}`}
            onClick={() => setIsPublic(false)}
          >
            비공개
          </button>
        </div>
        <div className="mt-4 flex w-full justify-end px-6">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-black"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="ml-2 rounded bg-secondary px-4 py-2 text-white"
          >
            {modalType === 'add' ? '추가하기' : '저장하기'}
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}
