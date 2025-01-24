import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'

type BottomSheetAnimationProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  height?: string
  maxWidth?: string
}

const BottomSheetAnimation: React.FC<BottomSheetAnimationProps> = ({
  children,
  isOpen,
  onClose,
  height = '350px',
  maxWidth = '375px',
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
            className="z-bottom-sheet fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="z-bottom-sheet fixed bottom-0 left-0 right-0 mx-auto w-full -translate-x-1/2 -translate-y-1/2 rounded-t-[36px] bg-white p-5 shadow-lg"
            style={{
              height,
              maxWidth,
            }}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 200) {
                onClose()
              }
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BottomSheetAnimation
