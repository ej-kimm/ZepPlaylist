import React from 'react'

interface ModalProps {
  isOpen: boolean
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null
  // 성훈님한테 총 크기 어떻게 지정하는지 물어보기

  return (
    <div className="flex h-72 flex-col flex-wrap rounded-[32px] bg-white">
      <div className="h-72 w-80 rounded-lg bg-white">
        <h2 className="title-1 text-left">로그인 필요</h2>
        <p className="button-1 text-left">로그인 화면으로 이동합니다</p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="button-2 w-full rounded-full bg-secondary text-secondary"
          >
            {cancelText}
          </button>
          <br></br>
          <button
            onClick={onConfirm}
            className="button-2 w-full rounded-full bg-primary text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
