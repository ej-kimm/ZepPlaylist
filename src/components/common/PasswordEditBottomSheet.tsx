import PasswordChange from '@/app/my-page/_components/PasswordChange'
import BottomSheet from './BottomSheet'

type PasswordEditBottomSheetProps = {
  isOpen: boolean
  handleClose: () => void
  onClick: () => void
}

const PasswordEditBottomSheet = ({
  isOpen,
  handleClose,
  onClick,
}: PasswordEditBottomSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      height="auto"
      maxWidth="100%"
    >
      <PasswordChange
        handleClosePasswordSheet={handleClose}
        onClick={onClick}
      />
    </BottomSheet>
  )
}

export default PasswordEditBottomSheet
