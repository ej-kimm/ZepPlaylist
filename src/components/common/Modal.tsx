import React from 'react'
import ModalAnimation from '../animation/ModalAnimation'
import { PrimaryButton, SecondaryButton } from './Button'

interface ModalProps {
  isOpen: boolean
  title: string
  content: string
  isCancelButton?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  isCancelButton = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <ModalAnimation isOpen={isOpen} onClose={onCancel}>
      <div className="mb-4">
        <h2 className="title-1 mb-2 text-left">{title}</h2>
        <p className="button-1 text-left">{content}</p>
      </div>
      <div className="flex flex-col gap-4">
        {isCancelButton && (
          <SecondaryButton onClick={onCancel} className="block h-[39px]">
            취소
          </SecondaryButton>
        )}
        <PrimaryButton onClick={onConfirm} className="block h-[39px]">
          확인
        </PrimaryButton>
      </div>
    </ModalAnimation>
  )
}

export default Modal
