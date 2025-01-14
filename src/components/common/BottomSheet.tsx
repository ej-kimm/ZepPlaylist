import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  height: string
  maxWidth: string
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  height = '50%',
  maxWidth = '500px',
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
            className="fixed bottom-0 left-0 right-0 z-50 h-[70%] rounded-t-3xl bg-white p-6 shadow-lg"
            style={{
              height,
              maxWidth,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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

export default BottomSheet

// left-0 right-0: 좌우에 설정기능
// h-[70%]: 높이 지정.

// initial={{ y: '100%' }}  // 시작 위치
// animate={{ y: '0%' }}    // 올라온 위치
// exit={{ y: '100%' }}     // 사라질 때

// 사용할때
// <div>
//   <button onClick={() => setIsOpen(true)}>바텀시트 열기</button>
//   <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
//     <h2 className="text-xl mb-4">플레이리스트 추가</h2>
//     <form className="space-y-4">
//       <input
//         type="text"
//         placeholder="플레이리스트 제목"
//         className="하고싶은 스타일대로"
//       />
//       <input
//         type="text"
//         placeholder="플레이리스트 설명"
//         className="하고싶은 스타일대로"
//       />
//       <button className="하고싶은 스타일대로">
//         확인
//       </button>
//     </form>
//   </BottomSheet>
// </div>
