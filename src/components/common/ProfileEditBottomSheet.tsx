import ProfileChange from '@/app/my-page/_components/ProfileChange'
import BottomSheet from './BottomSheet'

type ProfileEditBottomSheetProps = {
  isOpen: boolean
  handleClose: () => void
  handleOpenPasswordSheet: () => void
}

const ProfileEditBottomSheet = ({
  isOpen,
  handleClose,
  handleOpenPasswordSheet,
}: ProfileEditBottomSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      height="auto"
      maxWidth="100%"
    >
      <h1 className="title-1 mt-10 text-left">프로필 수정</h1>
      <ProfileChange
        handleOpenPasswordSheet={handleOpenPasswordSheet}
        handleClose={handleClose}
      />
    </BottomSheet>
  )
}

export default ProfileEditBottomSheet
