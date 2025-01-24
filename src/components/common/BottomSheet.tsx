import BottomSheetAnimation from '../animation/BottomSheetAnimation'

type BottomSheetProps = {
  children: React.ReactNode
  isOpen: boolean
  height?: string
  maxWidth?: string
  onClose: () => void
}

const BottomSheet = ({
  children,
  isOpen,
  height,
  maxWidth,
  onClose,
}: BottomSheetProps) => {
  return (
    <BottomSheetAnimation
      isOpen={isOpen}
      onClose={onClose}
      height={height}
      maxWidth={maxWidth}
    >
      {children}
    </BottomSheetAnimation>
  )
}

export default BottomSheet
