import { useEffect } from 'react'
import KeywordCarousel from './KeywordCarousel'

type PlaylistModalProps = {
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

export default function PlaylistModal({
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
}: PlaylistModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !modalType) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex h-[390px] w-[580px] flex-col justify-between rounded-[32px] bg-white p-[40px_24px]">
        <button onClick={onClose} className="absolute right-6 top-6 text-xl">
          ✕
        </button>

        <h2 className="text-[22px] font-semibold text-black">
          {modalType === 'add' ? '플레이리스트 추가' : '플레이리스트 수정'}
        </h2>

        <input
          type="text"
          placeholder="플레이리스트 제목"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[36px] w-full rounded-[8px] bg-[#F4F4F4] px-3"
        />

        <textarea
          placeholder="플레이리스트 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-[36px] w-full rounded-[8px] bg-[#F4F4F4] px-3 text-left placeholder:text-left"
          style={{
            paddingTop: '8px',
            paddingBottom: '8px',
            lineHeight: '20px',
          }}
        />

        <div className="w-full">
          <p className="text-sm font-medium text-black">키워드</p>
          <KeywordCarousel
            selectedKeywords={selectedKeywords}
            onToggleKeyword={toggleKeyword}
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-sm font-medium text-black">공개설정</p>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="peer sr-only"
            />
            <div className="h-[31px] w-[51px] rounded-full bg-gray-300 peer-checked:bg-primary">
              <div
                className={`absolute left-2 top-1 h-5 w-5 transform rounded-full bg-white transition-all ${
                  isPublic ? 'translate-x-[20px]' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-full bg-primary py-2 text-center text-white"
        >
          확인
        </button>
      </div>
    </div>
  )
}
