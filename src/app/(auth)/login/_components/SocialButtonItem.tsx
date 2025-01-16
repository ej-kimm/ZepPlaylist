type SocialButtonItemProps = {
  onClick: () => void
  icon?: React.ReactNode
  type?: 'button' | 'submit'
}
const SocialButtonItem = ({ onClick, icon }: SocialButtonItemProps) => {
  return (
    <button className={`mb-[18px] mt-[18px]`} type="button" onClick={onClick}>
      {icon}
    </button>
  )
}

export default SocialButtonItem
