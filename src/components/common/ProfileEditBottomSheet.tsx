import ProfileChange from '@/app/my-page/_components/ProfileChange'
import BottomSheet from './BottomSheet'

type ProfileEditBottomSheetProps = {
  isOpen: boolean
  handleClose: () => void
  handleOpenPasswordSheet: () => void
  onClick?: () => void
  onSubmit: () => void
}

const ProfileEditBottomSheet = ({
  isOpen,
  handleClose,
  handleOpenPasswordSheet,
  onClick,
  onSubmit,
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
        onSubmit={onSubmit}
      />
    </BottomSheet>
  )
}

export default ProfileEditBottomSheet
