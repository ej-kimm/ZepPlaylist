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
  // z인덱스 , 랠러티브브

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-full w-full flex-col bg-black opacity-50"></div>
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
        onClick={onCancel}
      >
        <div className="z-50 h-[227px] w-[327px] rounded-[32px] bg-white px-6 pt-[32px]">
          <h2 className="title-1 text-left">로그인 필요</h2>
          <p className="button-1 text-left">로그인 화면으로 이동합니다</p>
          <button
            onClick={onCancel}
            className="button-2 mb-[17px] mt-[16px] block h-[39px] w-full rounded-full bg-secondary bg-opacity-10 text-secondary"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="button-2 block h-[39px] w-full rounded-full bg-primary text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal
