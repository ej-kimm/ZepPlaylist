'use client'

import KeywordCarousel from '@/components/keywords/keywordCarousel'

type PlaylistModalProps = {
  modalType: 'add' | 'edit' | null
  name: string
  description: string
  isPublic: boolean
  selectedKeywords: string[]
  setName: (value: string) => void
  setDescription: (value: string) => void
  setIsPublic: (value: boolean) => void
  toggleKeyword: (keyword: string) => void
  closeModal: () => void
  handleSubmit: () => void
}

export default function PlaylistModal({
  modalType,
  name,
  description,
  isPublic,
  selectedKeywords,
  setName,
  setDescription,
  setIsPublic,
  toggleKeyword,
  closeModal,
  handleSubmit,
}: PlaylistModalProps) {
  if (!modalType) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[360px] rounded-lg bg-white p-6 shadow-lg">
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
        <div className="mb-4">
          <KeywordCarousel
            selectedKeywords={selectedKeywords}
            onToggleKeyword={toggleKeyword}
          />
        </div>
        <div className="flex">
          <button
            className={`flex-1 rounded-l-md py-2 text-center ${
              isPublic ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={() => setIsPublic(true)}
          >
            공개
          </button>
          <button
            className={`flex-1 rounded-r-md py-2 text-center ${
              !isPublic
                ? 'bg-secondary text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
            onClick={() => setIsPublic(false)}
          >
            비공개
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
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
    </div>
  )
}
