import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'

type ModalAnimationProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const ModalAnimation: React.FC<ModalAnimationProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-40 h-auto w-[327px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-white px-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalAnimation
