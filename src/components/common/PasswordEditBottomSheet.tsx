import PasswordChange from '@/app/my-page/_components/PasswordChange'
import BottomSheet from './BottomSheet'

type PasswordEditBottomSheetProps = {
  isOpen: boolean
  handleClose: () => void
}

const PasswordEditBottomSheet = ({
  isOpen,
  handleClose,
}: PasswordEditBottomSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      height="auto"
      maxWidth="100%"
    >
      <PasswordChange setIsOpenPassword={handleClose} />
    </BottomSheet>
  )
}

export default PasswordEditBottomSheet
