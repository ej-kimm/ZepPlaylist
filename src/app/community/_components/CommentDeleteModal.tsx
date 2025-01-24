import React from 'react'

interface CommentDeleteModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

const CommentDeleteModal: React.FC<CommentDeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* 배경 */}
      <div className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50"></div>
      {/* 모달 */}
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
        onClick={onCancel}
      >
        <div
          className="z-50 h-[227px] w-[327px] rounded-[32px] bg-white px-6 pt-[32px]"
          onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 방지
        >
          <h2 className="title-1 mb-4 text-left">삭제하시겠습니까?</h2>
          <p className="button-1 mb-6 text-left">
            작성한 댓글을 삭제하시겠습니까?
          </p>
          {/* 버튼 영역 */}
          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="button-2 h-[39px] w-[48%] rounded-full bg-secondary bg-opacity-10 text-secondary"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="button-2 h-[39px] w-[48%] rounded-full bg-primary text-white"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  )
  
}

export default CommentDeleteModal
