import React from 'react'
import ModalAnimation from '../animation/ModalAnimation'
import { PrimaryButton, SecondaryButton } from './Button'

interface ModalProps {
  isOpen: boolean
  title: string
  content: string
  type?: 'single' | 'vertical' | 'horizontal'
  onConfirm: () => void
  onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  type = 'single',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  const renderButtons = () => {
    switch (type) {
      case 'single': // 확인 버튼만 있음
        return (
          <PrimaryButton onClick={onConfirm} className="block h-[39px]">
            확인
          </PrimaryButton>
        )
      case 'vertical': // 확인/취소 버튼이 세로로 배치됨
        return (
          <div className="flex flex-col gap-4">
            {onCancel && (
              <SecondaryButton onClick={onCancel} className="block h-[39px]">
                취소
              </SecondaryButton>
            )}
            <PrimaryButton onClick={onConfirm} className="block h-[39px]">
              확인
            </PrimaryButton>
          </div>
        )
      case 'horizontal': // 확인/취소 버튼이 가로로 배치됨
        return (
          <div className="flex w-full justify-between gap-2">
            {onCancel && (
              <SecondaryButton onClick={onCancel} className="h-[39px] w-full">
                취소
              </SecondaryButton>
            )}
            <PrimaryButton onClick={onConfirm} className="h-[39px] w-full">
              확인
            </PrimaryButton>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <ModalAnimation isOpen={isOpen} onClose={onCancel}>
      <div className={`${type === 'horizontal' ? 'mb-6' : 'mb-4'}`}>
        <h2 className="title-1 mb-2 text-left">{title}</h2>
        <p className="button-1 text-left">{content}</p>
      </div>
      {renderButtons()}
    </ModalAnimation>
  )
}

export default Modal
