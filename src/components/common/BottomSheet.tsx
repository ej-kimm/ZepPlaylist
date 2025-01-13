import clsx from 'clsx'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) => {
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300',
          {
            'opacity-100': isOpen,
            'pointer-events-none opacity-0': !isOpen,
          },
        )}
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div
        className={clsx(
          'fixed left-0 top-0 z-50 h-full w-full transform bg-white shadow-lg transition-transform duration-300',
          {
            'translate-y-0': isOpen,
            'translate-y-full': !isOpen,
          },
        )}
      >
        <div className="flex justify-end p-4">
          {/* 닫기 버튼 */}
          <button
            className="text-xl text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  )
}
