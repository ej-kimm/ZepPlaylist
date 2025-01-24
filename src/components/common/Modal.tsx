import React from 'react'
import ModalAnimation from '../animation/ModalAnimation'

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

  return (
    <ModalAnimation isOpen={isOpen} onClose={onCancel}>
      <h2 className="title-1 mb-2 text-left">로그인 필요</h2>
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
    </ModalAnimation>
  )
}

export default Modal
